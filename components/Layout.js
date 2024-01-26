import Navbar from "../components/Navbar";
import styles from "../styles/Layout.module.css";
// import { AppContext } from "../helpers/helpers";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();
  const menuControl = useSelector((state) => state.menuControl.value);

  return (
    <div className={menuControl.menu ? styles.menuActive : styles.menu}>
      <Navbar />
      <AnimatePresence mode="wait">
        <div key={router.pathname} className={styles.mainContain}>
          {children}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
