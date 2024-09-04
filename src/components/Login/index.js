import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import './index.css'

import NxtWatchContext from '../../context/NxtWatchContext'
import {LoginButton} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    checked: false,
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    const {history} = this.props
    this.setState({errorMsg})
    history.replace('/login')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log(username, password)
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeInput = event => this.setState({username: event.target.value})

  onChangePassword = event =>
    this.setState({
      password: event.target.value,
    })

  onChangeCheckbox = event => this.setState({checked: event.target.checked})

  render() {
    const {username, password, errorMsg, checked} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {isDark} = value
          if (Cookies.get('jwt_token') !== undefined) {
            return <Redirect to="/" />
          }
          return (
            <div
              className={
                isDark ? 'login-bg login-bg-dark' : 'login-bg login-bg-light'
              }
            >
              <div
                className={
                  isDark
                    ? 'login-card login-card-dark'
                    : 'login-card login-card-light'
                }
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  className="login-website-logo"
                  alt="website logo"
                />
                <form onSubmit={this.submitForm}>
                  <div className="input-container">
                    <label
                      htmlFor="username"
                      className={
                        isDark
                          ? 'input-label input-label-dark'
                          : 'input-label input-label-light'
                      }
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="input-element"
                      placeholder="Username"
                      onChange={this.onChangeInput}
                      value={username}
                    />
                  </div>
                  <div className="input-container">
                    <label
                      htmlFor="password"
                      className={
                        isDark
                          ? 'input-label input-label-dark'
                          : 'input-label input-label-light'
                      }
                    >
                      PASSWORD
                    </label>
                    <input
                      type={checked ? `text` : `password`}
                      className="input-element"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={this.onChangePassword}
                    />
                  </div>
                  <div className="input-container">
                    <input
                      type="checkbox"
                      id="checkbox"
                      className="checkbox"
                      onChange={this.onChangeCheckbox}
                    />
                    <label className="input-label2" htmlFor="checkbox">
                      Show Password
                    </label>
                  </div>
                  <LoginButton type="submit">Login</LoginButton>
                  <p className="error-message">{errorMsg}</p>
                </form>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Login
