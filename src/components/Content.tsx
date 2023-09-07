import { useEffect, useState } from 'react';

import { MovieCard } from './MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';

interface MovieResponseProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MovieProps {
  selectedGenre: {
    title: string;
  };
  selectedGenreId: number;
}

export function Content({ selectedGenre, selectedGenreId }: MovieProps) {
  const [movies, setMovies] = useState<MovieResponseProps[]>([]);

  useEffect(() => {
    api.get<MovieResponseProps[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
