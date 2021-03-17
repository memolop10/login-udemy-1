import React from 'react'
import {auth, db} from '../firebase'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const [email ,setEmail] = React.useState('')
    const [pass ,setPass] = React.useState('')
    const [error, setError] = React.useState(null)
    const [esRegistro , setEsRegistro] = React.useState(true)

    const procesarDatos = e => {
        e.preventDefault()
        if (!email.trim()) {
            //console.log('Ingrese Email')
            setError('Ingrese Email')
            return
        }
        if (!pass.trim()) {
            //console.log('Ingrese Password')
            setError('Ingrese Password')
            return
        }
        if (pass.length < 6) {
            //console.log('Password mayor a 6 caracteres o mas')
            setError('Password mayor a 6 caracteres o mas')
            return
        }
        setError(null)
        //console.log('Pasaste todas las validaciones')

        if (esRegistro) {
            registrar()
        }else{
            login()
        }
    }

    const login = React.useCallback(async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email,pass)
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError('Email no encontrado') 
            }
            if (error.code === "auth/wrong-password") {
                setError('Contraseña incorrecta') 
            }   
            console.log(error)
        }
    },[email, pass,props.history])

    const registrar = React.useCallback(async() => {
        try {
           const res = await auth.createUserWithEmailAndPassword(email,pass)
           console.log(res.user)
           await db.collection('usuarios').doc(res.user.email).set({
               email:res.user.email,
               uid: res.user.uid
           })

           await db.collection(res.user.uid).add({
               name:'Tarea de ejemplo',
               fecha: Date.now()
           })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email') {
                setError('Email no valido') 
            }
            if (error.code === "auth/email-already-in-use") {
                setError('El email ya esta registrado')
            }
        }
    }, [email,pass,props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de Usuarios' : 'Login Acceso'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && 
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        }
                        <input 
                          type="email"
                          className="form-control mb-2" 
                          placeholder="Ingrese un email"
                          onChange={e => setEmail(e.target.value)}
                          value={email}/>

                        <input 
                          type="password"
                          className="form-control" 
                          placeholder="Ingrese un password"
                          onChange={ e => setPass(e.target.value)}
                          value={pass}/>

                          <button 
                            className="btn btn-dark btn-lg btn-block mt-3"
                            type="submit">
                             {
                                 esRegistro ? 'Registrarse':'Acceder'
                             }
                          </button>
                          <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={ () => setEsRegistro(!esRegistro)}
                            type="button"
                          >
                              {
                                  esRegistro ? '¿Ya estas Registrado?' : '¿No tienes cuenta?'
                              }
                          </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
