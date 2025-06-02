import css from "./App.module.css"
import SearchBar from '../SearchBar/SearchBar'
import { Toaster } from "react-hot-toast"
import type { Movie } from "../../types/movie"
import { fetchMovies } from "../../services/movieService"
import { useState } from "react"
import toast from "react-hot-toast"
import MovieGrid from "../MovieGrid/MovieGrid"
import Loader from "../Loader/Loader"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import MovieModal from "../MovieModal/MovieModal"



export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState < Movie | null>(null);

  
  const handleSearch = async (query: string) => {
    setIsError(false);
    setMovies([]);
    setIsLoading(true);
    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.")
        setMovies(data);
      }
      else {
        setMovies(data);
      }
       }
    catch {
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }
}
  
  const onMovieClick = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
}
  const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedMovie(null); 
};


  return (
    <>
      <div className={css.app}>
        <Toaster position="top-center" reverseOrder={false} />
        <SearchBar onSubmit={handleSearch} />
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {(isModalOpen && selectedMovie)  && <MovieModal onClose={handleCloseModal} movie={selectedMovie}/>}
        {movies.length > 0 && <MovieGrid movies={movies} onSelect={onMovieClick} />}
      </div>
    </>
  )
}


