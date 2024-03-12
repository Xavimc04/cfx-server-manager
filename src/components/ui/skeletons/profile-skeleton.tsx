import { Fragment } from "react";
import UserInformationSkeleton from "./user-information-skeleton";
import ForumPostSkeleton from "./forum-post-skeleton";

export default function ProfileSkeleton() {
    return <Fragment>
        {/* @ Profile */}
        <UserInformationSkeleton />

        {/* @ Likes and followers */}
        <div className="animate-pulse bg-zinc-800 w-1/4 h-5 rounded-md"></div>

        {/* @ Posts */}
        <ForumPostSkeleton />
    </Fragment>
}