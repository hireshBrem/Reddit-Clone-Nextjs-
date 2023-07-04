import Image from "next/image"
import RedditButton from "./RedditButton"
import banner from '../pics/banner.png'

export default function Sidebar() {
    return(
        <div className='bg-white w-96 hidden md:inline-block dark:bg-[#272729] h-96 m-2 rounded-md border-[1px] border-white dark:border-gray-600'>
            <Image src={banner} alt="banner_image" className='object-cover h-20' />
            <h1 className='my-5 mx-5 text-black dark:text-white'>Come here to check in with your favorite communities.</h1>
            <div className='m-4 border-t-[1px] border-gray-700'>
                <RedditButton text='Create Post' url="/submit" />
                <RedditButton text='Create Community' url="/" />
            </div>
        </div>
    )
}