import { BaseMovieDetails } from '../Types';

export default function NumResults({ movies }: { movies: BaseMovieDetails[] }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
