import React from 'react'
import {
  BrowserRouter as Router, 
  Switch, 
  Route} from 'react-router-dom'
import Login from './components/login';
import Navbar from './components/Navbar';
import Admin from './components/Admin'
import Reset from './components/Reset'
import {auth} from './firebase'

function App() {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-5">
        <Navbar firebaseUser={firebaseUser}/>
        <Switch>
          <Route path="/" exact>
            inicio...
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/reset">
            <Reset/>
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
        </Switch>
      </div>
    </Router>
    
  ): (
    <p>Cargando Papu ....</p>
  )
}

export default App;
