import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  
        
    title: {
      textAlign:'center',
      width:'100%',
      
    },
    
  }));
const Appbar = () => {
    
      const classes = useStyles();

    return (
        <div>
           <AppBar position="static">
      <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
    </IconButton>
    <Typography variant="h4" className={classes.title}>
      Movie Search
    </Typography>
  </Toolbar>
    </AppBar> 
        </div>
    )
}

export default Appbar
