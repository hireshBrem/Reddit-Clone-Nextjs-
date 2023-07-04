'use client';

import Image from "next/image";
import Sidebar from "../components/Sidebar"
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import VoteButton from "../components/VoteButton";
import Link from "next/link";
import { changeVotes, getComments, getPostDetail, getUserDetail } from "../server_actions/actions";
import { useState } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { useTransition } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

interface Comment {
    comment_id: string,
    content: string,
    date: string,
    post_id:string,
    user_id: string 
}

export default function Page() {

    let [isPending, startTransition] = useTransition()
    const[post_votes, setVotes] = useState(0)
    const[comments, setComments] = useState([])

    // let comments: any | null = null

    useEffect(()=>{
        async function getVotes() {
            const votes = await getPostDetail(id)
            setVotes(votes)
            console.log("votes " + votes)
            let c:any = await getComments(id)
            setComments(c)
            console.log(comments)
        }
        getVotes()
        
    }, [post_votes])

    const searchParams = useSearchParams()

    const id:string | null = searchParams.get("id")
    let initial_votes:string | null = searchParams.get("votes")
    const title:string | null = searchParams.get("title")
    const text:string | null = searchParams.get("text")
    const image:string | null = searchParams.get("image")
    const date:string | null = searchParams.get("date")
    const user_id:string | null = searchParams.get("user_id")
    const name:string | null = searchParams.get("name") 

    async function alterVotes(action:string) {
        changeVotes(id, post_votes, action)
        if(action=="up") {
            let v = post_votes + 1
            setVotes(v)
        }
        if(action=="down") {
            let v = post_votes - 1
            setVotes(v)
        } 
        
    }

    return(
    <div className='max-w-5xl m-auto flex flex-row justify-center pt-5'>
    <div className='m-2 flex-1 flex flex-col'>
        <div className='flex flex-row w-full'>
            <div className='dark:bg-[#272729] border-r-2 dark:border-black  flex flex-col align-middle w-10 bg-[#F6F7F8] rounded-l-md'>
                <button onClick={()=>{alterVotes("up")}}>
                    <FontAwesomeIcon icon={faAngleUp} />
                </button>                
                <h1 className='mx-4'>{post_votes}</h1>
                <button onClick={()=>{alterVotes("down");console.log(comments)}}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </div>
            <div className='dark:bg-[#272729] w-[100%] border-b-2 border-gray-200 space-y-2 flex flex-col p-2 bg-white rounded-r-md'>
                <div className='text-sm flex space-x-5'>
                    <h1>Posted by u/{name}</h1><h1>   {date}</h1>
                </div>
                <div className='text-xl'>
                    <h1>{title}</h1>
                </div>
                <div>
                    <h1>{text}</h1>
                </div>
                <button className="hidden" onClick={async ()=>{console.log(comments)}}>
                    Click
                </button>
                <div>
            {
                (comments) ?
                comments.map(async(comment:Comment, index:number) => {
                    return(
                        <div key={index} className="border-t-2 my-5 border-grayy-300">
                            <Image className="inline-block rounded-md" src={comment.profile_photo} alt="pic" width={30} height={30} />
                            <h1 className="inline-block ml-5">u/{comment.comment_name}</h1>
                            <h1>{comment.content}</h1>
                        </div>
                    )
                })
                :null
            }            
            </div>
            </div>
        </div>
    </div>
    <Sidebar />
    </div>
    )
}