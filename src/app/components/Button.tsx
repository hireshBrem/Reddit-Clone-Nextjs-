'use client';

export default function Button({p}: {p: string | null}) {
    return(
        <button>
            {p}
        </button>
    )
}