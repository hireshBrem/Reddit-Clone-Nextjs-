'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useTransition } from "react";
export default function VoteButton({post_id, votes, changeVotes, vote}:{post_id: any, votes: number, changeVotes: any, vote: string}) {
    let [isPending, startTransition] = useTransition()

    return(
        vote==="up" ?
        <button className="dark:bg-[#272729] dark:text-white" onClick={()=>startTransition(()=>changeVotes(post_id, votes, "up"))}>
            <FontAwesomeIcon icon={faAngleUp} />
        </button>
        :
        <button className="dark:bg-[#272729] dark:text-white" onClick={()=>startTransition(()=>changeVotes(post_id, votes, "down"))}>
            <FontAwesomeIcon icon={faAngleDown} />
        </button>
 )
}