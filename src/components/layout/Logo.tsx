import LogoImg from "../../../public/images/Logo.png"
import Link from "next/link"
import Image from "next/image"
export default function Logo() {
    return (
      <Link href="/">
        <Image src={LogoImg.src} alt="Logo" width={300} height={300} className="w-30 h-30"></Image> 
        <p className="text-2xl font-bold">ChessConnect</p>
      </Link>
    )
}