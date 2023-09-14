import { Navbar ,NavbarBrand,NavbarContent,Input} from "@nextui-org/react";
import Logo from "../public/tv.svg"
import searchIcon from "../public/Search.svg"
import Image from "next/image";
import menu from "../public/Menu.svg"
import { SearchIcon } from "./seachIcon";
import Link from "next/link";
export default function Nav(){
    return(
        <div className=" bg-transparent w-full absolute">

       
        <Navbar
        isBlurred={false}
        style={{
            margin:"auto",
            backdropFilter:"none",
            background:"transparent"
        }}
        maxWidth="xl"
        className="bg-transparent m-auto flex justify-center border-b border-b-white"
        >
        <NavbarBrand className="gap-2">
           <Link href={"/"}
           className="flex items-center gap-2"
           >
            <Image
            src={Logo}
            width={35}
            height={35}
            alt="icon"
            />
        <p className="font-bold text-inherit text-white">MovieBox</p>
      </Link>
      </NavbarBrand>
      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full w-full h-10 lg:w-[500px]",
            mainWrapper: "h-full w-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-transparent border border-white",
          }}
          placeholder="What do you want to watch ?"
          size="sm"
          endContent={<SearchIcon />}
          type="search"
          className="hidden sm:block"
        />
        </NavbarContent>
        <NavbarContent style={{
          width:"100px"
        }} className="items-center w-60px" justify="end">
            <p className="text-white whitespace-nowrap w-[50px]">Sign in</p>
            <Image
            src={menu}
            width={35}
            height={35}
            alt="menu"
            />
        </NavbarContent>
        </Navbar>
         </div>
    )
}