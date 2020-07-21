import React, {useState, useEffect} from "react";
import axios from "axios";
import instance from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original/";

export const Row = (props) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');


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

    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
      },
      autoplay: 1
    }

    const handleClick = (movie) => {
      if(trailerUrl) {
        setTrailerUrl('')
      } else {
        movieTrailer(movie?.name || "")
        .then(url => {
          // https://www.youtube.com/watch?v=${}
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get('v'))
        }).catch(error => console.log(error))
      }
    }


  return (
    <div className="row">

      <h2>{props.title}</h2>

      <div className="row__posters">
        {movies.map( movie => (
            <img 
                key={movie.id}
                src={`${baseURL}${props.isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                onClick={ () => handleClick(movie) }
                alt={movie.name}
                className={`row__poster ${props.isLargeRow && "row__posterLarge"}`}/>
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
