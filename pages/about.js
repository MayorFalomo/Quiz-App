import { useEffect } from "react";
import styles from "../styles/About.module.css";
// import { AppContext } from "../helpers/helpers";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

const about = () => {
  // const { theme } = useContext(AppContext);
  const theme = useSelector((state) => state.currentTheme.value);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("theme", theme.theme);
    } else {
      console.log("errr");
    }
  }, [theme.theme]);

  return (
    <AnimatePresence>
      <div id={theme.theme} className={styles.container}>
        <div className={styles.main}>
          <div className={styles.textsCon}>
            <h1>About </h1>
            <p>
              This Quiz App is created using Next js, and Next js core css
              modules with redux toolkit for state management and both the
              questions and answers are gotten from "The Trivia Api"...The
              Frontend part was of Course built and designed from scratch by
              yours truly...Me! of course (Sweeping bow), I hope You guys liked
              it and if you see any questions that you think the answers aren't
              there, or incomplete, or whatever, Believe you me when i tell you
              it is definitely no fault of mine (I'm Innocent!, don't kill me!),
              I also went to the trouble of adding nice sweet little messages
              for you depending on your score (Yeah i'm a nice person, You're
              welcome), Tell me what you think by sending me a message via any
              social platform really and do follow me on github.
            </p>
            <p>
              Instructions: To answer any question, Just click on your answer
              and select Next question button, Your answer is recorded when you
              choose an option.{" "}
            </p>
          </div>
        </div>
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
      </div>
    </AnimatePresence>
  );
};

export default about;
