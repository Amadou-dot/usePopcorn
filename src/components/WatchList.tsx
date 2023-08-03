import WatchedMovie from './WatchedMovie';
import { WatchlistMovieDetails } from '../Types';

export default function WatchList({
  watched,
  onRemoveFromWatchlist,
}: {
  watched: WatchlistMovieDetails[];
  onRemoveFromWatchlist: (id: number) => void;
}) {
  return (
    <ul className='list list-watched'>
      {watched.map(movie => (
        <WatchedMovie
          key={movie.id}
          movie={movie}
          handleRemoveFromWatchlist={onRemoveFromWatchlist}
        />
      ))}
    </ul>
  );
}
