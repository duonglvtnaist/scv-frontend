import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { Dimmer, Grid, Loader, Message } from 'semantic-ui-react'
import NetWorkService from '../src/network/network.service'
import CreateCV from './Components/CreateCV/CreateCV'
import CreateJob from './Components/CreateJob/CreateJob'
import CreateScholarship from './Components/CreateScholarship/CreateScholarship'
import EditProfile from './Components/EditProfile/EditProfile'
import Login from './Components/Login/Login'
import SignUp from './Components/SignUp/SignUp'
import UserBalance from './Layout/Dashboard/Balance/Balance'
import Dashboard from './Layout/Dashboard/Dashboard'
import History from './Layout/Dashboard/History/History'
import Profile from './Layout/Dashboard/Profile/Profile'
import SearchCV from './Layout/Dashboard/SearchCV/SearchCV'
import CreateCVDB from './Layout/Dashboard/CreateCVDB/CreateCVDB'
import RevokeCV from './Layout/Dashboard/RevokeCV/RevokeCV'
import UpdateCV from './Layout/Dashboard/UpdateCV/UpdateCV'
import ContentHomePage from './Layout/HomePage/Components/Container/ContentHomePage'
import HomePage from './Layout/HomePage/HomePage'
import LandingPage from './Layout/LandingPage/LandingPage'
import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  // const contextRef = createRef()
  const { onChangeKeywords, onSearchSmartCV, listOfJob } = NetWorkService()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="home" element={<HomePage />}>
          <Route
            index
            element={
              <ContentHomePage
                onChangeKeywords={onChangeKeywords}
                onSearchSmartCV={onSearchSmartCV}
                listOfJob={listOfJob}
              />
            }
          ></Route>
          <Route path="create-cv" element={<CreateCV />}></Route>
          <Route path="upload-job" element={<CreateJob />}></Route>
          <Route
            path="upload-scholarship"
            element={<CreateScholarship />}
          ></Route>
        </Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="sign-up" element={<SignUp />}></Route>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Profile />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="balance" element={<UserBalance />}></Route>
          <Route path="history" element={<History />}></Route>
          <Route path="create-cv-dashboard" element={<CreateCVDB />}></Route>
          <Route path="revoke-cv" element={<RevokeCV />}></Route>
          <Route path="search-cv" element={<SearchCV />}></Route>
          <Route path="update-cv" element={<UpdateCV />}></Route>
        </Route>
        <Route path="profile/edit-profile" element={<EditProfile />}></Route>
      </Routes>
    </Router>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
