import React from 'react'
import './Sidebar.css'
import { Icon } from 'semantic-ui-react'
import { Link, Outlet } from 'react-router-dom'
import { SidebarUser } from './../../../Components/Data/Data'

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div>
        {SidebarUser.map(Sidebar => {
          return (
            <Link to={Sidebar.link} key={Sidebar.id}>
              <div className="menuDashboard">
                <Icon
                  name={Sidebar.icon}
                  className="iconMenu"
                  size="big"
                ></Icon>
                <span className="textMenu">{Sidebar.title}</span>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="buttonLogOut">
        <Link to="/login">
          <Icon name="sign-out" className="iconMenu" size="big"></Icon>
          <span className="textMenu">Log Out</span>
        </Link>
      </div>
    </div>
  )
}
