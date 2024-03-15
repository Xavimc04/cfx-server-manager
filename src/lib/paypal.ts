import paypal from "@paypal/checkout-server-sdk";

export function getPaypalClientId() : string {
    return process.env.PAYPAL_CLIENT_ID as string; 
}

export function getPaypalClientSecret() : string {
    return process.env.PAYPAL_CLIENT_SECRET as string; 
}

export function generatePaypalEnvironment() {
    return new paypal.core.SandboxEnvironment(getPaypalClientId(), getPaypalClientSecret());
}

export function generatePaypalClient() {
    return new paypal.core.PayPalHttpClient(generatePaypalEnvironment());
}