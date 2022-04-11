import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './../../Components/Header/Header'
// import ContentHomePage from './Components/Container/ContentHomePage'
import Footer from './../LandingPage/Footer/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
