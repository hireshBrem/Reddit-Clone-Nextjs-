'use client';

export default function PostWrapper({link, children}: {link:string, children: React.ReactNode}) {
    return(
        <a href={link} className="hover:border-gray-300 rounded-md border-2 w-[100%]" onClick={()=>console.log("hello there")}>
            {children}
        </a>
    )
}