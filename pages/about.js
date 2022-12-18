import { useContext, useEffect } from "react";
import styles from "../styles/About.module.css";
import { AppContext } from "../helpers/helpers";
import AOS from "aos";
import "aos/dist/aos.css";

const about = () => {
  const { theme } = useContext(AppContext);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      id={theme}
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      className={styles.container}
    >
      <div className={styles.main}>
        <h1>About </h1>
        <p>
          This Quiz App is created using Next JS and both the questions and
          answers are gotten from "The Trivia Api"...The Frontend and UI/UX was
          of Course built from scratch by yours truly...Me! of course, I hope
          You guys like it and if you see any questions that you think the
          answers aren't there, or incomplete, or whatever, Believe you me when
          i tell you it is definitely no fault of mine (I'm Innocent!), so
          please don't drag me, I also went to the trouble of adding nice
          messages for you whatever your score (Yeah i'm a nice person, You're
          welcome), Tell me what you think by sending me a message via any
          social platform really.
        </p>
        <p>
          Instructions: To answer any question, Just click on your answer and
          select Next question button, Your answer is recorded when you choose
          an option.{" "}
        </p>
      </div>
    </div>
  );
};

export default about;
