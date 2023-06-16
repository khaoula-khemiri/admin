import { React, useState, useEffect } from 'react';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { userRequest } from "../../requestMethodes"
import "./feautredinfo.css"
import axios from "axios"
const Feautredinfo = () => {
  const [income, setIncome] = useState("")
  const [perc, setPerc] = useState(0)

  useEffect(() => {
    const getIncome = async () => {
      const BASE_URL = "https://apishop.onrender.com/api/";
      const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
      const currentUser = user && JSON.parse(user).currentUser;
      try {
        const res = await axios.create({
          baseURL: BASE_URL,
          headers: { token: `Bearer ${currentUser?.accessToken}` }
        }).get("orders/income");

        setIncome(res.data[0].total)
        setPerc(res.data[1].total * 100 / res.data[0].total - 100)
      } catch (err) {
        console.log();

      }
    };
    getIncome();
  }, []);



  return (
    <div className='feautredinfo'>
      <div className="padge">
        <div className="padgeTitle">Revanue</div>
        <div className="padgeMoneyContainer">
          <div className="padgeMoney">
            ${income}
          </div>
          <div className="padgeMoneyIncrease">
            %{Math.floor(perc)}
            {perc < 0 ?
              <ArrowDownward className="padgeIcon" />
              : <ArrowUpward className="padgeIcon positive" />
            }
          </div>
        </div>
        <span className="padgeCommentaire">
          compared to last month
        </span>

      </div>

      <div className="padge">
        <div className="padgeTitle">Sales</div>
        <div className="padgeMoneyContainer">
          <div className="padgeMoney">
            $4,415
          </div>
          <div className="padgeMoneyIncrease">
            -1.4
            <ArrowDownward className="padgeIcon" />
          </div>
        </div>
        <span className="padgeCommentaire">
          compared to last month
        </span>

      </div>

      <div className="padge">
        <div className="padgeTitle">Cost</div>
        <div className="padgeMoneyContainer">
          <div className="padgeMoney">
            $2,225
          </div>
          <div className="padgeMoneyIncrease">
            +2.4
            <ArrowUpward className="padgeIcon positive" />
          </div>
        </div>
        <span className="padgeCommentaire">
          compared to last month
        </span>

      </div>
    </div>
  );
}

export default Feautredinfo;
