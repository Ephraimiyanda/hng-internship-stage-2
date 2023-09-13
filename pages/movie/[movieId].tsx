import RootLayout from "@/app/layout";
import Loader from "@/components/loading";
import Star from "../../public/Star.svg"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Showtimes from "@/components/showtimes";
import Options from "@/components/options";
interface movieprops {
  title: string;
  release_date: string;
  overview: string;
  runtime: string;
  genres: {
    [x: string]: any;
    id: number;
    name: string;
  };
  vote_average: number;
  vote_count: number;
}
export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<movieprops>();
  const [video, setVideo] = useState<any>([]);
  const [directors,setDirectors]=useState<any>([]);
  const [actors,setActors]=useState<any>([]);
  const [writers,setWriters]=useState<any>([])
  console.log(directors);
  const trailerUrl =
    video &&
    video.find(
      (element: any) =>
        element.name.toLowerCase() === "Official Trailer".toLowerCase()
    );
  const router = useRouter();
  const { movieId } = router.query;
  const fetchMovieDetail = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTM5NzUzYTFmODhmNTY5NjI1ZDA1NDg5NzQ0MDE5YSIsInN1YiI6IjY0ZmU1YWYyZTBjYTdmMDEyZWI3YmNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjGBgSWWUqec_nbaB38yAz2z3Bg0fAfy4i9xU8X9B9w",
      },
    };

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      );
      const movieDetails = await res.json();
      setMovieDetails(movieDetails);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchVideo = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTM5NzUzYTFmODhmNTY5NjI1ZDA1NDg5NzQ0MDE5YSIsInN1YiI6IjY0ZmU1YWYyZTBjYTdmMDEyZWI3YmNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjGBgSWWUqec_nbaB38yAz2z3Bg0fAfy4i9xU8X9B9w",
      },
    };
    try {
      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );
      const videoData = await videoRes.json();
      setVideo(videoData.results);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCredits=async()=>{
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTM5NzUzYTFmODhmNTY5NjI1ZDA1NDg5NzQ0MDE5YSIsInN1YiI6IjY0ZmU1YWYyZTBjYTdmMDEyZWI3YmNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjGBgSWWUqec_nbaB38yAz2z3Bg0fAfy4i9xU8X9B9w",
        },
      };
    try{
        const creditRes=await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,options)
        const creditData = await creditRes.json();
        const castCredit = creditData.cast;
        const crewCredit=creditData.crew;

        const actingCredits = castCredit.filter((element: any) => element.popularity> 20);
        setActors((actors: any) => [...actors, ...actingCredits]);
      
        // Filter directors and set them in the directors state
        const directorCredits = crewCredit.filter((element: any) => element.job === "Director");
        setDirectors((directors: any) => [...directors, ...directorCredits]);
      
        // Filter writers and set them in the writers state
        const writingCredits = crewCredit.filter((element: any) => element.known_for_department === "Writing");
        setWriters((writers: any) => [...writers, ...writingCredits]);

        const actingCrewCredits = castCredit.filter((element: any) => element.popularity> 20);
        setActors((actors: any) => [...actors, ...actingCrewCredits]);
      
        // Filter writers from crewCredit and set them in the writers state
        const writingCrewCredits = crewCredit.filter((element: any) => element.known_for_department === "Writing");
        setWriters((writers: any) => [...writers, ...writingCrewCredits]);
    }
    catch(error){
        console.log(error);
    }
  }
  useEffect(() => {
    if (router.isReady) {
      fetchMovieDetail();
      fetchVideo();
      fetchCredits();
    }
  }, [movieId]);
  if (!movieDetails) {
    return <Loader />;
  }
  return (
    <RootLayout>
      <div className="flex flex-col px-3 pt-2 w-[85%]   m-auto h-screen">
        <div className="h-screen ">
          {video ? (
            <iframe
              className="w-full  h-[50%] rounded-[15px]"
              picture-in-picture="true"
              allowFullScreen
              src={`https://www.youtube.com/embed/${
                trailerUrl && trailerUrl.key
              }`}
            ></iframe>
          ) : (
            <Loader />
          )}
          <div className="flex flex-col gap-1 py-2">
            <div className="text-[20px] font-medium flex flex-wrap gap-2 md:gap-10 justify-between">
              <div className="flex gap-2 flex-wrap items-center">
                <div className="flex">
                  <p
                    className="items-center flex justify-center align-middle"
                    data-testid="movie-title"
                  >
                    {movieDetails.title} •
                  </p>
                  <p className="pl-[3px]" data-testid="movie-release-date">
                    {" "}
                    {movieDetails.release_date} •{" "}
                  </p>
                  <span className="pl-[3px]" data-testid="movie-runtime">
                    {" "}
                    {movieDetails.runtime}m
                  </span>
                </div>
                <div className="flex gap-2">
                  {movieDetails.genres.map((genre: any) => (
                    <Button
                      color="danger"
                      variant="bordered"
                      className="border border-red-300 h-[28px] font-medium"
                      key={genre.id}
                    >
                      {genre.name}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex w-[110px] content-end flex-wrap gap-1">
                <Image
                src={Star}
                width={20}
                height={20}
                alt="star"
                />
                <span className="px-1 text-[#E8E8E8]">{movieDetails.vote_average.toFixed(1)}</span> {"|"}
                <span className="px-1 text-[#666666]">{movieDetails.vote_count>1000?Math.round(movieDetails.vote_count/1000)+"k":movieDetails.vote_count}</span>
              </div>
            </div>
            <div className="flex  justify-between gap-1 sm:flex-row">
                <div className="">
              <p data-testid="movie-overview">{movieDetails.overview}</p>
              <div><span>Director(s) :</span><p>{directors.map((director:any)=>director.name).join(",")}</p></div>
              <div><span>Writers :</span><p></p></div>
              <div><span>Stars :</span><p></p></div>
                </div>
                <div className="flex flex-col gap-2">
                    <Button className="items-center w-[250px]" startContent={<Showtimes/>} color="danger">
                        See showtimes
                    </Button>
                    <Button 
                    startContent={<Options/>}
                    style={{
                        background:"rgba(190, 18, 60, 0.1)"
                    }} className=" tems-center w-[250px]">
                        More watch options
                    </Button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
