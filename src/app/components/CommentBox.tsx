'use client';

import { getServerSession } from "next-auth"
import { useTransition } from 'react'
import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { useSession } from "next-auth/react"
import { addComment, getUserDetail, getComments } from "../server_actions/actions";
import { useEffect, useState } from "react";

export default function CommentBox({post_id}: {post_id: string | null}) {
    let [isPending, startTransition] = useTransition()
    const {data: session} = useSession()
    const[Comment, setComment]: [string, any] = useState("")
    
    return(
        session ?
        <>
        <div className="p-2 bg-white dark:bg-[#272729] mt-5 border-t-2 border-t-gray-300">
            <h1>Comment as u/{session?.user?.name}</h1>
            <textarea value={Comment} onChange={(e)=>setComment(e.target.value)} required className="border-gray-300 mt-2 w-full min-h-fit border-2 p-2 rounded-md" placeholder="What are your thoughts?" />
            <button onClick={() => {startTransition(() =>addComment(post_id, Comment, session.user?.email));setComment("")}} className="bg-[#FF4500] text-white rounded-md p-2 mt-2">Comment</button>
        </div>
        </>
        :null
    )
}