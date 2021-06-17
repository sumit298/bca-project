import React from 'react'
// import { TransitionGroup, CSSTransition } from 'react-transition-group'

import './Auth.styles.scss'
import { Link } from 'react-router-dom'
import firebase from '../../firebase'
import { Icon } from 'semantic-ui-react'

function ForgetPassword() {
  const initialState = {
    email: '',
  }

  const [loginUserState, setRegisterUserState] = React.useState(initialState)
  const [successMessage, setSuccessMessage] = React.useState('')
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState('')

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
      const { email } = loginUserState
      setErrors(errors)
      setStatus('PENDING')

      try {
        await firebase.auth().sendPasswordResetEmail(email)
        setSuccessMessage('Please check your inbox')
        setStatus('RESOLVED')
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

  const formIsValid = ({ email }) => {
    return email
  }

  const handleInputError = (errors, inputName) => {
    return errors.some((err) =>
      err.message.toLowerCase().includes(inputName.toLowerCase())
    )
      ? 'error'
      : ''
  }

  const { email } = loginUserState

  return (
    <div className="auth">
      <div className="wrapper">
        <div className="login" style={{ marginTop: -70 }}>
          <h2>
            <Icon name="unlock" /> Reset Password
          </h2>

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

            <button
              disabled={status === 'PENDING'}
              className={status === 'PENDING' ? 'loading' : ''}
              type="submit"
            >
              Reset Password
            </button>
          </form>
          <h4>
            <Link to="/login">Return to Login? </Link>
          </h4>
          {successMessage && (
            <p className="error" style={{ color: 'green' }}>
              {successMessage}
            </p>
          )}
          {errors.length > 0 &&
            errors.map((err, i) => (
              <div className="error"  key={i}>
                <p>{err.message}</p>
              </div>
            ))}
          <div>
            <Link to="/register" style={{ fontSize: '1.2rem' }}>
              New Here? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
