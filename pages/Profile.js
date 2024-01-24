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
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const { getTheme, setGetTheme } = useState("");

  // useEffect(() => {
  //   if (localStorage) {
  //     const getThemeFromStorage = localStorage.getItem("theme");
  //     dispatch(setTheme({ theme: getThemeFromStorage }));
  //     console.log(getThemeFromStorage, "gotten");
  //     // console.log(getTheme);
  //   } else {
  //     console.log("errr");
  //   }
  // }, []);

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

  // console.log(theme, "This is theme");
  return (
    <div id={theme} className={styles.container}>
      <div className={styles.profileImage}>
        <img
          src={
            typeof window !== "undefined"
              ? localStorage.getItem("photoUrl")
              : "user.profilePics"
          }
          alt="img"
        />{" "}
      </div>
      <h2>
        {" "}
        {typeof window !== "undefined"
          ? localStorage.getItem("name")
          : user.name}
      </h2>
      {/* <h2>{user.telephone} </h2> */}
      <h2>
        {/* {user.email} */}
        {typeof window !== "undefined"
          ? localStorage.getItem("email")
          : user.email}{" "}
      </h2>
      <p>Account Admin: Falomo Mayowa </p>
      <Link href="./questions">
        <button>Start Quiz </button>
      </Link>
    </div>
  );
};

export default Profile;
