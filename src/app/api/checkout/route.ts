import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { generatePaypalClient } from "@/lib/paypal";
import { DEFAULT_PAYMENT_AMOUNT } from "@/lib/constants";
import { auth } from "@/auth";
import { Session } from "next-auth";
import prisma from "@/lib/prisma";

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