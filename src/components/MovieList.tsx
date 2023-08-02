import { BaseMovieDetails } from '../Types';
import Movie from './Movie';

export default function MovieList({ movies }: { movies: BaseMovieDetails[] }) {
  return (
    <ul className='list'>
      {movies?.map(movie => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
}
