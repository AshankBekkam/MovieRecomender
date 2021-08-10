import React, { useReducer, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Search from '../Components.js/Search';
import Movie from '../Components.js/Movie';
import Appbar from '../Components.js/Appbar';
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=22af4486"; 

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const useStyles = makeStyles((theme) => ({
  
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign:'center',
    flexGrow: 1,
    
  },
  textField: {
    width:'60%',
    marginTop:'50px'
     
  },
}));

function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);



  useEffect(() => {
    
    fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {
    
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
      });
    });
}, []);

const search = searchValue => {
  dispatch({
    type: "SEARCH_MOVIES_REQUEST"
  });

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=22af4486`)
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        });
      } else {
        dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
        });
      }
    });
};
  const { movies, errorMessage, loading } = state;

  const classes = useStyles();
  return (
      //Appbar
      <div>
      <Appbar/>
    <div style = {{display:'flex',flexDirection:'column',justifyContent:'space-evenly',alignItems:'center'}} className="App">
      {/* <AppBar position="static">
      <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h4" className={classes.title}>
      Movie Search
    </Typography>
  </Toolbar>
    </AppBar> */}
    
    <Search search = {search}/>
    <div style = {{margin:'100px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr'}} className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
    </div>

  );
}

export default HomePage;
