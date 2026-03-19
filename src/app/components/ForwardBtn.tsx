"use client"

import { useRouter } from "next/navigation";

export function ForwardButton() {
    const router = useRouter();

    return (
        <button onClick={() => router.forward()} className="button bg-green-500">
            Forward
        </button>
    )
}