import React from 'react'
import "./sidebar.css"
import {
  Timeline, TrendingUp, Toc, PersonOutline,
  Storefront, AttachMoney, AddCircleOutline, MailOutline,
  DynamicFeed, ChatBubbleOutline, BusinessCenter, Report
} from '@material-ui/icons'
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='list'>
          <div className='listTitle'>Dashboard</div>
          <ul className='listitemContainer'>
            <Link to="/" className='link'>
              <li className='item'>
                <Toc className='itemIcon' />Home
              </li>
            </Link>
            <li className='item'>
              <Timeline className='itemIcon' /> Analytics
            </li>
            <li className='item'>
              <TrendingUp className='itemIcon' />sales
            </li>
          </ul>
        </div>
        <div className='list'>
          <div className='listTitle'>Quick Menu</div>
          <ul className='listitemContainer'>
            <Link to="/users" className='link'>
              <li className='item'>
                <PersonOutline className='itemIcon' />
                Users
              </li>
            </Link>

            <Link to="/newUser" className='link'>
              <li className='item'>
                <AddCircleOutline className='itemIcon' />Create user
              </li>
            </Link>

            <Link to="/products" className='link'>
              <li className='item'>
                <Storefront className='itemIcon' /> Products
              </li>
            </Link>

            <Link to="/newproduct" className='link'>
              <li className='item'>
                <AddCircleOutline className='itemIcon' />Create product
              </li>
            </Link>
          </ul>
        </div>
        <div className='list'>
          <div className='listTitle'>Notifications</div>
          <ul className='listitemContainer'>
            <li className='item'>
              <MailOutline className='itemIcon' />Mail
            </li>
            <li className='item'>
              <DynamicFeed className='itemIcon' /> Feedback
            </li>
            <li className='item'>
              <ChatBubbleOutline className='itemIcon' />Messages
            </li>
          </ul>
        </div>

      </div>
    </div >
  )
}

export default Sidebar
