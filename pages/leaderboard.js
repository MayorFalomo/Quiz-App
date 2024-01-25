import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../components/Firebase-config";
import ChartJs from "../components/ChartJs";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/leaderboard.module.css";

const leaderboard = () => {
  const [users, setUsers] = useState([]);
  const theme = useSelector((state) => state.currentTheme.value);

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("theme", theme.theme);
    } else {
      console.log("errr");
    }
  }, [theme.theme]);

  const dispatch = useDispatch();
  useEffect(() => {
    const getAllUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users"); // Replace 'users' with your actual collection name

      try {
        const querySnapshot = await getDocs(usersCollection);

        const users = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        // console.log("All users:", users);
        setUsers(users);
        return users;
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
    getAllUsers();
  }, []);

  const [userChartData, setUserChartData] = useState({
    labels: users.map((data) => data.score),
    datasets: [
      {
        label: "Fastest Time ",
        data: users.map((data) => console.log(data.time, "data time")),
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });

  // console.log(users, "user chart");

  return (
    <div
      style={{
        color: theme.theme == "dark" ? "white" : "black",
        backgroundColor: theme.theme == "dark" ? "white" : "black",
      }}
    >
      <ChartJs userChartData={userChartData} />
    </div>
  );
};

export default leaderboard;
