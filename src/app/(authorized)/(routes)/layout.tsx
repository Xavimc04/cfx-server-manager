import Navigator from "@/components/layouts/navigator"
import { Fragment } from "react"

export default function Layout({
    children
} : {
    children: React.ReactNode
}) {
    return <Fragment>
        <Navigator />

        { children }
    </Fragment>
}