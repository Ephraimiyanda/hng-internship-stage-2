import tomatoe from "../public/rotten tomatoes.svg";
import Image from "next/image";
export default function TomatoeImg(){
    return(
        <Image
        src={tomatoe}
        width={20} 
        height={20}
        alt="tomatoe"
        />
    )
}