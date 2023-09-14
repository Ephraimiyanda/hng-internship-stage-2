import Image from "next/image"
import bookmark from "../public/bookmark.svg"
export default function Bookmark(){
    return(
        <Image
        src={bookmark}
        width={30}
        height={30}
        className="ml-auto"
        alt="bookmark"
        />
    )
}