import { getServerSession } from "next-auth"
import Sidebar from "../components/Sidebar"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { addPost } from "../server_actions/actions"
import FormBox from "../components/FormBox"

export default async function Submit() {
    const session = await getServerSession(authOptions)

  return(
    <>
    {
    session ?
    <div className='max-w-5xl m-auto flex flex-row justify-center pt-5'>
    <div className='m-2 flex-1 flex flex-col bg-white dark:bg-[#272729] rounded-md p-2'>
        <FormBox email={session.user?.email} />
    </div>
    <Sidebar />
    </div>
    :null
    }
    </>
  )

}