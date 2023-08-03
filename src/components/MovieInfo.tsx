import { useEffect, useState } from 'react';
import { FullMovieDetails, WatchlistMovieDetails } from '../Types';
import { APIKey, baseAPIUrlId, baseImgUrl } from '../env';
import { CircularProgress } from '@mui/material';
import StarRating from './StarRating/StarRating';
interface MovieInfoProps {
  selectedId: number;
  onClose: () => void;
  handleAddToWatchlist: (movie: WatchlistMovieDetails) => void;
  watchedMovies: WatchlistMovieDetails[];
}

export default function MovieInfo({
  selectedId,
  onClose,
  handleAddToWatchlist,
  watchedMovies,
}: MovieInfoProps) {
  const [movie, setMovie] = useState<FullMovieDetails>({} as FullMovieDetails);
  const [isLoading, setIsloading] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const isWatched = watchedMovies.find(
    movie => movie.id === selectedId && movie.userRating
  );

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsloading(true);
      const res = await fetch(`${baseAPIUrlId}${selectedId}?api_key=${APIKey}`);
      const data = (await res.json()) as FullMovieDetails;
      setMovie(data);
      document.title = data.title
      setIsloading(false);
    };

    getMovieDetails();
    return () => {document.title = 'usePopcorn'}
  }, [selectedId]);
  return (
    <div key={movie.id} className='details'>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onClose}>
              &larr;
            </button>
            <img
              src={`${baseImgUrl}${movie.poster_path}`}
              alt={`Poster of the ${movie.title} movie`}
            />
            <div className='details-overview'>
              <h2>{movie.title}</h2>
              <p>
                {movie.release_date?.split('-')[0]} &bull; {movie.runtime} min
              </p>
              <p>{movie.genres?.map(({ name }) => name).join(', ')}</p>
              <p>
                <span>⭐</span>
                {movie.vote_average?.toFixed(1)} Rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    defaultRating={Math.round(movie.vote_average)}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button
                      className='btn-add'
                      onClick={() => {
                        handleAddToWatchlist({ ...movie, userRating });
                        onClose();
                      }}>
                      Add to my list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {isWatched.userRating}{' '}
                  {isWatched.userRating === 1 ? 'star' : 'stars'}
                </p>
              )}
            </div>
            <p>
              <em>{movie.overview}</em>
            </p>
            <p>Starring: {'{movie.actors}'}</p>
            <p>Directed by {'{movie.director}'}</p>
          </section>
        </>
      )}
    </div>
  );
}
