/* eslint-disable no-irregular-whitespace */
import css from "./MovieGrid.module.css"
import type { Movie } from "../../types/movie";

interface MovieGridProps{
    onSelect: (movie:Movie) => void;
    movies: Movie[];
}

const imageURL:string = 'https://image.tmdb.org/t/p/w500/';

export default function MovieGrid({ onSelect, movies }: MovieGridProps) {
    
    return (
        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key={movie.id} onClick={()=> onSelect(movie)}>
                    <div className={css.card}>
                      <img 
                            className={css.image} 
                            src={imageURL + movie.poster_path}
                            alt={movie.title} 
                            loading="lazy" 
                          />
                        <h2 className={css.title}>{movie.title}</h2>
                    </div>
                  </li>
            )
                 
      
)}
</ul>

)
}