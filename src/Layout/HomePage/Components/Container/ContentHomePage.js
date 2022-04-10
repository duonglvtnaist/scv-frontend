import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import CardJob from '../CardJob/CardJob'
import Search from '../Search/Search'
import './containerHomePage.css'
import { Link } from 'react-router-dom'

export default function ContentHomePage({onChangeKeywords, onSearchSmartCV, listOfJob}) {
  
  return (
    <div className="contentHomePage">
      <div className="headerButton">
        <Link to="upload-scholarship">
          <div className="headerButtonUpLoad">UPLOAD SCHOLARSHIP</div>
        </Link>
        <Link to="upload-job">
          <div className="headerButtonPostJob">POST JOB</div>
        </Link>
        <Link to="create-cv">
          <div className="headerButtonCreateCV">CREATE CV</div>
        </Link>
      </div>
      <Container>
        <div className="chooseRule">
          <button className="chooseOrg ">For Organization</button>
          <button className="chooseTalent">For Talents</button>
        </div>
        <Search onChangeKeywords={onChangeKeywords} onSearchSmartCV={onSearchSmartCV} />
        <div style={{ paddingBottom: '20px' }}>
          {listOfJob.map(item =>(
            <React.Fragment key={item.id}>
              <CardJob job={item} />
            </React.Fragment>
          ))}
        </div>
      </Container>
    </div>
  )
}
