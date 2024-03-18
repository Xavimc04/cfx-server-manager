import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { generatePaypalClient } from "@/lib/paypal";
import { auth } from "@/auth";
import { NextApiResponse } from "next";
import { DEFAULT_PAYMENT_AMOUNT } from "@/lib/constants";

export async function POST(req: any, res: NextApiResponse) {
    const session = await auth(req, res)

    if(!session) {
        return NextResponse.json({
            error: "Unauthorized"
        }, { status: 401 })
    }

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

        return NextResponse.json({
            id: response.result.id
        })
    } catch (error: Error | any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}