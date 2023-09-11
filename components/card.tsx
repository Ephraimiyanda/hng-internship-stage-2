import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
interface cardprops{
    title:string;
    poster_path:string;
    id:number;
    release_date:string;
}
export default function MovieCard({title,poster_path,id,release_date}:cardprops){
    return(
<div>
<Card key={id} 
data-testid="movie-card">
          <CardBody className="overflow-visible p-0">
            <Image
            data-testid="movie-poster"
              shadow="sm"
              radius="lg"
              width="100%"
              alt={title}
              className="w-full object-cover h-[140px]"
              src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b data-testid="movie-title">{title}</b>
            <p data-testid="movie-release-date" className="text-default-500">{release_date}</p>
          </CardFooter>
        </Card>
</div>
    )
}