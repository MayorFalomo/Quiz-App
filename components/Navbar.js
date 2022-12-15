import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "../pages/helpers/helpers";
import styles from "../styles/Navbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdNightlight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { ThemeProvider } from "next-themes";

const Navbar = () => {
  const {
    theme,
    setTheme,
    myTheme,
    setMyTheme,
    menu,
    setMenu,
    changed,
    setChanged,
    handleChange,
  } = useContext(AppContext);

  // const { theme, setTheme } = ThemeProvider();
  return (
    <nav className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.header}>
          <h1 onClick={() => setMenu(!menu)} style={{ cursor: "pointer" }}>
            {<RxHamburgerMenu size={50} color="white" />}
          </h1>
          <h1 className={menu ? styles.show : styles.hide}> Quiz App </h1>
        </div>
        <ul className={menu ? styles.ulActive : styles.ulOff}>
          <Link className={styles.links} href="./">
            Home{" "}
          </Link>
          <Link className={styles.links} href="./Profile">
            {" "}
            Profile{" "}
          </Link>
          <Link className={styles.links} href="./questions">
            Tests{" "}
          </Link>
          <Link className={styles.links} href="./about">
            About{" "}
          </Link>
          {changed ? (
            <li className={styles.themeMode}>
              {" "}
              {<MdLightMode />} Light Mode
              <div className={styles.toggleContain}>
                <div
                  // id={changed ? "active" : "ball"}
                  onClick={handleChange}
                  className={changed ? styles.ballActive : styles.ball}
                ></div>
              </div>
            </li>
          ) : (
            <li className={styles.themeMode}>
              {" "}
              {<MdNightlight />} Dark Mode
              <div className={styles.toggleContain}>
                <div
                  // id="ball"
                  onClick={handleChange}
                  className={changed ? styles.ballActive : styles.ball}
                ></div>
              </div>
            </li>
          )}
          {/* <button onClick={() => setTheme("light")}>Light Mode</button>
          <button onClick={() => setTheme("dark")}>Dark Mode</button> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
