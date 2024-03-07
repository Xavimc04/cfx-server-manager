import Navigator from "@/components/layouts/navigator"
import { SessionProvider } from "next-auth/react"
import { Fragment } from "react"

export default function Layout({
    children
} : {
    children: React.ReactNode
}) {
    return <Fragment>
        <SessionProvider>
            <Navigator />

            { children }
        </SessionProvider>
    </Fragment>
}