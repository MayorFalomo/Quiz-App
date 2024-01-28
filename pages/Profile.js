import Link from "next/link";
import React, { useEffect } from "react";
import styles from "../styles/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setTheme } from "../components/GlobalRedux/features/themeSlice";
import { AnimatePresence, motion } from "framer-motion";
import { resetScore } from "../components/GlobalRedux/features/scoreSlice";

const Profile = () => {
  // const { theme } = useContext(AppContext);

  const router = useRouter();
  const dispatch = useDispatch();
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
    dispatch(resetScore({ score: 0 }));

    if (localStorage) {
      localStorage.setItem("theme", theme.theme);
    } else {
      console.log("errr");
    }
  }, [theme.theme]);

  const photo =
    typeof window !== "undefined" && localStorage.getItem("photoUrl");
  return (
    <AnimatePresence mode="wait">
      <motion.div id={theme.theme} className={styles.container}>
        <div className={styles.profileImage}>
          <img src={photo ? photo || user.profilePic : ""} alt="img" />{" "}
        </div>
        <h2 style={{ color: theme.theme == "dark" ? "white" : "black" }}>
          {" "}
          {typeof window !== "undefined"
            ? localStorage.getItem("name")
            : user.name}
        </h2>
        <h2>
          {typeof window !== "undefined"
            ? localStorage.getItem("email")
            : user.email}{" "}
        </h2>
        <p>Account Admin: Falomo Mayowa </p>
        <Link href="./questions">
          <button>Start Quiz </button>
        </Link>

        <motion.div
          className={styles.slideIn}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
        <motion.div
          className={styles.slideOut}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        ></motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Profile;
