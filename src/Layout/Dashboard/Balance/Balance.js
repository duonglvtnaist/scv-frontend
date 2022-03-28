import React from 'react'
import { Icon, Image } from 'semantic-ui-react'
import iconPayment from '../../../assets/Image/iconPayment.png'
import './balance.css'
import HeaderDashboard from '../HeaderDashboard/HeaderDashboard'

export default function UserBalance() {
  return (
    <div className="userBalance">
      <HeaderDashboard />
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
