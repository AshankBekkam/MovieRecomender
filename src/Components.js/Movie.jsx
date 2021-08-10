import React from "react";
import { Link } from "react-router-dom";

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";


const Movie = ({ movie }) => {
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie">
      <h4>{movie.Title}</h4>
      <div >
        <Link to = {{pathname:'/recomendations',state:{
          movie:movie
        }}}>
        <img
          style = {{cursor:'pointer'}}
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
        </Link>
      </div>
      <p>({movie.Year})</p>
    </div>
  );
};


export default Movie;