import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Image
        src="/images/NotFound.png"
        alt="Not Found"
        width={600}
        height={400}
        priority
      />
      <Link href="/">Home</Link>
    </>
  );
}