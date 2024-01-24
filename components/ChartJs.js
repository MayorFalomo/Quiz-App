import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);
import styles from "../styles/leaderboard.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";

const ChartJs = ({ userChartData }) => {
  // console.log(userChartData);
  const dispatch = useDispatch();

  return (
    <div className={styles.chartCon}>
      <div className={styles.chart}>
        <Line data={userChartData} />
      </div>
      <Link href="./">
        <button className={styles.restartBtn}>Restart Quiz </button>{" "}
      </Link>
    </div>
  );
};

export default ChartJs;
