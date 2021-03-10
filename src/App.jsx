import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Navbar/>
        <Switch>
          <Route path="/" exact>
            inicio...
          </Route>
          <Route path="/login">
            login...
          </Route>
          <Route path="/admin">
            admin...
          </Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
