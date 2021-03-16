import React from 'react'
import {auth} from '../firebase'
import {withRouter} from 'react-router-dom'

const Admin = (props) => {

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        if (auth.currentUser) {
            console.log('existe un usuario')
            setUser(auth.currentUser)
        }else{
          console.log('no existe el usuario')
          props.history.push('/login')
        } 
    },[props.history])

    return (
        <div>
          <h1>Ruta protegida</h1>
          {
              user !== null ? (
                <h4>{user.email}</h4>
              ) : null
          }
          
        </div>
    )
}

export default withRouter(Admin)
