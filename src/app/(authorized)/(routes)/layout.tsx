import { SessionProvider } from "next-auth/react"
import { Fragment } from "react"

export default function Layout({
    children
} : {
    children: React.ReactNode
}) {
    return <Fragment>
        <SessionProvider> 
            { children }
        </SessionProvider>
    </Fragment>
}