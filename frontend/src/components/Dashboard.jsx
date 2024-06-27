import React from 'react'
import './Dashboard.css'
import Logo from "../assets/Insightify.png"
import Clerk from './Clerk'
import { useUserContext } from './UserContext';

const Dashboard = () => {
  const { user } = useUserContext();
  console.log(user)
  return (
    <div>
      <div className="header">
        <div className="header-left">
            <div className="logo">
            <img src={Logo} alt="Insightify" />
            </div>
            <div className="site-name">
              Insightify
            </div>
        </div>
        <div className="header-right">
          <div className="welcome">
          Welcome, {user?.userName || 'Guest'}
          </div>
          <Clerk />
        </div>
      </div>


      <div className="dashboard">
        div.
        <div className="survey-list">

        </div>
      </div>
    </div>
  )
}

export default Dashboard