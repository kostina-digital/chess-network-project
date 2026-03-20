import { useRouter } from "next/navigation";


export default function SignUpBtn() {
    const router = useRouter();

    return (
        <button
    type="button"
    onClick={() => router.replace("/register")}
    className="bg-[#6c47ff] text-white rounded-full font-medium text-sm h-10 px-5 cursor-pointer"
        >
            Sign Up
        </button>
    )
}