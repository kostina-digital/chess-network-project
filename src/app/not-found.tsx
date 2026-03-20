import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
    <div className="flex flex-col items-center justify-center gap-8 m-auto">
      <Image
        src="/images/NotFound.png"
        alt="Not Found"
        width={600}
        height={400}
        priority
      />
      <Link href="/">Back to Home Page</Link>
    </div>
    </>
  );
}