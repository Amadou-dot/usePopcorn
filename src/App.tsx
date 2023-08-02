import { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/Searchbar';
import NumResults from './components/NumResults';
import { BaseMovieDetails, WatchlistMovieDetails } from './Types';
import Box from './components/Box';
import MovieList from './components/MovieList';
import Summary from './components/Summary';
import WatchList from './components/WatchList';
import Main from './components/Main';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, ] = useState<BaseMovieDetails[]>([]);
  const [watched, ] = useState<WatchlistMovieDetails[]>([]);

  return (
    <>
      <Navbar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <Summary watched={watched} />
          <WatchList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
