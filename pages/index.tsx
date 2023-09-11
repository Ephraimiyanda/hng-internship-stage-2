import { useEffect, useState } from "react";
import Image from "next/image";
import IMdb from "../public/imdb.png";
import tomatoe from "../public/rotten tomatoes.svg";
import MovieCard from "@/components/card";
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
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
      );
      const randomMoviesData = await res.json();
      const trendingMovies = randomMoviesData.results;
      const randomTrendingMovie =
        trendingMovies[Math.floor(Math.random() * trendingMovies.length)];
      setMovie(randomTrendingMovie);
      setTopMovies(trendingMovies);

      setBgImg(
        `https://image.tmdb.org/t/p/original/${randomTrendingMovie.backdrop_path}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRandomMovie, 10000); // Change image every 10 seconds

    // Initial fetch
    fetchRandomMovie();

    return () => {
      // Clear the interval when the component unmounts
      clearInterval(interval);
    };
  }, []); // Empty dependency array to run the effect only once

  if (!movie || !bgImg) {
    return <div>Loading...</div>; // You can replace this with a loading indicator component
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
              className="h-full"
            >
              <div className="h-full flex flex-col justify-center text-white pl-4 sm:pl-10 lg:pl-20">
                <h1 className="text-3xl font-bold max-w-[404px] text-left">
                  {movie.title} :
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <Image src={IMdb} alt="imdb score" width={30} height={30} />
                    <p>{movie.vote_count}/100</p>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src={tomatoe}
                      alt="tomatoe score"
                      width={20}
                      height={20}
                    />
                    <p>{10 * movie.vote_average}%</p>
                  </div>
                </div>
                <p className="text-lg max-w-[332px]">{movie.overview}</p>
                {/* You can display more information about the movie here */}
              </div>
            </div>
          </div>
          <div className="pt-3 grid grid-col-auto">
            {topMovies &&
              topMovies.map((movies: MovieProps) => (
                <MovieCard 
                title={movies.title} poster_path={movies.poster_path} id={movies.id} release_date={movies.release_date}                 
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
