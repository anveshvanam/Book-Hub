import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {userInput: '', passwordInput: '', showError: false, errorMsg: ''}

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  successLogin = jwtToken => {
    this.setState({showError: false, errorMsg: ''})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  showError = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitLogin = async event => {
    const {userInput, passwordInput} = this.state
    event.preventDefault()
    const userDetails = {
      username: userInput,
      password: passwordInput,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    if (response.ok) {
      this.successLogin(data.jwt_token)
    } else {
      this.showError(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {userInput, passwordInput, showError, errorMsg} = this.state

    return (
      <div className="login-container">
        <div className="image-logo-container">
          <img
            src="https://res.cloudinary.com/dq9eefxnb/image/upload/v1677406211/cup_max9mr.png"
            className="bookhub-image"
            alt="login website logo"
          />
        </div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.onSubmitLogin}>
            <img
              src="https://res.cloudinary.com/dq9eefxnb/image/upload/v1677406294/logo_r0zrx8.png"
              className="website-logo"
              alt="website login"
            />
            <label className="label" htmlFor="userInput">
              Username*
            </label>
            <input
              type="text"
              className="input"
              id="userInput"
              value={userInput}
              onChange={this.onChangeUserInput}
            />
            <label className="label" htmlFor="passwordInput">
              Password*
            </label>
            <input
              type="password"
              className="input"
              id="passwordInput"
              value={passwordInput}
              onChange={this.onChangePasswordInput}
            />
            {showError && <p className="error-message">{errorMsg}</p>}

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
