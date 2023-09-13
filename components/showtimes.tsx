import Image from "next/image"
import Showtime from "../public/Two Tickets.svg"
export default function Showtimes(){
    return(
        <Image
        src={Showtime}
        width={25}
        height={25}
        alt="showtimes"
        />
    )
}