"use client"

import { toggleSavedPost } from '@/lib/data';
import { useSession } from 'next-auth/react';
import { useFormState } from 'react-dom';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';

export default function SavePost({
    postId,
    isSaved
} : {
    postId: number,
    isSaved: boolean
}) {
    const [state, dispatch] = useFormState(toggleSavedPost, undefined);
    const { data: session } = useSession();

    if(!session) return; 

    return <form 
        action={ dispatch }
        className="flex gap-4 items-center"
    > 
        <input type="hidden" name="postId" defaultValue={ postId } />
        <input type="hidden" name="userId" defaultValue={ session?.user?.id } />

        <button 
            type='submit'
            className="rounded border opacity-60 p-2 flex items-center justify-center hover:opacity-100 hover:border-indigo-500 hover:text-indigo-500 transition-all"
        >
            {
                isSaved
                    ? <BookmarkAddedOutlinedIcon />
                    : <BookmarksOutlinedIcon />
            }
        </button>
    </form>
}