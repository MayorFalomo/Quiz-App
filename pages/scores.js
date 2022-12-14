import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { AppContext } from "./helpers/helpers";
import styles from "../styles/Scores.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const scores = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const { score, theme } = useContext(AppContext);
  return (
    <div id={theme} data-aos="zoom-in-up" className={styles.container}>
      <h1>Your score is {score} / 10 </h1>
      <p>{score <= 4 ? "You're not smart afterall lol." : ""}</p>
      <p>{score == 5 ? "You're just average, Do Better!!." : ""}</p>
      <p>{score > 5 ? "Seems like you're Smart afterall, Congrats!." : ""}</p>
      <Link href="./">
        <button className={styles.restartBtn}>Restart Quiz </button>{" "}
      </Link>
    </div>
  );
};

export default scores;
