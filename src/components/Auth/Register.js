import React from 'react'
import { Icon } from 'semantic-ui-react'
import './Auth.styles.scss'
import { Link, useHistory } from 'react-router-dom'
import md5 from 'md5'
import firebase from '../../firebase'

export default function Register() {
  const initialState = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [registerUserState, setRegisterUserState] = React.useState(initialState)
  const [errors, setErrors] = React.useState([])
  const [status, setStatus] = React.useState('')
  const [successMessage,
    //  setSuccessMessage
    ] = React.useState("");
  const [userRef] = React.useState(firebase.database().ref('/users'))
  const history = useHistory();
  const handleChange = (event) => {
    setRegisterUserState({
      ...registerUserState,
      [event.target.name]: event.target.value,
    })
  }

  const formIsValid = () => {
    let errors = []
    let error
    if (isFormEmpty(registerUserState)) {
      error = { message: 'Please fill in all the fields' }
      setErrors(errors.concat(error))
      return false
    } else if (!isPasswordValid(registerUserState)) {
      error = { message: 'Password is invalid' }
      setErrors(errors.concat(error))
      return false
    } else {
      return true
    }
  }

  const isFormEmpty = ({ userName, email, password, confirmPassword }) => {
    return !userName || !email || !password || !confirmPassword
  }

  const isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false
    } else if (password !== confirmPassword) {
      return false
    } else {
      return true
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (formIsValid()) {
      const { email, password } = registerUserState
      const errors = []
      setErrors(errors)
      setStatus('PENDING')
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          
        try {
          await createdUser.user.updateProfile({
            displayName: userName,
            photoURL: `https://www.gravatar.com/avatar/${md5(
              createdUser.user.email
            )}?d=identicon`,
          })
          await saveUser(createdUser)
          setStatus('RESOLVED')
          history.push('/login')
          // await auth().sendSignInLinkToEmail(email);
          // firebase.auth().sendSignInLinkToEmail(email);
          // setSuccessMessage("Please check your email");
        } catch (err) {
          setStatus('RESOLVED')
          setErrors(errors.concat({ message: err.message }))
        }
      } catch (err) {
        setStatus('RESOLVED')
        setErrors(errors.concat({ message: err.message }))
      }
    }
    setRegisterUserState(initialState);

  }

  const saveUser = (createdUser) =>
    userRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      photoUrl: createdUser.user.photoURL,
    })

  const handleInputError = (errors, inputName) => {
    return errors.some((err) =>
      err.message.toLowerCase().includes(inputName.toLowerCase())
    )
      ? 'error'
      : ''
  }

  const { userName, email, password, confirmPassword } = registerUserState

  return (
    <div className="auth">
      <div className="wrapper">
        <div className="register" style={{ marginTop: '-140px' }}>
          <h2>
            <Icon name="puzzle piece" />
            Register for new account
          </h2>
          <form onSubmit={onSubmit}>
            <label
              style={{
                color: errors.includes('username') ? '#d72323' : 'white',
              }}
            >
              USERNAME
            </label>
            <input
              type="text"
              name="userName"
              icon="user"
              placeholder="User Name"
              value={userName}
              onChange={handleChange}
              className={handleInputError(errors, 'userName')}
            />
            
            <label
              style={{ color: errors.includes('email') ? '#d72323' : 'white' }}
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
            <label
              style={{
                color: errors.includes('password') ? '#d72323' : 'white',
              }}
            >
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className={handleInputError(errors, 'password')}
            />
            <button
              disabled={status === 'PENDING'}
              className={status === 'PENDING' ? 'loading' : ''}
              type="submit"
            >
              Register
            </button>
            {/* </Segment> */}
          </form>
          {successMessage && <p className="error">{successMessage}</p>}
          {errors.length > 0 &&
            errors.map((err, i) => (
              <div className="error" key={i}>
                <p>{err.message}</p>
              </div>
            ))}
          <div>
            <Link to="/login" style={{ fontSize: '1.2rem' }}>
              Already have an account? Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
