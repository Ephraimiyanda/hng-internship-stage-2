"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import IMdb from "../public/imdb.png";
import tomatoe from "../public/rotten tomatoes.svg";
import instagram from "../public/instagram.svg";
import twitter from "../public/twitter.svg";
import facebook from "../public/facebook.svg";
import youtube from "../public/youtube.svg";
import MovieCard from "@/components/card";
import { Button,Link } from "@nextui-org/react";
import PlayIcon from "@/components/playIcon";
import Loader from "@/components/loading";
interface MovieProps {
  release_date: string;
  title: string;
  overview: string;
  vote_count: number;
  vote_average: number;
  poster_path:string;
  id: number;
}

export default function Home() {
  const [movie, setMovie] = useState<MovieProps>();
  const [bgImg, setBgImg] = useState("");
  const [topMovies, setTopMovies] = useState<any>();

 
  const fetchRandomMovie = async () => {
    
    try {
      const apiKey = "c539753a1f88f569625d05489744019a";
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`
      );
      const randomMoviesData = await res.json();
      const trendingMovies = randomMoviesData.results;
      const randomTrendingMovie =
        trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
      setMovie(randomTrendingMovie);
      setTopMovies(trendingMovies.slice(0,10));

      setBgImg(
        `https://image.tmdb.org/t/p/original/${randomTrendingMovie.backdrop_path}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRandomMovie, 5000); // Change image every 10 seconds

    // Initial fetch
    fetchRandomMovie();

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once

  if (!movie || !bgImg) {
    return <Loader/>
  }
  return (
    <div>

      {movie && bgImg && (
        <div>
          <div
            key={movie.id}
            className="top-0 w-full h-screen bg-no-repeat bg-center bg-cover bg-clip-content"
          >
            <div
              style={{
                backgroundImage: `url("${bgImg}")`,
                backgroundSize: "cover", // Ensure background image covers the entire container
                backgroundPosition: "top", // Center the background image
              }}
              className="h-full "
            >
              <div className="flex justify-left max-w-[1280px] m-auto items-center h-full">
              <div className="h-full flex flex-col gap-1 justify-center text-white pl-4 ">
                <h1 className="text-5xl font-bold max-w-[504px] text-left">
                  {movie.title} :
                </h1>
                <div className="flex items-center gap-5">
                  <div className="flex gap-1">
                    <Image src={IMdb} alt="imdb score" width={35} height={20} />
                    <p>{movie.vote_count}/100</p>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={tomatoe}
                      alt="tomatoe score"
                      width={20}
                      height={20}
                    />
                    <p>{10 *+ movie.vote_average.toFixed(0)}%</p>
                  </div>
                </div>
                <p className="text-lg max-w-[452px]">{movie.overview}</p>
               <Button as={Link} href={`/movie/${movie.id}`} color="danger"  radius="sm" className="w-[150px]" startContent={<PlayIcon/>}>Watch Trailer</Button>
              </div>
              </div>
            </div>
          </div>    
           <div className="flex justify-between max-w-[1280px] pt-3 m-auto px-6">
            <h2 className=" text-lg font-medium">Featured Movie </h2>
           <div className="flex items-center text-[#BE123C]"> <p className=" pt-[6px] gap-1">see more </p><span className="text-3xl"> › </span></div>
            </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-2 justify-center max-w-[1280px] m-auto px-6 py-4">

            {topMovies &&
              topMovies.map((movies: MovieProps) => (
                <MovieCard 
                key={movies.id}
                title={movies.title} poster_path={movies.poster_path} id={movies.id} release_date={movies.release_date} vote_count={movies.vote_count} vote_average={movies.vote_average}                
                />
              ))}
          </div>
        </div>
      )}
      <footer className="flex flex-col items-center py-10 gap-3">
        <div className="flex gap-5">
          <Image
          src={facebook}
          width={30}
          height={30}
          alt="facebook"
          />
          <Image
          src={instagram}
          width={30}
          height={30}
          alt="instagram"
          />
          <Image
          src={twitter}
          width={30}
          height={30}
          alt="twitter"
          />
          <Image
          src={youtube}
          width={30}
          height={30}
          alt="youtube"
          />
        </div>
        <ul className="text-black font-medium flex flex-col text-center sm:flex-row gap-3">
          <li>Conditions of Use </li>
          <li>Privacy & Policy</li>
          <li>Press Room</li>
        </ul>
        <p  className="text-[#6B7280]">&copy; { new Date().getUTCFullYear()} MovieBox by Ephraim Iyanda</p>
      </footer>
    </div>
  );
}
