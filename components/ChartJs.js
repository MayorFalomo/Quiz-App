import React, { useRef, useState } from "react";
import styles from "../styles/Chartjs.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend
);
const ChartJs = ({ data }) => {
  const theme = useSelector((state) => state.currentTheme.value);
  Chart.defaults.backgroundColor = "red";

  const chartOptions = {
    maintainAspectRatio: true,
    responsive: true,
  };

  return (
    <div id={theme.theme} className={styles.chartCon}>
      <div className={styles.header}>
        <h1>leaderboards </h1>
        <p
          style={{
            color: theme.theme == "dark" ? "white" : "black",
          }}
        >
          The chart plots a graph of players around the world using data from
          the time they finished against their scores, so you can see how you
          rank against other players{" "}
        </p>
      </div>
      <div className={styles.chart}>
        <Line id="chart" data={data} options={chartOptions} />
      </div>
      <Link href="./profile">
        <button className={styles.restartBtn}>Restart Quiz </button>{" "}
      </Link>
    </div>
  );
};

export default ChartJs;
