import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import CardJob from '../CardJob/CardJob'
import Search from '../Search/Search'
import './containerHomePage.css'

import NetWorkService from '../../../../network/network.service';
import CardScholarship from '../CardScholaship/CardScholarship'

export default function ContentHomePage() {
    const {
      onChangeKeywords,
      onSearchSmartCV,
      listOfSmartCv,
      onChangeWorkType,
      onChangeCategory, 
      onChangePosition,
      onChangeExperience,
      onApplyToFilterJob,
      onKeySearch
    } = NetWorkService();
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
        <Search onChangeKeywords={onChangeKeywords} onSearchSmartCV={onSearchSmartCV} 
        onChangeWorkType = {onChangeWorkType} onChangeCategory= {onChangeCategory} 
    onChangePosition = {onChangePosition} onChangeExperience = {onChangeExperience} 
    onApplyToFilterJob = {onApplyToFilterJob}
    onKeySearch= {onKeySearch}/>
        <div style={{ paddingBottom: '20px' }}>
          {listOfSmartCv?.jobs?.map(item => (
            <React.Fragment key={'job_'+item.id}>
              <CardJob job={item} key= {'job_'+item.id} />
            </React.Fragment>
          ))}
          {
            listOfSmartCv?.scholaships?.map(item => (
              <React.Fragment key={'scholarchip_'+item.id}>
                <CardScholarship  scholarship={item} key= {'scholarchip_'+item.id} />
              </React.Fragment>
            ))
          }
        </div>
      </Container>
    </div>
  )
}
