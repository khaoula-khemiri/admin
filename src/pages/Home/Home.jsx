import { React, useState, useEffect, useMemo } from 'react';
import Chart from "../../components/chart/Chart";
import Feautredinfo from "../../components/feautredinfo/Feautredinfo";
import "./home.css";
import { userRequest } from "../../requestMethodes"
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.create({
          baseURL: BASE_URL,
          headers: { token: `Bearer ${currentUser?.accessToken}` }
        }).get("/users/stats");
        console.log(res.data);
        const data = res.data.sort((a, b) => a._id - b._id)
        console.log(data);
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },//take month number in the array
          ])
        );
      } catch (err) {
        console.log(err.response.data);
        console.log("err")
      }
    };
    getStats();

  }, [MONTHS]);

  return (
    <div className="home">
      <Feautredinfo />
      <Chart
        data={userStats}
        title="User Analytics"
        dataKey="New User"
        grid
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
