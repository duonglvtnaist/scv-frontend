import React from 'react'
import { Container, Icon, Button, Image, Form } from 'semantic-ui-react'
import iconWallet from '../../assets/Image/iconWallet.png'
import './signUp.css'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="signUp">
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
          <p className="titleLogin">Sign Up</p>
          <form className="loginForm">
            <input
              placeholder="First Name"
              className="inputInfo"
              name="fname"
            />
            <input placeholder="Last Name" className="inputInfo" name="lname" />
            <input
              placeholder="Email Address"
              className="inputInfo"
              name="email"
            />
            <input
              placeholder="Password"
              className="inputPassword"
              type="password"
            />
            <Link to="/login">
              <Button type="submit" className="textButtonSignUp">
                SIGN UP
              </Button>
            </Link>
          </form>
        </div>
      </Container>
    </div>
  )
}
