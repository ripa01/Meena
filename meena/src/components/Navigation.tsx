import Link from "next/link";
import Image from "next/image";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { Container } from "./Container";
import logo from "../public/meena.jpeg";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md  border-b border-gray-200 shadow-md">
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Meena" width={60} height={40} />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600 font-bold text-3xl">
            Meena
          </span>
        </Link>

        {/* Navigation Links */}
        {/* <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-800 hover:text-red transition">
            Home
          </Link>
          <Link href="/characters" className="text-gray-800 hover:text-white transition">
            Characters
          </Link>
          <Link href="/episodes" className="text-gray-800 hover:text-white transition">
            Episodes
          </Link>
          <Link href="/quiz" className="text-gray-800 hover:text-white transition">
            Quiz
          </Link>
        </div> */}

        {/* Quiz Button */}
        <Link
          href="/quiz"
          className="flex items-center gap-2 px-4 py-2 font-semibold text-black transition bg-green-400 rounded-lg hover:bg-green-600"
        >
          <TbArrowBigRightFilled />
          Take a Quiz
        </Link>
      </Container>
    </nav>
  );
};

export default Navigation;
