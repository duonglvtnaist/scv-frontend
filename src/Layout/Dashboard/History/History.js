import React from 'react'
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard'
import { Image } from 'semantic-ui-react'
import ImageJob from '../../../assets/Image/img1.png'
import './history.css'

export default function History() {
  return (
    <div className="history">
      <HeaderDashboard />
      <div className="historyInfo">
        <div className="historyContent">
          <div className="imgHistory">
            <Image src={ImageJob} className="imgHistoryDetail"></Image>
            <p className="nameBranch">Toyota</p>
          </div>
          <div className="historyContentDetail">
            <p className="historyTitle">Product Designer</p>
            <p className="historyTime">6/2018 - 6/2019</p>
          </div>
          <div className="buttonViewDetail">
            <span className="textButtonViewDetail">View Detail</span>
          </div>
        </div>
      </div>
    </div>
  )
}
