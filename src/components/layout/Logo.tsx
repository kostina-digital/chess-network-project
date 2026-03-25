import LogoImg from "../../../public/images/Logo.png";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  width = 300,
  height = 300,
  className = "h-40 w-40",
  priority = false,
}: LogoProps) {
  return (
    <Link href="/">
      <Image
        src={LogoImg.src}
        alt="ChessConnect"
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    </Link>
  );
}
