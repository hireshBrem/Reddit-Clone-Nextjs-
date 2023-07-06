'use client';

export default function Button({text, any}: {text: string | null, any:any}) {
    return(
        <button onClick={()=>console.log(any)}>
            {text}
        </button>
    )
}