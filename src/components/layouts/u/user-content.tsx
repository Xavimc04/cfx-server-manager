import { fetchUserByName } from "@/lib/data";
import { Fragment } from "react";

export default async function UserContent({
    slug
} : {
    slug: string
}) {
    const user = await fetchUserByName(slug);

    return <Fragment>
        Contenido del usuario
    </Fragment>
}