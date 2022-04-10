import React from 'react'
import './cardJob.css'
import JobImg from '../../../../assets/Image/img1.png'
import { Image, Button } from 'semantic-ui-react'
import moment from 'moment'
export default function CardJob({job}) {
  return (
    <>
    <div className="cardJob">
      <Image src={JobImg} alt="JobIMG" className="imageJob" />
      <div className="jobInfo">
        <div className="jobInfoTop">
          <span className="jobTitle">{job.jobTitle}</span>
          <span className="jobSalary">{job.position}</span>
        </div>
        <div className="jobInfoCenter">
          <div style={{ display: 'flex' }}>
            <p className="jobAddress">{job.location}</p>
            <p className="jobTime">{moment(job.applicationDeadline).format('YYYY/DD/MM')}</p>
            <p className="jobProject">{job.description}</p>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <p className="jobCompany" style={{ fontWeight: 'bold' }}>
              {job.experience}
            </p>
            <p className="jobView">
              <span style={{ fontWeight: 'bold' }}>0</span> views
            </p>
            <p className="jobNumberApply">
              <span style={{ fontWeight: 'bold' }}>1</span> applications
            </p>
          </div>
        </div>
        <div className="jobInfoBottom">
          {job.keywords.split(',').map(item => (
            <span className="jobRequest">{item} </span>
          ))}
        </div>
      </div>
      <div className="buttonJobDetail">
        <Button
          content="Detail"
          icon="right arrow"
          labelPosition="right"
          color="black"
        />
      </div>
    </div>
    </>
  )
}
