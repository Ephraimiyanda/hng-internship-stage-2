import optionList from "../public/List.svg"
import Image from "next/image"
export default function Options(){
return(
    <Image
    src={optionList}
    width={25}
    height={25}
    alt="options"
    />
)
}