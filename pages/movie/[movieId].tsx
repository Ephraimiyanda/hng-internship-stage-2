import RootLayout from "@/app/layout";
import Loader from "@/components/loading";
import Star from "../../public/Star.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button,Card,CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Showtimes from "@/components/showtimes";
import Options from "@/components/options";
import WhiteList from "../../public/whiteLists.svg"
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
  const [directors, setDirectors] = useState<any>([]);
  const [actors, setActors] = useState<any>([]);
  const [writers, setWriters] = useState<any>([]);
  const [trendingMovies,setTrendingMovies]=useState<any>([])
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

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
  const fetchCredits = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTM5NzUzYTFmODhmNTY5NjI1ZDA1NDg5NzQ0MDE5YSIsInN1YiI6IjY0ZmU1YWYyZTBjYTdmMDEyZWI3YmNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjGBgSWWUqec_nbaB38yAz2z3Bg0fAfy4i9xU8X9B9w",
      },
    };
    try {
      const creditRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
        options
      );
      const creditData = await creditRes.json();
      const castCredit = creditData.cast;
      const crewCredit = creditData.crew;

      const actingCredits = castCredit.filter(
        (element: any) => element.popularity > 10
      );
      setActors((actors: any) => [...actors, ...actingCredits]);
      const directorCredits = crewCredit.filter(
        (element: any) => element.job === "Director"
      );
      setDirectors((directors: any) => [...directors, ...directorCredits]);
      const writingCrewCredits = crewCredit.filter(
        (element: any) => element.known_for_department === "Writing"
      );
      setWriters((writers: any) => [...writers, ...writingCrewCredits]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const apiKey = "c539753a1f88f569625d05489744019a";
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
      );
      const randomMoviesData = await res.json();
      const trendingMovies = randomMoviesData.results.slice(0, 3); // Get the first 3 objects
      setTrendingMovies(trendingMovies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchMovieDetail();
      fetchVideo();
      fetchCredits();
      fetchTrendingMovies();
    }
  }, [movieId]);
  if (!movieDetails) {
    return <Loader />;
  }

  return (
    <RootLayout>
      <div className="flex flex-col px-3 pt-2 w-full sm:w-[85%] overflow-x-hidden  m-auto h-screen overscroll-y-auto sm:pb-0 pb-[360px]">
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
            <div className="text-[20px] font-medium flex flex-wrap gap-1 md:gap-2  justify-between">
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
                    {new Date(
                      movieDetails.release_date
                    ).getUTCFullYear()} •{" "}
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
                <Image src={Star} width={20} height={20} alt="star" />
                <span className="px-1 text-[#E8E8E8]">
                  {movieDetails.vote_average.toFixed(1)}
                </span>{" "}
                {"|"}
                <span className="px-1 text-[#666666]">
                  {movieDetails.vote_count > 1000
                    ? Math.round(movieDetails.vote_count / 1000) + "k"
                    : movieDetails.vote_count}
                </span>
              </div>
            </div>
            <div className="flex  justify-between gap-2 flex-col md:flex-row w-full ">
              <div className="flex flex-col gap-3 w-full md:w-[50%] lg:w-[60%] xl:w-[70%]">
                <p className="pb-4" data-testid="movie-overview">
                  {movieDetails.overview}
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <span className="w-[90px] whitespace-nowrap">Director(s) :</span>
                    <p className="text-[#BE123C] max-w-[90vh] overflow-x-auto whitespace-nowrap">
                      {directors
                        .map((director: any) => director.name)
                        .join(" ,")}
                    </p>
                  </div>
                  <div className="flex">
                    <span className="w-[85px] whitespace-nowrap">Writers :</span>
                    <p className="text-[#BE123C] max-w-[90vh] overflow-x-auto whitespace-nowrap">
                      {writers.map((writer: any) => writer.name).join(" ,")}
                    </p>
                  </div>
                  <div className="flex">
                    <span className="w-[85px] whitespace-nowrap">Stars :</span>
                    <p className="text-[#BE123C] max-w-[90vh] overflow-x-auto whitespace-nowrap">
                      {actors.map((actor: any) => actor.name).join(" ,")}
                    </p>
                  </div>
                </div>
                <div className=" border border-[#f87193] rounded-[18px] flex  items-center w-full">
                  <Button color="danger" className="px-1 w-full md:w-[240px]">Top rated movie #65</Button>
                  <div className="flex justify-between px-1 pr-0 w-full items-center">
                    <p>Awards 9 nominations</p>
                    <Button
                      style={{
                        width: "16px",
                        height: "25px",
                        minWidth: "10px",
                        background: "white",
                        borderRight: "18px",
                      }}
                    >
                      ∨
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  className="items-center w-full"
                  startContent={<Showtimes />}
                  color="danger"
                >
                  See showtimes
                </Button>
                <Button
                  startContent={<Options />}
                  style={{
                    background: "rgba(190, 18, 60, 0.1)",
                  }}
                  className=" tems-center w-full"
                >
                  More watch options
                </Button>
                <div className="flex w-full">
                    <Card className="flex " style={{
                        flexDirection:"row",
                        height:"100%",
                        width:"100%"
                    }}>
                    {trendingMovies &&
                        trendingMovies.map((movies:any)=>{
                            const{poster_path,title}=movies;
                            return (
                            <Image
                            className=" min-w-[100px]"
                            style={{
                                borderRadius:"0px",
                                width:"100%"
                            }} src={`https://image.tmdb.org/t/p/original/${poster_path}`} width={100} height={100} alt={`${title}_poster`}></Image>
                            )
                        })
                    }
                            <CardFooter style={{
                                paddingLeft:"0px",
                            }} className="flex  before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                               <Image
                               
                               src={WhiteList}
                               width={20}
                               height={20}
                               alt="white list"/>
                               <p className="text-white text-[10px] items-start ">The Best Movies and Shows in {month[new Date().getMonth()]}</p> 
                            </CardFooter>
                    </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
