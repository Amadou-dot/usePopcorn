import WatchedMovie from './WatchedMovie';
import { WatchlistMovieDetails } from '../Types';

export default function WatchList({
  watched,
}: {
  watched: WatchlistMovieDetails[];
}) {
  return (
    <ul className='list'>
      {watched.map(movie => (
        <WatchedMovie key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
