import { WatchlistMovieDetails } from '../Types';
import { baseImgUrl } from '../env';

export default function WatchedMovie({
  movie,
}: {
  movie: WatchlistMovieDetails;
}) {
  return (
    <li key={movie.id}>
      <img
        src={`${baseImgUrl}${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.vote_average}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
