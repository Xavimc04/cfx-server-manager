"use client"

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"

export default function PayPalButton({
    clientId
} : {
    clientId: string
}) {
    if(!clientId) return; 

    return <PayPalScriptProvider
        options={{
            clientId
        }}
    >
        <PayPalButtons 
            style={{
                layout: "horizontal",
                color: "gold"
            }}
            createOrder={async () => {
                const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
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