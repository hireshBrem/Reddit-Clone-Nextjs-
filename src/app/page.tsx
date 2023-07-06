import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import banner from './pics/banner.png'
import RedditButton from './components/RedditButton'
import { addUserToDB, changeVotes, getPosts, getUserDetail } from './server_actions/actions'
import { revalidatePath } from 'next/cache'
import VoteButton from './components/VoteButton'
import { faAngleDown, faAngleUp, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PostWrapper from './components/PostWrapper' 
import Sidebar from './components/Sidebar'
import Link from 'next/link'
import { PostgrestError } from '@supabase/supabase-js'

export default async function Home() {
    const session = await getServerSession(authOptions) 
    const posts: any[] | PostgrestError | null = await getPosts()
    if(session) {
        await addUserToDB(session.user?.email, session.user?.name, session.user?.image) 
    }
    return (
    session ?
    <div className='max-w-5xl m-auto flex flex-row justify-center pt-5'>
        <div className='m-2 flex-1 flex flex-col'>
            <div className='bg-white dark:bg-[#272729] flex rounded-md border-[1px] border-white dark:border-gray-600 p-1'>
                {
                    session.user?.image ?
                    <Image src={session.user?.image || ""} alt="profiles_photo" width={30} height={30} className='m-2 rounded-full ' />
                    :null
                }
                <a href="/submit" className='w-[100%] mx-2'><input className='m-1 rounded-md p-2 w-[100%] bg-[#F6F7F8] dark:bg-[#272729] border-[1px] dark:border-gray-600' placeholder='Create Post' /></a>
            </div>
            {
                (Array.isArray(posts)) ?
                posts.reverse().map(async (post, index)=> {

                    let post_name = await getUserDetail(post.user_id, "name")
                    let post_date = new Date(post.post_date).toLocaleDateString()
                    
                    return(
                        <div key={index} className='flex flex-row mt-3 w-full'>
                            <div className='dark:bg-[#272729] border-r-2 dark:border-black  flex flex-col align-middle w-10 bg-[#F6F7F8] rounded-l-md'>
                                <VoteButton post_id={post.post_id} votes={post.post_votes} changeVotes={changeVotes} vote="up" />
                                <h1 className='mx-4'>{post.post_votes}</h1>
                                <VoteButton post_id={post.post_id} votes={post.post_votes} changeVotes={changeVotes} vote="down" />
                            </div>
                            <Link href={{
                                pathname: `/${post.post_id}`,
                                query: {
                                    post_id: post.post_id,
                                    post_date: post_date,
                                    name: post_name,
                                }}}
                            target='_blank' className='w-[100%]'>
                            <div className='dark:bg-[#272729] w-[100%] space-y-2 flex flex-col p-2 bg-white rounded-r-md'>
                                <div className='text-sm flex space-x-5'>
                                    <h1>Posted by u/{post_name}</h1><h1>   {post_date}</h1>
                                </div>
                                <div className='text-xl'>
                                    <h1>{post.post_title}</h1>
                                </div>
                                <div>
                                    <h1>{post.post_text}</h1>
                                </div>
                            </div>
                            </Link>
                        </div>
                    )
                })
                :null
            }
        </div>
        <Sidebar />
    </div>
    : null
  )
}
