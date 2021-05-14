import React, {useEffect, useState} from 'react';
import './Row.css';
import axios from "../../config/axios";

const base_image_url = 'https://image.tmdb.org/t/p/original/';

const Row = ({title, fetchUrl, isLargeRow}) => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            /**
             * axios type of array data can be e.g: response.data.results
             * show the only array of data
             * console.log(request.data.results)
             */
            setMovies(request.data.results);
            return request;
        }
        fetchData()
            .then(response => response);
        /**
         * Is there any variable that pulled in from outside of the useEffect
         * hook , we have to added this variable in dependency list must.
         * Like fetchUrl
         * @see https://reactjs.org/docs/hooks-reference.html#useeffect
         */
    }, [fetchUrl])
     console.log(movies)
    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_image_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
        </div>
    );
};

Row.movieTypes = {
    poster_path: String,
    name: String,
    id: Number,
    backdrop_path: String
};

export default Row;
