import React from "react";
import Link from "next/link";
import styles from "../styles/errorPage.module.css";
const error = () => {
  return (
    <div className={styles.container}>
      <h1>Page not Found </h1>
      <h3>Olodo person, Who send you come here??!! Rubbish</h3>
      <Link className={styles.home} href="/">
        Go back Home{" "}
      </Link>
    </div>
  );
};

export default error;
