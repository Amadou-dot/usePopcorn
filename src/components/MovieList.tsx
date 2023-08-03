import { BaseMovieDetails } from '../Types';
import Movie from './Movie';
interface MovieListProps {
  movies: BaseMovieDetails[];
  selectedId: number | null;
  setSelectedId: (n: number | null) => void;
}
export default function MovieList({
  movies,
  selectedId,
  setSelectedId,
}: MovieListProps) {
  return (
    <ul className='list list-movies'>
      {movies?.map(movie => (
        <Movie
          key={movie.id}
          movie={movie}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </ul>
  );
}
