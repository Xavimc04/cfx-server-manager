"use client"

import CreatePostModal from "./create-post-modal";
import { Fragment } from "react";
import Search from "../search";

export default function QueryFilter() {
    return <Fragment>
        <Search />

        <CreatePostModal />
    </Fragment>
}