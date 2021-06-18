import React from 'react'
import { Icon, Button } from 'semantic-ui-react'
import './Auth.styles.scss'
import { Link, useHistory } from 'react-router-dom'
import firebase, { signInWithGoogle } from '../../firebase'

export default function Login() {
  const initialState = {
    email: '',
    password: '',
  }
  const history = useHistory()
  const [loginUserState, setRegisterUserState] = React.useState(initialState)
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState('')

  const handleGoogleSignIn = async () => {
    await signInWithGoogle()
    history.push('/')
  }

  const handleChange = (event) => {
    setRegisterUserState({
      ...loginUserState,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const errors = []
    if (formIsValid(loginUserState)) {
      const { email, password } = loginUserState
      setErrors(errors)
      setStatus('PENDING')

      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        setStatus('RESOLVED')
        history.push('/')
      } catch (err) {
        setStatus('RESOLVED')
        setErrors(errors.concat({ message: err.message }))
      }
    } else {
      let error = { message: 'Please fill the form' }
      setErrors(errors.concat(error))
    }
    setRegisterUserState(initialState)
  }

  const formIsValid = ({ email, password }) => {
    return email && password
  }

  const handleInputError = (errors, inputName) => {
    return errors.some((err) =>
      err.message.toLowerCase().includes(inputName.toLowerCase())
    )
      ? 'error'
      : ''
  }

  const { email, password } = loginUserState

  return (
    <div className="auth">
      <div className="wrapper">
        <div className="login" style={{ marginTop: -90 }}>
          <h2>
            <Icon name="fork" />
            Welcome back!
          </h2>
          <h3>We're so excited to see you again!</h3>

          <form size="large" onSubmit={onSubmit}>
            <label
              style={{
                color: errors.includes('email') ? '#d72323' : 'white',
              }}
            >
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className={handleInputError(errors, 'email')}
            />
            <label
              style={{
                color: errors.includes('password') ? '#d72323' : 'white',
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className={handleInputError(errors, 'password')}
            />
            <button
              disabled={status === 'PENDING'}
              className={status === 'PENDING' ? 'loading' : ''}
              type="submit"
              color="purple"
              size="large"
            >
              Login
            </button>
            <Button
              onClick={handleGoogleSignIn}
              fluid
              style={{ marginTop: 10, marginLeft: '1px', width: '100%' }}
              size="large"
              color="google plus"
            >
              <Icon name="google"></Icon>
              Sign In With Google
            </Button>
          </form>
          <h4>
            <Link to="/forget-password">Forget Password? </Link>
          </h4>
          {errors.length > 0 &&
            errors.map((err, i) => (
              <div className="error" key={i}>
                <p>{err.message}</p>
              </div>
            ))}
          <h4>
            <Link to="/register" style={{ fontSize: '1.2rem' }}>
              New Here? Register
            </Link>
          </h4>
        </div>
      </div>
    </div>
  )
}
