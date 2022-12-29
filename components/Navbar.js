import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "../helpers/helpers";
import styles from "../styles/Navbar.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdNightlight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


const Navbar = () => {
  const {
    menu,
    setMenu,
    changed,
    handleChange,
  } = useContext(AppContext);

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
                  onClick={handleChange}
                  className={changed ? styles.ballActive : styles.ball}
                ></div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
