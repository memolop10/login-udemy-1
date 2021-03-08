import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="container mt-5">
        navbar...
        <Switch>
          <Route path="/" exact>
            inicio...
          </Route>
          <Route path="/login">
            logun...
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
