import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from './Components.js/HomePage';
import Recomendations from './Recomendations';

function App() {

  return (
      <Router>
          <Route path = '/' exact component = {HomePage}/>
          <Route path = '/recomendations' exact component = {Recomendations}/>
      </Router>
  );
}

export default App;
