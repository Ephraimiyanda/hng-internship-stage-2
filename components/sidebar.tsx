import { Link, Button } from "@nextui-org/react";
import PlayIcon from "./playIcon";
import Logo from "../public/tv.svg";
import Home from "../public/Home.svg"
import camera from "../public/Movie Projector.svg"
import tvIcon from "../public/TV Show.svg"
import Calendar from "../public/Calendar.svg"
import logout from "../public/Logout.svg"
import Image from "next/image";

export default function SideBar() {
  return (
    <div>
      <aside className="fixed z-[30] flex items-center h-fit sm:flex-col sm:gap-4 sm:relative bg-white border-t sm:bottom-[0] bottom-[0px] w-full  sm:w-[140px] lg:w-[170px] sm:rounded-e-[35px] sm:h-screen sm:border border-gray-400 sm:pt-8 ">
        <Link href="/" className="hidden sm:flex gap-1 text-black  pl-3 sm:pl-0 bg-white">
          <Image src={Logo} alt="imdb score" width={30} height={30} className="" />
          <p className=" font-bold text-inherit  text-black">MoviBox</p>
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
                width={25}
                height={25}
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
                width={25}
                height={25}
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
                width={25}
                height={25}
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
                width={25}
                height={25}
              />
              <p className="text-center hidden sm:block">Upcoming</p>
            </Link>
          </li>
        </ul>
        <div style={{
          background:"rgba(190, 18, 60, 0.1)"
        }} className="hidden sm:flex flex-col px-3 py-3 border border-[#BE123C] max-w-[120px] rounded-lg gap-2 text-[10px] ">
          <p className="text-sm font-medium">
            play movie quizes and earn free tickets
          </p>
          <p>50% of peoples are playing now</p>
        <Button variant="flat" color="danger" className="h-[30px]">start playing</Button>
        </div>
        <div className="w-[25%] flex justify-center items-center">
<Image
src={logout}
alt="logout"
width={35}
height={25}
/>
<p className="text-center hidden sm:block">Logout</p>
        </div>
      </aside>
    </div>
  );
}
