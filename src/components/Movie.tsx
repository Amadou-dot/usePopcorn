import { BaseMovieDetails } from '../Types';
import { baseImgUrl } from '../env';

export default function Movie({ movie }: { movie: BaseMovieDetails }) {
  return (
    <li key={movie.id}>
      <img
        src={`${baseImgUrl}${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>{movie.genre_ids}</span>
          <span>{movie.release_date.split('-')[0]}</span>
        </p>
      </div>
    </li>
  );
}
