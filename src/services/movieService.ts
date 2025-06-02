import axios from "axios";
import type { Movie } from "../types/movie";

interface Response {
    results: Movie[];
}

const API_KEY = import.meta.env.VITE_TMDB_TOKEN as string;
const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';


export async function fetchMovies(query:string):Promise<Movie[]> {
    try {
        const response = await axios.get<Response>(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
            },
            params: {
                query: query,
                include_adult: false,
                language: 'en-US',
            }
        });
        
        return response.data.results;
    }
    catch(error) {
        console.error('Failed to fetch movies:', error);
        throw error;
    }
    
}