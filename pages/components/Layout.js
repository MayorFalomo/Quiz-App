import React, { useContext } from "react";
import Navbar from "./Navbar";
import styles from "../../styles/Layout.module.css";
import { AppContext } from "../helpers/helpers";

const Layout = ({ children }) => {
  const { menu } = useContext(AppContext);

  return (
    <div className={menu ? styles.menuActive : styles.menu}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
