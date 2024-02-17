// pages/index.tsx
"use client";
import { useState, ChangeEvent } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import { Input } from "@/components/ui/input";

const Home = () => {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            query: value,
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleMovieClick = async (movie: any) => {
    try {
      const response = await axios.post("/api/movies", {
        title: movie.title,
        releaseYear: movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : null,
        tmdbId: movie.id.toString(),
      });
      console.log("Movie URL:", response.data);
      // Handle the movie URL as needed
    } catch (error) {
      console.error("Error fetching movie URL:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <>
      <div className="mt-3 flex-col  items-center justify-center">
        <div className="flex-1 text-center mb-3">Movie Search</div>
        <Input
          className="w-[250px] text-center mx-auto mb-4"
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={handleChange}
        />
      </div>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </>
  );
};

export default Home;
