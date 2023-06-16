import { React, useState, useEffect } from 'react';
import "./widgetLg.css"
import { userRequest } from "../../requestMethodes"
import { format } from 'timeago.js';
import axios from "axios"
import { useSelector } from 'react-redux';
const WidgetLg = () => {
  const [orders, setOrders] = useState()
  const [users, setUsers] = useState([])
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    const BASE_URL = "https://apishop.onrender.com/api/";
    // const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
    // const currentUser = user && JSON.parse(user).currentUser;
    const getOrders = async () => {
      try {
        const res = await axios.create({
          baseURL: BASE_URL,
          headers: { token: `Bearer ${currentUser?.accessToken}` }
        }).get("orders/");
        setOrders(res.data);
        //console.log(res.data);
        res.data.map(item =>
          setUsers((prev) => [...prev, { id: item.userId },])
        )

      } catch (err) {
        console.log(err.response);
      }
    };
    getOrders();
  }, []);
  const Button = ({ type }) => {
    return <button className={'widgetLgButton ' + type} >{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle"> Latest transaction</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">
            Customer ID
          </th>

          <th className="widgetLgTh">
            Date
          </th>

          <th className="widgetLgTh">
            Amount
          </th>

          <th className="widgetLgTh">
            Statuts
          </th>
        </tr>

        {orders && orders.map(order => (<tr className='widjetLgTr' key={order._id}>
          <td className='widgetLgUser'>
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{order.createdAt ? format(order.createdAt) : "not defined"}</td>
          <td className="widgetLgAmount">${order.amount}</td>
          <td className="widgetLgStatus"><Button type={order.status} /></td>

        </tr>))}






      </table>
    </div>
  );
}

export default WidgetLg;