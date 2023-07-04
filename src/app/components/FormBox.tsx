'use client';

import { addPost } from "../server_actions/actions"
import { useState } from "react";
import Image from "next/image";

export default function FormBox({email}:{email:string | null | undefined}) {
    const[title, setTitle] = useState('')
    const [post, setPost] = useState('text') 
    const[text, setText] = useState('')
    const[img, setImg] = useState("")

    return(
        <div className='flex flex-col w-full'>
            <div className="space-x-5">
                {/* <button className="p-2 bg-gray-200 rounded-md" onClick={()=>{setPost("text")}}>Text</button> */}
                {/* <button className="p-2 bg-gray-200 rounded-md" onClick={()=>{setPost("image")}}>Image</button> */}
            </div>
            {
                post === 'text' ?
                <form className="p-2" onSubmit={()=>{setTitle("");setText("")}} action={()=>addPost("text", title, text, email)}>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-10 border-2 w-full border-gray-300 p-2 rounded-md" placeholder="Title" maxLength={300} />
                    <textarea value={text} onChange={(e)=>{setText(e.target.value)}} required className="border-gray-300 w-full min-h-fit border-2 p-2 rounded-md mt-2" placeholder="What are your thoughts?" />
                    <button className="bg-[#FF4500] px-10 rounded-3xl text-white p-2 mt-2">Post</button>
                </form>
                :null
                // <form action={()=>addPost("image", title, img)} className="p-2">
                // <input value={title} onChange={(e)=>setTitle(e.target.value)} className="mt-10 p-2 border-gray-300 border-2 rounded-md" placeholder="Title" maxLength={300} />
                
                // <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                // <input value={img} onChange={(e)=>{setImg(e.target.value)}} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                // <button className="bg-[#FF4500] px-10 rounded-3xl text-white p-2 mt-2">Post</button>
                // </form>
                
            }
        </div>
    )
}