import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Appbar from './Components.js/Appbar'
const Recomendations = (props) => {
    console.log(props)
    const movie = props.location.state.movie.Title
    console.log(movie)
    const [recs, setrecs] = useState([])
    useEffect(() => {
        try{
        axios.post('http://localhost:5000/predict',{movie:movie})
        .then((res)=>
            {console.log(res.data.recs)
            setrecs(res.data.recs)}
            )}catch(err){
                console.log(err)
            }
            
    }, []);
    return (
        <div>
            <Appbar/>
            {
                recs.map((rec)=><h1>{rec}</h1>)
            }

            
            
            
        </div>
    )
}

export default Recomendations
