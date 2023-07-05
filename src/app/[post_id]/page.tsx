import { getComments, changeVotes, getUserDetail, getPostDetail } from "../server_actions/actions";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import VoteButton from "../components/VoteButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CommentBox from "../components/CommentBox";

export default async function Page({params,searchParams}: {params: { post_id: string }, searchParams: { [key: string]: string | null }}) {
    const session = await getServerSession(authOptions)
    let name = searchParams.name
    let post_id = searchParams.post_id
    console.log(name + " " + post_id)

    // let post = await getPostDetail(post_id)
    // let comments = await getComments(post_id)
    // let post_date = new Date(post.post_date).toLocaleDateString()

    
    return(
    session ?
    <div className='max-w-5xl m-auto flex flex-row justify-center pt-5'>
    <div className='m-2 flex-1 flex flex-col'>
        <div className='flex flex-row w-full'>
            {/* <div className='dark:bg-[#272729] border-r-2 dark:border-black  flex flex-col align-middle w-10 bg-[#F6F7F8] rounded-l-md'>               
                <VoteButton post_id={post_id} votes={post.post_votes} changeVotes={changeVotes} vote="up" />
                <h1 className='mx-4'>{post.post_votes}</h1>
                <VoteButton post_id={post_id} votes={post.post_votes} changeVotes={changeVotes} vote="down" />
            </div>
            <div className='dark:bg-[#272729] w-[100%] border-b-2 border-gray-200 space-y-2 flex flex-col p-2 bg-white rounded-r-md'>
                <div className='text-sm flex space-x-5'>
                    <h1>Posted by u/{name}</h1><h1>   {post_date}</h1>
                </div>
                <div className='text-xl'>
                    <h1>{post.post_title}</h1>
                </div>
                <div>
                    <h1>{post.post_text}</h1>
                </div>
                <div> */}
            {
                // (comments) ?
                // comments.map(async(comment, index:number) => {
                //     let profile_photo = await getUserDetail(comment.user_id, "profile_photo")
                //     let name = await getUserDetail(comment.user_id, "name")

                //     let comment_date = new Date(comment.date).toLocaleDateString()

                //     return(
                //         <div key={index} className="border-t-2 my-5 border-grayy-300">
                //             <Image className="inline-block rounded-md mt-2" src={profile_photo} alt="pic" width={30} height={30} />
                //             <h1 className="inline-block ml-5">u/{name} {comment_date}</h1>
                //             <h1>{comment.content}</h1>
                //         </div>
                //     )
                // })
                // :null
            }                
                <CommentBox post_id={post_id} />
            </div>
            </div>
        </div>
    // </div>
    // <Sidebar />
    // </div>
    :null
    )
}