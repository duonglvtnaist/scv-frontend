import React from 'react'
import './cardScholarship.css'
import JobImg from '../../../../assets/Image/img1.png'
import { Image, Button } from 'semantic-ui-react'
import moment from 'moment'
export default function CardScholarship({scholarship, key}) {
  return (
    <div className="cardJob" key={key+ 'cardJob'}>
      <Image src={JobImg} alt="JobIMG" className="imageJob" />
      <div className="jobInfo" key={key + 'jobInfo'}>
        <div className="jobInfoTop" key={key + 'jobInfoTop'}>
          <span className="jobTitle" key={key + 'jobTitle'}>{scholarship.title}</span>
          <span className="jobSalary" key={key + 'jobSalary'}>{scholarship.type}</span>
        </div>
        <div className="jobInfoCenter" key={key + 'jobInfoCenter'}>
          <div style={{ display: 'flex' }} key={key + 'inner_jobInfoCenter'}>
            <p className="jobAddress" key={key + 'jobAddress'}>{scholarship.school}</p>
            <p className="jobTime" key={key + 'jobTime'} >{moment(scholarship.applicationDeadline).format('YYYY/DD/MM')}</p>
            <p className="jobProject" key={key + 'jobProject'}>{scholarship.description}</p>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }} key={key+ 'out_jobCompany'}>
            <p className="jobCompany" style={{ fontWeight: 'bold' }} key={key+ 'jobCompany'}>
              {scholarship.field}
            </p>
            <p className="jobView" key={key+ 'jobView'}>
              <span style={{ fontWeight: 'bold' }} key={key + 'inner_jobView'}>0</span> views
            </p>
            <p className="jobNumberApply" key={key + 'jobNumberApply'}>
              <span style={{ fontWeight: 'bold' }} key={key + 'inner_jobNumberApply'}>1</span> applications
            </p>
          </div>
        </div>
        <div className="jobInfoBottom" key={key+ "jobInfoBottom"}>
          {scholarship.keywords.split(',').map((item) => (
            <span className="jobRequest" key={key + item + 'jobRequest'}>{item} </span>
          ))}
        </div>
      </div>
      <div className="buttonJobDetail" key={key + 'buttonJobDetail'}>
        <Button
          content="Detail"
          icon="right arrow"
          labelPosition="right"
          color="black"
        />
      </div>
    </div>
  )
}
