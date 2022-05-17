import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import BarChart from "./Barchart";
import "../styles/chart.scss";

const Chart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { height, width } = useWindowSize();
  const isAuthenticated = location?.state?.isAuthenticated || false;
  const maxArrayLength = 8;
  const maxArrayElement = 100;

  if (!isAuthenticated) navigate("/");

  const [data, setData] = useState([]);

  useEffect(() => {
    changeData();
  }, []);

  const changeData = () => {
    const randomArray = (length, max) =>
      [...new Array(length)].map(() => Math.round(Math.random() * max));
    setData(randomArray(maxArrayLength, maxArrayElement));
  };

  return (
    <section className="chart">
      <BarChart width={width - 40} height={height - 100} data={data} />

      <button onClick={changeData}>Randomize</button>
    </section>
  );
};

export default Chart;
