"use client"

import { DEFAULT_PAYMENT_AMOUNT } from "@/lib/constants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useSearchParams } from "next/navigation";

export default function PayPalButton({
    clientId
} : {
    clientId: string
}) {
    if(!clientId) return; 

    const searchParams = useSearchParams();

    return <PayPalScriptProvider
        options={{
            clientId
        }}
    >
        <PayPalButtons 
            style={{
                layout: "horizontal",
                color: "gold",
                tagline: false
            }}
            createOrder={async () => {
                const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }, 
                    body: JSON.stringify({
                        amount: searchParams.get("amount") || DEFAULT_PAYMENT_AMOUNT
                    })
                })

                const data = await response.json()

                return data.id
            }}
            onApprove={ async (data, actions) => { 
                const response = await fetch("/api/checkout/", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        orderId: data.orderID,
                        payerId: data.payerID,
                        facilitatorAccessToken: data.facilitatorAccessToken,
                        paymentId: data.paymentID
                    })
                })

                const result = await response.json()

                if(result.error) {
                    return console.error(result.error)
                }

                console.log("Payment complete!", result)

                return result
            }}
            onError={ (error) => {
                return console.error(error)
            }}
        />
    </PayPalScriptProvider>
}