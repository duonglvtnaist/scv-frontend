import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './../../Components/Header/Header'
import ContentHomePage from './Components/Container/ContentHomePage'
import Footer from './../LandingPage/Footer/Footer'
import NetWorkService from '../../network/network.service';
export default function HomePage() {
  const {
    onChangeKeywords,
    onSearchSmartCV,
    listOfJob,
    onChangeWorkType,
    onChangeCategory, 
    onChangePosition,
    onChangeExperience,
    onApplyToFilterJob,
    onKeySearch
  } = NetWorkService();
  return (
    <>
      <Header />
      {/* <Outlet /> */}
      <ContentHomePage onChangeKeywords={onChangeKeywords} onSearchSmartCV= {onSearchSmartCV} listOfJob= {listOfJob}
      onChangeWorkType = {onChangeWorkType}
      onChangeCategory = {onChangeCategory}
      onChangePosition = {onChangePosition}
      onChangeExperience = {onChangeExperience}
      onApplyToFilterJob = {onApplyToFilterJob}
      onKeySearch = {onKeySearch}/>
      <Footer />
    </>
  )
}
