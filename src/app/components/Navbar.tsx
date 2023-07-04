'use client';

import { useTheme } from "next-themes";
import { useTransition } from "react";
import { useState, useEffect, ComponentType } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import Image from "next/image"
import redditLogo from '../pics/redditLogo.jpg'
import redditDarkLogo from '../pics/redditAltLogo.jpg'

import {faSun, faMoon, faMessage, faBell, faPlus, faArrowDown, faUser, faEye, faArrowRightFromBracket, faCross, faXmark} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Chat from "./Chat";

export default function Navbar() {
    let [isPending, startTransition]: [any, any] = useTransition()
    const router = useRouter()
    const {data: session} = useSession()
    const {theme, setTheme} = useTheme()
    let loop:boolean = false
    const [menuOpen, setMenuOpen] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)

    function handleMenuToggle() {
        setMenuOpen(!menuOpen)
    }

    function handleChatToggle() {
        setChatOpen(!chatOpen)
    }

    return(
        <>
        <div className="space-x-10 flex-wrap flex justify-center sm:justify-normal bg-white dark:bg-[#1A1A1B] dark:text-gray-300 sticky w-[100%]">
            {
                theme === "light" ?
                <a href="/" className="inline-block bg-transparent mt-3">
                    <Image className="w-28 ml-5" src={redditLogo} alt="reddit logo" /> 
                </a>
                :
                <a href="/" className="inline-block bg-transparent mt-3">
                    <Image className="w-28 ml-5" src={redditDarkLogo} alt="dark logo" /> 
                </a>
            }
    
            <div className="p-2 inline-block">
                <form className="flex justify-center">   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative mx-2">
                        <input type="search" id="default-search" className="w-60 sm:w-96  p-4 pl-10 text-sm dark:text-white text-gray-900 border dark:bg-[#272729] border-gray-300 rounded-3xl bg-[#F6F7F8] hover:border-blue-500" placeholder="Search Reddit" required />
                    </div>
                </form>
            </div>
            <div className="p-2 flex flex-row space-x-7">
                <button className="rounded-sm h-fit dark:hover:bg-[#272729] hover:bg-gray-100 p-2" onClick={()=>{handleChatToggle()}}>
                    <FontAwesomeIcon icon={faMessage} color="" />                
                </button>
                <button className="rounded-sm h-fit dark:hover:bg-[#272729] hover:bg-gray-100 p-2">
                    <FontAwesomeIcon icon={faBell} color="" />                
                </button>
                <button onClick={()=>router.push("/submit")} className="rounded-sm h-fit dark:hover:bg-[#272729] p-2 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faPlus} color="" />                
                </button>
            </div>
            
            {
                session ? 
                <>
                <div className="flex relative ">
                    <button onClick={()=>{handleMenuToggle()}} className="float-right m-2 inline-block p-1 space-x-1 border-[1px] rounded-sm border-white dark:border-[#1A1A1B] dark:hover:border-[#272729]  hover:border-gray-200">
                        <Image className="inline-block rounded-sm" src={session.user?.image || ""} alt={"user"} width={40} height={40} />
                        <h1 className="inline-block mt-1">{session.user?.email}</h1>
                        <FontAwesomeIcon className="inline-block pl-3" icon={faArrowDown} />
                    </button>
                    {
                    menuOpen ?
                    <div className="right-0 top-[75px] w-80 bg-white dark:bg-[#1A1A1B] absolute rounded-sm z-50">
                        <div className="border-b-2 border-gray-300 z-40">
                            <div className="m-3">
                                <FontAwesomeIcon icon={faUser} />  
                                <h1 className="inline-block mx-4">My Stuff</h1>                    
                            </div>
                            <div>
                                <div className="p-3 hover:bg-gray-100 dark:hover:bg-[#272729] flex">
                                    <h1 className="w-full text-left pl-8">Online Status</h1>
                                    <label className="relative items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <div className="p-3 hover:bg-gray-100 dark:hover:bg-[#272729] flex">
                                    <a href="/profile" className="w-full text-left pl-8">Profile</a>
                                </div>
                            </div>
                            
                        </div>
                        <div className="border-b-2 border-gray-300">
                            <div className="m-3">
                                <FontAwesomeIcon icon={faEye} />  
                                <h1 className="inline-block mx-4">View Options</h1>                    
                            </div>
                            <div className="p-3">
                                <button className="rounded" onClick={()=>setTheme( theme === "dark"? "light": "dark" )}>
                                    { theme === "dark" ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} /> }
                                </button>
                                <h1 className="inline-block mx-3">{theme} mode enabled</h1>
                            </div>
                        </div>
                        <div>
                            <div className="hover:bg-gray-100 dark:hover:bg-[#272729] p-3">
                                <button onClick={()=>signOut()} className="w-full text-left">
                                    <FontAwesomeIcon className="mr-4" icon={faArrowRightFromBracket} />
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                    : null
                }
                {
                    chatOpen ?
                    <Chat handleChatToggle={handleChatToggle} chatOpen={chatOpen} />
                    : null
                }

                </div> 
                </>
                :<div className="mt-2 space-x-4 inline-block text-white">
                    <button className="bg-[#ff4500] rounded-3xl p-2 px-10 " onClick={async ()=>{signIn()}}>Log In</button>
                </div> 
                
            }
        </div>
        </>
    )
}