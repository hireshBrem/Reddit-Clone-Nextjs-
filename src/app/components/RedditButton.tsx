'use client';

import Link from "next/link";

export default function RedditButton({text, url}: {text: string, url: string}){
  return (
    <>
        <Link href={url}><button className="bg-[#ff4500] rounded-3xl p-2 px-10 m-4">{text}</button></Link>
    </>
    )
}