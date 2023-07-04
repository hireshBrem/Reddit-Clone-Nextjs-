'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Chat({handleChatToggle, chatOpen}: {handleChatToggle: any, chatOpen: boolean}) {
    return(
        <div className="fixed bottom-0 w-[600px] h-[500px] bg-white border-[1px] right-10 shadow-md border-gray-700 dark:bg-[#1A1A1B] rounded-t-xl">
            <div className="bg-[#F6F7F8] dark:bg-[#272729] h-10 rounded-t-xl">
                <h1 className="text-black dark:text-white inline-block m-2">Chat</h1>
                <button onClick={()=>handleChatToggle()} className="float-right mt-2 mr-2 inline-block"><FontAwesomeIcon icon={faXmark} width={40} /></button>
            </div>
            <div className="flex flex-wrap">
                <div className="w-52 h-[500px] overflow-y-scroll ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam vel, alias accusantium error optio velit aperiam, quaerat id ratione autem vitae debitis voluptate, molestiae perferendis fugiat laborum corrupti repudiandae est!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. A architecto reprehenderit laudantium cumque rerum, ipsum et expedita aperiam quae magni asperiores nemo, quo dolores officiis soluta, eius sapiente laborum. Nam!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, corrupti veniam, atque nostrum repudiandae tempore ratione aliquam accusantium exercitationem provident nemo dolorum inventore necessitatibus eaque distinctio iste minima quisquam repellat.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus cumque quasi, porro, sed odio dolorum, pariatur quod officia ipsum voluptatem atque fugiat unde. Nobis dolorum earum necessitatibus accusantium excepturi culpa!
                    {/* Previous Chat preview list */}
                </div>
                <div className=" w-[390px] flex flex-col justify-center text-center">
                    <div className="">
                        <h1>Coming soon</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}