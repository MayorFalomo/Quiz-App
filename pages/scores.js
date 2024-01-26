import Link from "next/link";
import React, { useEffect } from "react";
import styles from "../styles/Scores.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";

const scores = () => {
  const theme = useSelector((state) => state.currentTheme.value);
  const score = useSelector((state) => state.score.value);
  const time = useSelector((state) => state.time.value);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div id={theme.theme} data-aos="zoom-in-up" className={styles.container}>
      <h1
        style={{
          color: theme.theme == "dark" ? "white" : "black",
        }}
      >
        Your score is {score.score} / 10{" "}
      </h1>
      {time.timeUpMessage ? (
        ""
      ) : (
        <p
          style={{
            color: theme.theme == "dark" ? "white" : "black",
          }}
        >
          {score.score <= 4 ? "You're not smart afterall lol.😌" : ""}
        </p>
      )}
      {time.timeUpMessage ? (
        ""
      ) : (
        <p
          style={{
            color: theme.theme == "dark" ? "white" : "black",
          }}
        >
          {" "}
          {score.score >= 5
            ? "Seems like you're Smart afterall, Congrats!.🏆"
            : ""}
        </p>
      )}
      {time.timeUpMessage ? (
        <p
          style={{
            color: theme.theme == "dark" ? "white" : "black",
          }}
        >
          You're quite slow aren't you lol. 🐢{" "}
        </p>
      ) : (
        ""
      )}
      <div className={styles.flexBtn}>
        <Link href="./Profile">
          <button className={styles.restartBtn}>Restart Quiz </button>{" "}
        </Link>
        <Link href="./leaderboard">
          <button className={styles.restartBtn}>See leaderboard </button>{" "}
        </Link>
      </div>
    </div>
  );
};

export default scores;
