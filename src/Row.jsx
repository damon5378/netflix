import React, {useState, useEffect} from "react";
import axios from "axios";
import instance from "./axios";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

export const Row = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await instance(props.fetchURL);
            // https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213

            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // if [], run once when the row loads and don't run again
    }, [props.fetchURL]);


  return (
    <div className="row">

      <h2>{props.title}</h2>

      <div className="row__posters">
        {movies.map( movie => (
            <img 
                key={movie.id}
                src={`${baseURL}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name}
                className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}/>
        ))}
      </div>
    </div>
  );
};
