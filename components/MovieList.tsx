// components/MovieList.js
import MovieCard from "./MovieCard";

const MovieList = ({
  movies,
  onMovieClick,
}: {
  movies: any;
  onMovieClick: (movie: string) => void;
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 ">
      {movies.map((movie: any) => (
        <div className=" " key={movie.id} onClick={() => onMovieClick(movie)}>
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default MovieList;
