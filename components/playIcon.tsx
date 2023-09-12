import Image from "next/image"
import play from "../public/Play.svg"

export default function PlayIcon(){
    return(
        <Image
        src={play}
        width={30}
        height={30}
        alt="play icon"
        />
    )
}