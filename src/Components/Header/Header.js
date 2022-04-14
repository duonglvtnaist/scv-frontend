import React, { Component } from 'react'
import { Container, Image } from 'semantic-ui-react'
import './header.css'
import { Link, Outlet } from 'react-router-dom'

export default class Header extends Component {
  render() {
    return (
      <div className="headerLandingHome">
        <Container>
          <div className="headerContainer">
            <div className="headerLeft">
              {/* <Image
                src={`${process.env.PUBLIC_URL}/assets/logo-scv.png`}
                className="logoSCV"
              /> */}
              <p className="logoSCV">SMARTCV</p>
            </div>
            <div className="headerCenter">
              <Link to="/home">
                <div className="Menu">Home</div>
              </Link>
              <div className="Menu">Team</div>
              <div className="Menu">Docs</div>
              <Link to="/dashboard">
                <div className="Menu">Dashboard</div>
              </Link>
            </div>
            <div className="headerRight">
              <button className="buttonConnectWallet">Connect wallet</button>
              <Link to="/login">
                <button className="buttonSignIn">Sign in</button>
              </Link>
              <Link to="/sign-up">
                <button className="buttonSignup">Sign up</button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
