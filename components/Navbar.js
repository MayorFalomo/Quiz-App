import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { AppContext } from "../helpers/helpers";
import styles from "../styles/Navbar.module.css";
import { RxGithubLogo, RxHamburgerMenu, RxTwitterLogo } from "react-icons/rx";
import { MdNightlight } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../components/GlobalRedux/features/themeSlice";
import { setMenu } from "../components/GlobalRedux/features/menuSlice";
import { TbExternalLink } from "react-icons/tb";

const Navbar = () => {
  const theme = useSelector((state) => state.currentTheme.value);

  const menuControl = useSelector((state) => state.menuControl.value);

  const dispatch = useDispatch();

  useEffect(() => {
    const getFromStorage = localStorage.getItem("theme");
    dispatch(
      setTheme({
        theme: getFromStorage,
      })
    );
  }, []);

  //function to handle switch to light mode
  const handleTheme = () => {
    dispatch(
      setTheme({
        theme: "light",
        change: false,
      })
    );
    localStorage.setItem("theme", theme.theme);
  };

  //Function to handle switch to dark mode
  const handleSwitch = () => {
    dispatch(
      setTheme({
        theme: "dark",
        change: true,
      })
    );
    localStorage.setItem("theme", theme.theme);
  };

  const toggleMenu = async () => {
    dispatch(
      setMenu({
        menu: !menuControl.menu,
      })
    );
  };

  // console.log(menuControl.menu, "Menu control");

  return (
    <nav className={menuControl.menu ? styles.activeCon : styles.container}>
      <div className={styles.navbar}>
        <div className={styles.header}>
          <h1 onClick={toggleMenu} style={{ cursor: "pointer" }}>
            {<RxHamburgerMenu color="white" />}
          </h1>
          <h1 className={menuControl.menu ? styles.show : styles.hide}>
            {" "}
            Quiz App{" "}
          </h1>
        </div>
        <ul className={menuControl.menu ? styles.ulActive : styles.ulOff}>
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
          {theme.change ? (
            <li className={styles.themeMode}>
              {" "}
              {<MdLightMode />} Light Mode
              <div className={styles.toggleContain}>
                <div
                  onClick={handleTheme}
                  // onClick={handleChange}
                  className={theme.change ? styles.ballActive : styles.ball}
                ></div>
              </div>
            </li>
          ) : (
            <li className={styles.themeMode}>
              {" "}
              {<MdNightlight />} Dark Mode
              <div className={styles.toggleContain}>
                <div
                  onClick={handleSwitch}
                  // onClick={handleChange}
                  className={theme.change ? styles.ballActive : styles.ball}
                ></div>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.social}>
        <a target="_blank" href="https://github.com/Mayorfalomo">
          <span> {<RxGithubLogo color="white" />} </span>
        </a>
        <a target="_blank" href="https://mayowa-falomo.netlify.app">
          <span> {<TbExternalLink />} </span>
        </a>
        <a target="_blank" href="https://twitter.com/mayowafalomo1">
          <span> {<RxTwitterLogo />} </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
