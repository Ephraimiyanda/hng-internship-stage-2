import Image from "next/image"
import bookmark from "../public/bookmark.svg"
import isBookmarked from "../public/bookmark copy.svg"
import { useState } from "react"

export default function Bookmark(){
    const [isFavourite,setIsFavourite]=useState(false)
    return(
        <div className="ml-auto">
        {isFavourite?

        <Image
        src={isBookmarked}
        width={30}
        height={30}
        alt="bookmark"
        onClick={()=>setIsFavourite(false)}
        />
       : 
       <Image
        src={bookmark}
        width={30}
        height={30}
        alt="bookmark"
        onClick={()=>setIsFavourite(true)}
        />
        }
        </div>
    )
}