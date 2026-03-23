import LogoImg from "../../../public/images/Logo.png";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
};

export default function Logo({
  width = 300,
  height = 300,
  className = "h-40 w-40",
}: LogoProps) {
  return (
    <Link href="/">
      <Image
        src={LogoImg.src}
        alt="Logo"
        width={width}
        height={height}
        className={className}
      />
    </Link>
  );
}
