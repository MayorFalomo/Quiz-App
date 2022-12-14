import Link from "next/link";
import React, { useContext, useEffect } from "react";
import styles from "../styles/Profile.module.css";
import { AppContext } from "./helpers/helpers";
import AOS from "aos";
import "aos/dist/aos.css";

const Profile = () => {
  const { theme } = useContext(AppContext);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div
      id={theme}
      data-aos="fade-up"
      data-aos-duration="3000"
      className={styles.container}
    >
      <div className={styles.profileImage}>
        {/* <img src={localStorage?.getItem("photoUrl")} />{" "} */}
      </div>
      {/* <h2>{localStorage?.getItem("name")} </h2>
      <h2> {localStorage?.getItem("email")} </h2> */}
      <p>Account Admin: Falomo Mayowa </p>
      <Link href="./questions">
        <button>Start Quiz </button>
      </Link>
    </div>
  );
};

export default Profile;
