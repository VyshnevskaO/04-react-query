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
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { useEffect } from "react"
import ReactPaginate from 'react-paginate';




export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);


  const handleSearch = async (query: string) => {
    toast.dismiss('no-movies');
    setQuery(query);
    setCurrentPage(1);
  
  }

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['moviesList', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage), 
    enabled: query !== '',
    placeholderData: keepPreviousData,
  })
  
  const totalPages = data?.total_pages ?? 0;


  
  const onMovieClick = (movie: Movie) => {
    setIsModalOpen(true);
    setSelectedMovie(movie);
}
  const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedMovie(null); 
  };

  useEffect(() => {
    if (data && data.results.length === 0 && !isLoading && !isError) {
      toast.error("No movies found for your request.", { id: 'no-movies' });
    }
  }, [data, isLoading, isError]);
  



  return (
    <>
      <div className={css.app}>
        <Toaster position="top-center" reverseOrder={false} />
        <SearchBar onSubmit={handleSearch} />
        {(isSuccess && totalPages > 1) && 
         <ReactPaginate
         pageCount={totalPages}
         pageRangeDisplayed={5}
         marginPagesDisplayed={1}
         onPageChange={({ selected }) => setCurrentPage(selected + 1)}
         forcePage={currentPage - 1}
         containerClassName={css.pagination}
         activeClassName={css.active}
         nextLabel="→"
         previousLabel="←"
          />
        }
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {(isModalOpen && selectedMovie)  && <MovieModal onClose={handleCloseModal} movie={selectedMovie}/>}
        {(data && data.results.length > 0) && (<MovieGrid movies={data.results} onSelect={onMovieClick} />)}
      
      </div>
    </>
  )
}


