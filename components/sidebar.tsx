import { Link, Button } from "@nextui-org/react";
import PlayIcon from "./playIcon";
import Logo from "../public/tv.svg";
import Home from "../public/Home.svg"
import camera from "../public/Movie Projector.svg"
import tvIcon from "../public/TV Show.svg"
import Calendar from "../public/Calendar.svg"
import Image from "next/image";

export default function SideBar() {
  return (
    <div>
      <aside className="fixed z-[30] flex items-center h-[30px] sm:flex-col sm:relative bg-white border-t sm:bottom-[0] bottom-[22px] w-full  sm:w-[140px] lg:w-[170px] sm:rounded-e-[35px] sm:h-screen sm:border border-gray-400 pt-8 ">
        <Link href="/" className="flex gap-1 text-black  pl-3 sm:pl-0">
          <Image src={Logo} alt="imdb score" width={30} height={30} className="" />
          <p className="hidden sm:block font-bold text-inherit bg-white text-black">MoviBox</p>
        </Link>

        <ul className="flex w-full justify-around sm:justify-[unset] sm:flex-col gap-2 sm:pt-10 bg-white">
          <li>
            <Link
              href="/"
             color="danger"
              className="w-full h-[45px] pl-4 lg:p-6 flex  m-auto items-center  gap-2 text-center text-black hover:text-[#BE123C] hover:bg-[#BE123C] hover:bg-opacity-40 hover:border-r-3 border-[#BE123C]"
            >
              <Image
                className="justify-start"
                src={Home}
                alt="Home"
                width={20}
                height={20}
              />
              <p className="text-center hidden sm:block">Home</p>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              color="danger"
              className="w-full h-[45px] pl-4 lg:p-6 flex  m-auto  gap-2 text-center text-black hover:text-[#BE123C] hover:bg-[#BE123C] hover:bg-opacity-40 hover:border-r-3 border-[#BE123C]"
            >
              <Image
                className="justify-start"
                src={camera}
                alt="Movies"
                width={20}
                height={20}
              />
              <p className="text-center hidden sm:block">Movies</p>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              color="danger"
              className="w-full h-[45px] pl-4 lg:p-6 flex  m-auto  gap-2 text-center text-black hover:text-[#BE123C] hover:bg-[#BE123C] hover:bg-opacity-40 hover:border-r-3 border-[#BE123C]"
            >
              <Image
                className="justify-start"
                src={tvIcon}
                alt="Tv Series"
                width={20}
                height={20}
              />
              <p className="text-center hidden sm:block">Tv Series</p>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              color="danger"
              className="w-full h-[45px] pl-4 lg:p-6  m-auto  flex gap-2 text-center text-black hover:text-[#BE123C] hover:bg-[#BE123C] hover:bg-opacity-40 hover:border-r-3 border-[#BE123C]"
            >
              <Image
              className="justify-start"  
              src={Calendar}
                alt="Upcoming"
                width={20}
                height={20}
              />
              <p className="text-center hidden sm:block">Upcoming</p>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
