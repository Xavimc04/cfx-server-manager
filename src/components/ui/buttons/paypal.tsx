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
                return console.log(data)
            }}
            onError={ (error) => {
                return console.error(error)
            }}
        />
    </PayPalScriptProvider>
}