import React from 'react'
import { Icon, Image } from 'semantic-ui-react'
import iconPayment from '../../assets/Image/iconPayment.png'
import './balance.css'

export default function UserBalance() {
  return (
    <div className="userBalance">
      <div className="navbar">
        <Icon name="bell outline" size="big"></Icon>
        <Icon name="user circle" size="huge"></Icon>
      </div>
      <div className="balanceInfo">
        <div className="balanceNumber">
          <div className="textBalanceNumber">$0</div>
          <p className="textAB">Available Balance</p>
        </div>
        <div className="buttonWithDraw">Withdraw</div>
      </div>
      <div className="paymentHistory">
        <Image src={iconPayment} className="iconPayment"></Image>
        <span className="textPayment">Payment History</span>
      </div>
    </div>
  )
}
