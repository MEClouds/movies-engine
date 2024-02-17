import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// components/MovieCard.js
const MovieCard = ({
  movie,
}: {
  movie: {
    title: string;
    poster_path: string;
    vote_average: string;
    release_date: string;
  };
}) => {
  return (
    <Card className=" relative m-auto w-[250px] h-[470px] bg-black/5 border-2 shadow-l mb-2 cursor-pointer">
      <Image
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        width={250}
        height={300}
      />
      <CardTitle className="ms-1 text-md text-semibold ">
        {movie.title}
      </CardTitle>
      <CardContent className=" absolute bottom-0">
        <div className="flex gap-7 items-center text-sm text-muted-foreground">
          <p>Release: {movie.release_date}</p>
          <div className=" bg-yellow-500 text-black rounded-sm p-1 ">
            {movie.vote_average}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
