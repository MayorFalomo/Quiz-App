import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./GlobalRedux/features/userSlice";
import { resetScore } from "./GlobalRedux/features/scoreSlice";

export default function Home() {
  // const { theme } = useContext(AppContext);
  const theme = useSelector((state) => state.currentTheme.value);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser.value);
  //This useEffect sets the theme key to the current theme in the state and runs again when theme changes

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("theme", theme.theme);
    } else {
      console.log("errr");
    }
  }, [theme.theme]);

  //UseEffect only runs if user.id does not have a value so this state would always have a value
  useEffect(() => {
    if (!user.id) {
      dispatch(
        loginUser({
          id: localStorage.getItem("id"),
          name: localStorage.getItem("name"),
          emails: localStorage.getItem("email"),
          profilePics: localStorage.getItem("photoUrl"),
          score: 0,
          time: 0,
        })
      );
    }
    dispatch(resetScore({ score: 0 }));
  }, []);

  // console.log(user, "current user");

  return (
    <div id={theme.theme} className={styles.container}>
      {/* <div data-aos="fade-up" data-aos-duration="3000"></div> */}
      <Head>
        <title>Quiz app</title>
        <meta name="description" content="Quiz app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.heading}>
        <h1>Quiz </h1>
        <div className={styles.HeroImg}>
          <img src="./quizImg.svg" alt="img" />
        </div>

        <p>You think you're smart huh? Lets see just how smart you are... </p>
        <Link href="./Profile">
          <button>Begin! </button>
        </Link>
      </div>
    </div>
  );
}
