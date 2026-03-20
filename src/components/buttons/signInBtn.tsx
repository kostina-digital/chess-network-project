import { useRouter } from "next/navigation";

export default function SignInBtn() {
    const router = useRouter();

    return (
        <button
              type="button"
              onClick={() => router.replace("/login")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-sm font-medium"
            >
              LogIn
            </button>
        )
    }