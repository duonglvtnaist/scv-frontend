import React from 'react'
import { Image, Icon, Button, Container } from 'semantic-ui-react'
import './Login.css'
import iconWallet from '../../assets/Image/iconWallet.png'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="login">
      <Container>
        <div className="infoAddress">
          <div className="wallet">
            <Image src={iconWallet} className="iconWallet"></Image>
          </div>
          <div className="addressDetail">
            <p className="textAddress">2394730dsfsdfewfsedf</p>
            <Icon name="angle down" size="large" color="black"></Icon>
          </div>
        </div>
        <div className="loginCenter">
          <p className="titleLogin">Welcome</p>
          <Icon name="user circle" size="massive" className="iconUser"></Icon>
          <div className="loginForm">
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                type="email"
                placeholder="Email Address"
                className="inputInfo"
                name="username"
              />
              <input
                placeholder="Password"
                className="inputPassword"
                type="password"
                name="password"
                autoComplete="email"
              />
            </form>
            <Link to="/dashboard">
              <Button type="submit" className="buttonLogin">
                LOG IN
              </Button>
            </Link>
            <div className="forgotPassword">
              Forgot <span className="recoverPassword">password</span>?
            </div>
            <div className="dontHaveAccount">
              <span>Don't have an account? </span>
              <Link to="/sign-up">
                <span className="textSignUp">Sign up</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
