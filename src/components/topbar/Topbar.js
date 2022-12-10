import React from 'react';
import "./topbar.css";
import { NotificationsNone, Settings, Language } from '@material-ui/icons'
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useNavigate } from 'react-router-dom';
const TopBar = () => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const handleClick = () => {
    dispatch(logout())
    history("/login")
  }

  return (
    <div className='topbar'>
      <div className="topbarWrapper">
        <div className="topleft">
          <div className="logo">Admin-App</div>
        </div>
        <div className="topright">
          <div className="topbarIconContainer" onClick={handleClick}>
            Log out
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>

          <div className='imageContainer'>
            <img className='topAvatar' src='https://valoxy.org/blog/wp-content/uploads/2021/03/histoire-du-droit-des-femmes-au-travail-e1620197976552.jpg' alt='user'></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
