import React from 'react';
import ImageLogo from './ImageLogo';
import {stringify} from 'querystring';

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      errorMsg: '',
      emailValue: '',
      passwordValue: '',
      isFeching: false
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  handleChangeEmail(event) {
    this.setState({emailValue: event.target.value});
  }
  handleChangePassword(event) {
    this.setState({passwordValue: event.target.value});
  }

  onClickLogin() {
    event.preventDefault();
    const {emailValue, passwordValue} = this.state
    const fromData = {
      email: emailValue,
      password: passwordValue
    };
    this.setState({isFeching: true, isError: false, errorMsg: ''});
    this.fechLogin(fromData);
  }

  fechLogin(fromData) {
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fromData)
    }).then((response) => {
      if (response.status >= 400) {
        response.json().then((object) => {
          this.setState({isError: true, errorMsg: object.msg, isFeching: false});
        })
      } else if (response.status === 200) {
        response.json().then((object) => {
          this.setState({isError: false, errorMsg: '', isFeching: false});
          alert('Login Successed');
        })
      }
    }).catch((err) => {
      console.log(err.response)
      this.setState({isError: true, errorMsg: err.msg})
    })
  }

  render() {
    const {emailValue, passwordValue, errorMsg, isError, isFeching} = this.state
    return (
      <div className="container">
        <div className="card">
          <ImageLogo isSpiner={isFeching}/>
          <div className="form-login">
            <div className="email-form">
              <label htmlFor="email">Email address</label>
              <input type="email" value={emailValue} onChange={this.handleChangeEmail} placeholder="examplexxx@appman.co.th" name="email"/>
            </div>
            <div className="password-form">
              <label htmlFor="password">Password</label>
              <input type="password" value={passwordValue} onChange={this.handleChangePassword} name="password"/>
              {
                isError && <label className="error">{errorMsg}</label>
              }
            </div>
            {
              !isFeching && <button onClick={this.onClickLogin} className="login-button">SIGN IN</button>
            }
          </div>
          <div className="footer">
            <a href="" target="_blank">Forgot password?</a>
            <a href="" target="_blank">Create a new account</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Panel;
