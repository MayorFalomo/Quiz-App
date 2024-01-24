import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/Layout.module.css";
import { AppContext } from "../helpers/helpers";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  // const { menu } = useContext(AppContext);

  const menuControl = useSelector((state) => state.menuControl.value);

  return (
    <div className={menuControl.menu ? styles.menuActive : styles.menu}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
