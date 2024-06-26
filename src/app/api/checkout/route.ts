import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { generatePaypalClient } from "@/lib/paypal";
import { DEFAULT_PAYMENT_AMOUNT } from "@/lib/constants";
import { auth } from "@/auth";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";
import logger, { throwLoggerInfo } from "@/lib/logger";
import throwLoggerError from "@/lib/logger";

export async function POST(req: Request) {
    const session: Session | null = await auth();
 
    if(!session) return NextResponse.json({
        error: "Unauthorized"
    }, { status: 401 })

    try {
        const data = await req.json();

        const request = new paypal.orders.OrdersCreateRequest();
    
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: data.amount || DEFAULT_PAYMENT_AMOUNT
                    }
                }
            ]
        });
    
        const client = generatePaypalClient();
        const response = await client.execute(request);

        if(!session?.user?.id) return NextResponse.json({
            error: "User not found"
        }, { status: 404 })

        const payment = await prisma.payments.create({
            data: {
                userId: Number(session.user.id),
                amount: Number(data.amount) || Number(DEFAULT_PAYMENT_AMOUNT),
                orderId: response.result.id
            }
        })

        if(!payment) return NextResponse.json({
            error: "Payment not created"
        }, { status: 500 })

        return NextResponse.json({
            id: response.result.id
        })
    } catch (error: Error | any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const session: Session | null = await auth();

    if(!session) return NextResponse.json({
        error: "Unauthorized"
    }, { status: 401 })

    try {
        const data = await req.json();

        const {
            orderId,
            payerId,
            facilitatorAccessToken,
            paymentId
        } = data;

        if(!orderId || !payerId || !facilitatorAccessToken || !paymentId) return NextResponse.json({
            error: "Missing required parameters"
        }, { status: 400 })

        if(!session?.user?.id) return NextResponse.json({
            error: "User not found"
        }, { status: 404 })

        const updated = await prisma.payments.updateMany({
            where: {
                orderId: orderId as string,
                userId: Number(session.user.id)
            },
            data: {
                payerId,
                facilitatorAccessToken,
                paymentId,
                status: "completed"
            }
        })

        if(!updated) {
            throwLoggerError(session.user.name + " - Attempted to update payment with orderId: " + orderId + " but failed.")

            return NextResponse.json({
                error: "Payment not updated"
            }, { status: 500 })
        }

        const payment = await prisma.payments.findFirst({
            where: {
                orderId: orderId as string,
                userId: Number(session.user.id)
            }
        })

        const increasedBalance = await prisma.user.update({
            where: {
                id: Number(session.user.id)
            },
            data: {
                balance: {
                    increment: Number(payment?.amount) || 0
                }
            }
        })

        if(!increasedBalance) {
            throwLoggerError(session.user.name + " - Attempted to update balance for user with id: " + session.user.id + " but failed.")

            return NextResponse.json({
                error: "Balance not updated"
            }, { status: 500 })
        }

        throwLoggerInfo(session.user.name + " - Payment with orderId: " + orderId + " completed successfully.")

        return NextResponse.json({
            message: "Payment complete!"
        })
    } catch (error: Error | any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}