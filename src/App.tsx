import { useEffect, useState } from 'react';
import { BaseMovieDetails, WatchlistMovieDetails } from './Types';
import Box from './components/Box';
import Main from './components/Main';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import NumResults from './components/NumResults';
import SearchBar from './components/Searchbar';
import Summary from './components/Summary';
import WatchList from './components/WatchList';
import { APIKey, baseAPIUrlSearch } from './env';
import MovieInfo from './components/MovieInfo';
import { CircularProgress } from '@mui/material';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<BaseMovieDetails[]>([]);
  const [watched, setWatched] = useState<WatchlistMovieDetails[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onClose = () => setSelectedId(null);
  const handleAddToWatchlist = (movie: WatchlistMovieDetails) =>
    setWatched(prev => [...prev, movie]);
  const handleRemoveFromWatchlist = (id: number) =>
    setWatched(prev => prev.filter(movie => movie.id !== id));

  // Display trending movies on initial render
  useEffect(() => {
    const getMovies = async () => {
      setIsloading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${APIKey}`
      );
      const data = await res.json();
      setMovies(data.results);
      setIsloading(false);
    };
    getMovies();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const getMovies = async () => {
      setIsloading(true);
      const res = await fetch(
        `${baseAPIUrlSearch}?api_key=${APIKey}&query=${query}`
      );
      const data = await res.json();
      setMovies(data.results);
      setIsloading(false);
    };
    if (!query) return
    getMovies();
    return controller.abort();
  }, [query]);
  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        {!isLoading && <NumResults movies={movies} />}
      </Navbar>

      <Main>
        <Box>
          {isLoading && <CircularProgress />}
          {!isLoading && (
            <MovieList
              movies={movies}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          )}
        </Box>

        <Box>
          {!isLoading && !selectedId && (
            <>
              <Summary watched={watched} />
              <WatchList
                watched={watched}
                onRemoveFromWatchlist={handleRemoveFromWatchlist}
              />
            </>
          )}
          {!isLoading && selectedId && (
            <MovieInfo
              selectedId={selectedId}
              onClose={onClose}
              handleAddToWatchlist={handleAddToWatchlist}
              watchedMovies={watched}
            />
          )}
        </Box>
      </Main>
    </>
  );
}
