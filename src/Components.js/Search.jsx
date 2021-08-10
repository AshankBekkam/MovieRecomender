import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";


const Search = (props) => {
    const useStyles = makeStyles((theme) => ({

        textField: {
          width:'600px%',
        },
      }));
    const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }
  return (

      <div style = {{display:'flex',alignItems:'center'}} >
        <TextField value = {searchValue} onChange ={handleSearchInputChanges} className = {classes.textField} id="outlined-basic" label="Search" variant="outlined" />
        <Button onClick={callSearchFunction} type="submit" value="SEARCH" >Search</Button>
      </div>
    );
}

export default Search;