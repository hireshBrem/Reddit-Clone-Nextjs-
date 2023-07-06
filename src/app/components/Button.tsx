'use client';

export default function Button({text, any, any2}: {text: string | null, any:any, any2:any}) {
    return(
        <button onClick={()=>{console.log(any + " - ");console.log(any2)}}>
            {text}
        </button>
    )
}