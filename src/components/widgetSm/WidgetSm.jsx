import { React, useState, useEffect } from 'react';
import axios from "axios"
import "./widgetSm.css"
import { Visibility } from '@material-ui/icons';
import { userRequest } from "../../requestMethodes"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const WidgetSm = () => {
  const [users, setUsers] = useState()
  const currentUser = useSelector(state => state.user.currentUser);
  useEffect(() => {
    const BASE_URL = "https://apishop.onrender.com/api/";
    // const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    // const currentUser = user && JSON.parse(user).currentUser;

    const getUsers = async () => {
      try {
        const res = await axios.create({
          baseURL: BASE_URL,
          headers: { token: `Bearer ${currentUser?.accessToken}` }
        }).get("users/?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    getUsers();
  }, []);

  return (
    <div className='widgetSm'>
      <div className="widgetSmTitle"> New Join Members</div>
      {users && users.map(user => (<div className="widgetSmUser" key={user._id}>
        <div className="WidgetSmUserInfo">
          <img className="widgetSmUserImage" src={user.img || "https://uybor.uz/borless/uybor/img/user-images/no-avatar.png"} />
          <div className="widgetUserName">{user.username}</div>
        </div>
        <button className='widgetSmButton'>
          <Visibility className='widgetSmIcon' />
          <Link to={"/user/" + user._id} className='link'>Display</Link>
        </button >
      </div>))}

    </div>
  );
}

export default WidgetSm;
