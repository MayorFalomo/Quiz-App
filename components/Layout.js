import Navbar from "../components/Navbar";
import styles from "../styles/Layout.module.css";
// import { AppContext } from "../helpers/helpers";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  // const { menu } = useContext(AppContext);
  const router = useRouter();
  const menuControl = useSelector((state) => state.menuControl.value);

  return (
    <div className={menuControl.menu ? styles.menuActive : styles.menu}>
      <Navbar />
      <AnimatePresence mode="wait">
        <div key={router.pathname} className={styles.mainContain}>
          {children}
          {/* <motion.div
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
          ></motion.div> */}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
