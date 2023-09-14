import Imdb from "../public/imdbsvg.svg";
import Image from "next/image";
export default function ImdbImg(){
    return(
        <Image
        src={Imdb}
        width={30}
        height={20}
        alt="imdb"
        />
    )
}