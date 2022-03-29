import React from 'react'
import './updateCV.css'
import HeaderDashboard from './../HeaderDashboard/HeaderDashboard'
import imgCV from '../../../assets/Image/img1.png'
import { Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function UpdateCV() {
  return (
    <div className="updateCVContainer">
      <HeaderDashboard />
      <div className="cardCV">
        <div className="cardCVInfo">
          <div className="cardCVInfoItem">
            <Image src={imgCV} className="imgCV"></Image>
            <div className="buttonEditCV">Edit CV</div>
            <div className="dateCreateCV">
              <p className="created">Created</p>
              <p className="dateCreate">8/20/2019</p>
            </div>
          </div>
          <div className="cardCVInfoItem">
            <Image src={imgCV} className="imgCV"></Image>
            <div className="buttonEditCV">Edit CV</div>
            <div className="dateCreateCV">
              <p className="created">Created</p>
              <p className="dateCreate">8/20/2019</p>
            </div>
          </div>
        </div>
        <Link to="/create-cv">
          <div className="buttonCreateNewCV">
            <Icon name="plus" className="iconAddNewCV" size="massive"></Icon>
          </div>
        </Link>
      </div>
    </div>
  )
}
