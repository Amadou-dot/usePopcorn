import { BaseMovieDetails } from '../Types';
import { baseImgUrl, genreMap } from '../env';
interface MovieProps {
  movie: BaseMovieDetails;
  selectedId: number | null;
  setSelectedId: (n: number | null) => void;
}
export default function Movie({
  movie,
  selectedId,
  setSelectedId,
}: MovieProps) {
  // display only the first genre on the list
  const genre = movie.genre_ids.map(id => genreMap.movies.get(id))[0];
  return (
    <li
      className={`${selectedId === movie.id ? 'selected' : ''}`}
      key={movie.id}
      onClick={() => setSelectedId(movie.id === selectedId ? null : movie.id)}>
      <img
        src={`${baseImgUrl}${movie?.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>{genre}</span>
          <span>{movie.release_date.split('-')[0]}</span>
        </p>
      </div>
    </li>
  );
}
