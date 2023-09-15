import Loader from "@/components/loading";
import { Input,Navbar,NavbarContent,NavbarBrand,Link } from "@nextui-org/react";
import { useState } from "react";
import MovieCard from "@/components/card";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../public/tv.svg"
import { SearchIcon } from "../components/seachIcon";

export default function Search() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchedItems, setSearchedItems] = useState<MovieProps[]>([]); // Initialize as an empty array
  const router = useRouter();

  interface MovieProps {
    release_date: string;
    title: string;
    overview: string;
    vote_count: number;
    vote_average: number;
    poster_path: string;
    id: number;
  }

  const fetchSearchDetails = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTM5NzUzYTFmODhmNTY5NjI1ZDA1NDg5NzQ0MDE5YSIsInN1YiI6IjY0ZmU1YWYyZTBjYTdmMDEyZWI3YmNjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kjGBgSWWUqec_nbaB38yAz2z3Bg0fAfy4i9xU8X9B9w",
      },
    };

    try {
      setLoading(true); // Set loading to true before making the request
      const searchRes = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US`, options);
      const searchData = await searchRes.json();

      setSearchedItems(searchData.results);
      router.push(`/search?query=${inputValue}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="  bg-stone-300 h-screen overflow-auto">
      <div className="flex justify-center items-center ">
        
      <Navbar
        style={{
            margin:"auto",
            backdropFilter:"none",
            background:"transparent",
            display:"flex",
            justifyContent:"center"
        }}
        maxWidth="xl"
        className="bg-transparent m-auto flex justify-center border-b border-b-white"
        >
        <NavbarBrand className="gap-2">
           <Link href={"/"}
           className="flex items-center gap-2"
           >
            <Image
            src={Logo}
            width={35}
            height={35}
            alt="icon"
            />
        <p className="font-bold text-inherit text-white">MovieBox</p>
      </Link>
      </NavbarBrand>
      <NavbarContent as="div" className="items-center m-auto" justify="center">
        <Input
        onClick={()=>(router.push("/search"))}
          classNames={{
            base: "max-w-full w-full h-10 lg:w-[500px]",
            mainWrapper: "h-full w-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-transparent border border-white",
          }}
          placeholder="search for your content..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            fetchSearchDetails(); // Trigger the search as the user types
          }}
          size="sm"
          startContent={<SearchIcon />}
          type="search"
        />
        </NavbarContent>
 
        </Navbar>

     
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:grid-cols-4 gap-3 justify-center max-w-[1280px] m-auto px-6 py-4">
        {loading ? (
          <Loader />
        ) : (
          searchedItems.map((items: MovieProps) => (
            <MovieCard
              key={items.id}
              title={items.title}
              poster_path={items.poster_path}
              id={items.id}
              release_date={items.release_date}
              vote_count={items.vote_count}
              vote_average={items.vote_average}
            />
          ))
        )}
      </div>
    </div>
  );
}
