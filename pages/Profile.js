import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import { AppContext } from "../helpers/helpers";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setTheme } from "./GlobalRedux/features/themeSlice";

const Profile = () => {
  // const { theme } = useContext(AppContext);

  const router = useRouter();

  const user = useSelector((state) => state.currentUser.value);
  const theme = useSelector((state) => state.currentTheme.value);

  useEffect(() => {
    if (localStorage) {
      const getEmailFromStorage = localStorage.getItem("id");
      if (!getEmailFromStorage) {
        router.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("theme", theme.theme);
    } else {
      console.log("errr");
    }
  }, [theme.theme]);

  const photo =
    typeof window !== "undefined" && localStorage.getItem("photoUrl");
  return (
    <div id={theme.theme} className={styles.container}>
      <div className={styles.profileImage}>
        <img src={photo || user.profilePics || ""} alt="img" />{" "}
      </div>
      <h2 style={{ color: theme.theme == "dark" ? "white" : "black" }}>
        {" "}
        {typeof window !== "undefined"
          ? localStorage.getItem("name")
          : user.name}
      </h2>
      {/* <h2>{user.telephone} </h2> */}
      <h2 style={{ color: theme.theme == "dark" ? "white" : "black" }}>
        {/* {user.email} */}
        {typeof window !== "undefined"
          ? localStorage.getItem("email")
          : user.email}{" "}
      </h2>
      <p style={{ color: theme.theme == "dark" ? "white" : "black" }}>
        Account Admin: Falomo Mayowa{" "}
      </p>
      <Link href="./questions">
        <button style={{ color: theme.theme == "dark" ? "white" : "black" }}>
          Start Quiz{" "}
        </button>
      </Link>
    </div>
  );
};

export default Profile;
