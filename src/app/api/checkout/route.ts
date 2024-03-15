import { NextResponse } from "next/server";
import paypal from "@paypal/checkout-server-sdk";
import { generatePaypalClient } from "@/lib/paypal";

export async function POST() {
    try {
        const request = new paypal.orders.OrdersCreateRequest();
    
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "150.00"
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