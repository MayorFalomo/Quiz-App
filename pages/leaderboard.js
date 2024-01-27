import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase-config";
import ChartJs from "../components/ChartJs";
import { useSelector } from "react-redux";
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

  useEffect(() => {
    const getAllUsers = async () => {
      const db = getFirestore();
      const usersCollection = collection(db, "users"); // Replace 'users' with your actual collection name

      try {
        const querySnapshot = await getDocs(usersCollection);

        const users = querySnapshot.docs.map((doc, index) => {
          return { id: doc.id, ...doc.data(), index: index + 1 };
        });
        setUsers(users);
        return users;
      } catch (error) {
        console.error("Error getting users:", error);
      }
    };
    getAllUsers();
  }, []);

  const label = users.map((data) => data.score);
  const time = users.map((data) => data.time);

  //Chart must have labels and datasets property
  const data = {
    labels: label,
    datasets: [
      {
        label: "Fastest Time ",

        data: time, // Replace with your actual data values
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  console.log(users, "users");

  return (
    <div id={theme.theme} className={styles.AllUsers}>
      <ChartJs data={data} />

      <div className={styles.leaderBoardData}>
        <div className={styles.flexHeader}>
          <p>#Player </p>
          <p>Score / 10 </p>
          <p>Time/s</p>
        </div>
        <div className={styles.usersMap}>
          {users
            .sort((a, b) => (b.score ?? -Infinity) - (a.score ?? -Infinity))
            .map((user, index) => {
              return (
                <div
                  className={
                    theme.theme == "dark"
                      ? styles.darkUsersMap
                      : styles.userSubMap
                  }
                  key={user.id}
                >
                  <AllUsers user={user} index={index} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const AllUsers = ({ user, index }) => {
  const theme = useSelector((state) => state.currentTheme.value);

  return (
    <div className={styles.userDataContainer}>
      <div className={styles.userData}>
        <div className={styles.userInfoArea}>
          <span>{user.index == 1 ? "🏆 " : `#${user.index}`} </span>
          <div
            style={{
              backgroundImage: user.profilePics
                ? `url(${user.profilePics})`
                : "",
            }}
            className={styles.userDataBgImg}
          ></div>
          <span
            style={{
              color: theme.theme == "dark" ? "white" : "black",
            }}
            className={styles.username}
          >
            {user.username}
          </span>
        </div>
        <p>{user.score} </p>
        <p>{user.time}s </p>
      </div>
    </div>
  );
};

export default leaderboard;
