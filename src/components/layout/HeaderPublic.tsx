"use client";

import Logo from "./Logo";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/components/auth/useAuthUser";

export default function Header() {

    return (
        <header className="w-full border-b border-border bg-background text-foreground">
            <Logo />
        </header>
    );
}
