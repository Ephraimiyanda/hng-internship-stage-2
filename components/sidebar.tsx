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
      <aside className="w-[140px] lg:w-[170px] rounded-e-[35px] h-screen border border-gray-400 pt-8 ">
        <Link href="/" className="flex gap-1 text-black  max-w-[100px]  pl-4 lg:p-6">
          <Image src={Logo} alt="imdb score" width={30} height={30} />
          <p className="font-bold text-inherit text-black">MoviBox</p>
        </Link>

        <ul className="flex flex-col gap-2 pt-10">
          <li>
            <Link
              href="/"
             color="danger"
              className="w-full h-[45px] pl-4 lg:p-6 flex  m-auto  gap-2 text-center text-black hover:text-[#BE123C] hover:bg-[#BE123C] hover:bg-opacity-40 hover:border-r-3 border-[#BE123C]"
            >
              <Image
                className="justify-start"
                src={Home}
                alt="Home"
                width={20}
                height={20}
              />
              <p className="text-center">Home</p>
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
              <p className="text-center">Movies</p>
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
              <p className="text-center">Tv Series</p>
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
              <p className="text-center">Upcoming</p>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}