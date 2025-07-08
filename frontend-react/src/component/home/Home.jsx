import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StatusCounts from "./StatusCounts";
import AreaChartComponent from "./AreaChartComponent";
import SankeyChart from "./SankeyChart";

const Home = () => {
  return (
    <>
      <StatusCounts />
      <AreaChartComponent />
      <SankeyChart />
    </>
  );
};

export default Home;
