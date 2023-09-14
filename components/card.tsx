import { Card, CardBody, CardFooter, Image,CardHeader, Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Bookmark from "./bookmark";
import TomatoeImg from "./tomatoe";
import ImdbImg from "./imdb";

interface cardprops {
  title: string;
  poster_path: string;
  id: number;
  release_date: string;
  vote_count:number;
  vote_average:number;
}


export default function MovieCard({
  title,
  poster_path,
  id,
  release_date,
  vote_count,
  vote_average
}: cardprops) {
  const router=useRouter()
  return (
    <div className="sm:justify-self-center w-fit col-auto">
      <Card key={id} data-testid="movie-card" className=" w-[265px] md:w-[230px] sm:w-[280px] lg:w-[240px] " radius="none" shadow="none" isPressable onPress={()=>router.push(`/movie/${id}`)}>
        <CardBody className="overflow-visible p-0">
        <CardHeader className="absolute z-20 top-1 flex-col !items-start">
          <Button style={{
            background:"transparent",
            marginLeft:"auto",
            width:"fit",
            padding:"2px",
            minWidth:"fit-content"
          }}
          startContent={<Bookmark/>}>
          </Button>
        </CardHeader>
          <Image
           radius="none"
            data-testid="movie-poster"
            shadow="sm"
            width="100%"
            alt={title}
            className="w-full object-cover h-[260px]"

            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          />
        </CardBody>
        <CardFooter className="text-small justify-between flex flex-col p-0 items-start py-2">
          <Link className="text-left" href={`/movie/${id}`}><b data-testid="movie-title" className="text-left">{title}</b></Link>
          <div className="flex items-center gap-5">
                  <div className="flex gap-1">
                  <ImdbImg/> 
                    <p>{vote_count}/100</p>
                  </div>
                  <div className="flex gap-1">
                   <TomatoeImg/>
                    <p>{10 * +vote_average.toFixed(0)}%</p>
                  </div>
                </div>
          <p data-testid="movie-release-date" className="text-default-500 text-left">
            {release_date}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
