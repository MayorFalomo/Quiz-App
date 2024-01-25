import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/Questions.module.css";
import { AppContext } from "../../helpers/helpers";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginUser } from "../GlobalRedux/features/userSlice";
import { scoreAnswer } from "../GlobalRedux/features/scoreSlice";
import { db } from "../../components/Firebase-config";
import { setDoc, doc } from "firebase/firestore";
import { timeUp } from "../GlobalRedux/features/timeUpSlice";

export default function quiz({ questions, delayResend = "120" }) {
  const [number, setNumber] = useState(0);
  const [quizData, setQuizData] = useState(questions);
  const [newQuestArray, setNewQuestArray] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [chosenOption, setChosenOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [current, setCurrent] = useState(0);

  const user = useSelector((state) => state.currentUser.value);
  const theme = useSelector((state) => state.currentTheme.value);
  const score = useSelector((state) => state.score.value);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  //UseEffect to check if the id is present in storage and if it's not route the user to login
  useEffect(() => {
    if (localStorage) {
      const getEmailFromStorage = localStorage.getItem("id");
      if (!getEmailFromStorage) {
        router.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("theme", theme.theme);
    } else {
      console.log("errr");
    }
  }, [theme.theme]);

  //UseEffect to run the loginUser Object and assign them value
  useEffect(() => {
    dispatch(
      loginUser({
        id: localStorage.getItem("id"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        profilePics: localStorage.getItem("photoUrl"),
        score: 0,
        time: 0,
      })
    );
  }, []);

  //useEffect to add the correct answer into the spread array of incorrect answers to form a new array of four options
  useEffect(() => {
    const oldArray = [
      ...quizData[number].incorrectAnswers,
      quizData[number].correctAnswer,
    ];

    //Then this Function gets the above array and shuffles the options in the array so the options are arranged randomly then assigns that array to the newQuest State then the dependency array runs only when the quizData[number] changes so the options are then shuffled again and so on
    const newArray = oldArray.sort(() => (Math.random() > 0.5 ? 1 : -1));
    setNewQuestArray(newArray);
  }, [quizData[number]]);

  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);

  //useEffect to run the timer function sets a delay of -1 so -1 is subtracted at every 1s interval then if the delay  == 0 then clear the the Interval and run the dispatch state that triggers a message and route to another page  the clear interval also clears the interval every second but the if runs only when the delay == 0
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      //This would run after the count is done
      clearInterval(timer);
      dispatch(
        timeUp({
          timeUpMessage: true,
        })
      );
      router.push("/scores");
    }

    return () => {
      //This would run at every 1s interval
      clearInterval(timer);
    };
  }, [delay]);

  // Increase the number & index onClick of Next button
  const increase = () => {
    setNumber(number + 1);
    setNumbering(numbering + 1);
    setCurrent(0);

    //compare the correct answer and the new option array we just created and see if the correct answer exists init then assign it to getAns if we find the word that exists
    const getAns = newQuestArray.find(
      (element) => element === quizData[number].correctAnswer
    );
    // If getAns == Whatever You chose, run the dispatch and increase the score + 1
    if (getAns == chosenOption) {
      dispatch(
        scoreAnswer({
          score: score.score + 1,
        })
      );
    }
  };

  // Only for the Finish Quiz Button
  const finish = async () => {
    try {
      const getAns = newQuestArray.find(
        (element) => element === quizData[number].correctAnswer
      );
      if (getAns == chosenOption) {
        dispatch(
          scoreAnswer({
            score: score.score + 1,
          }),
          loginUser({
            score: score.score + 1,
            time: delay,
          }),
          timeUp({
            timeUpMessage: false,
          })
        );
      }

      await setDoc(doc(db, "users", user.id), {
        ...user, // Spread operator to keep other properties of the user object unchanged.
        score: score.score + 1,
        time: 180 - delay,
      });

      console.log(user, "user");

      router.push("/scores");
    } catch (error) {
      console.log(error);
    }
  };

  const decrease = () => {
    // if(quizData[number])
    setNumber(number - 1);
    setNumbering(numbering - 1);
    setCurrent(0);
  };

  // console.log(quizData[0], "number");
  // console.log(theme.theme, "theme");

  return (
    <div id={theme.theme} className={styles.container}>
      <div className={styles.profile}>
        <h1 className={theme.theme == "dark" ? styles.darkTimer : styles.timer}>
          {delay == 10 ? "⏳" : ""} {`${minutes} : ${seconds}`}
        </h1>
        <div className={styles.mainProfile}>
          <div
            style={{
              backgroundImage: `url(${user.profilePics})`,
            }}
            className={styles.profilePic}
          ></div>
          <h2
            className={
              theme.theme == "dark" ? styles.questDark : styles.question
            }
          >
            {" "}
            {user.name}{" "}
          </h2>
        </div>
      </div>

      <div className={styles.main}>
        <h2
          className={theme.theme == "dark" ? styles.questDark : styles.question}
        >
          {numbering}. {questions[number].question}{" "}
        </h2>
        <div className={styles.list}>
          <ul className={styles.list1}>
            <div className={styles.flex}>
              <h3
                className={
                  theme.theme == "dark" ? styles.questDark : styles.question
                }
              >
                A.{" "}
              </h3>
              <button
                className={
                  theme.theme == "dark" ? styles.darken : styles.lighten
                }
                id={
                  current === 1 && theme.theme == "dark"
                    ? styles.persistColor
                    : ""
                }
                onClick={() => {
                  setChosenOption(newQuestArray[0]);
                  setCurrent(1);
                }}
              >
                <li>{newQuestArray[0]} </li>
              </button>
            </div>

            <div
              // data-aos="flip-left"
              // data-aos-duration="2000"
              className={styles.flex}
            >
              <h3
                className={
                  theme.theme == "dark" ? styles.questDark : styles.question
                }
              >
                B.{" "}
              </h3>
              <button
                id={
                  current === 2 && theme.theme == "dark"
                    ? styles.persistColor
                    : ""
                }
                onClick={() => {
                  setChosenOption(newQuestArray[1]);
                  setCurrent(2);
                }}
              >
                {" "}
                <li> {newQuestArray[1]} </li>
              </button>
            </div>
          </ul>

          <ul className={styles.list2}>
            <div className={styles.flexOption}>
              <h3
                className={
                  theme.theme == "dark" ? styles.questDark : styles.question
                }
              >
                C.{" "}
              </h3>
              <button
                id={
                  current === 3 && theme.theme == "dark"
                    ? styles.persistColor
                    : ""
                }
                onClick={() => {
                  setChosenOption(newQuestArray[2]);
                  setCurrent(3);
                }}
              >
                <li>{newQuestArray[2]}</li>
              </button>
            </div>
            <div
              // data-aos="flip-left"
              // data-aos-duration="2500"
              className={styles.flexOption}
            >
              <h3
                className={
                  theme.theme == "dark" ? styles.questDark : styles.question
                }
              >
                D.{" "}
              </h3>
              <button
                id={
                  current === 4 && theme.theme == "dark"
                    ? styles.persistColor
                    : ""
                }
                onClick={() => {
                  setChosenOption(newQuestArray[3]);
                  setCurrent(4);
                }}
              >
                <li>{newQuestArray[3]} </li>
              </button>
            </div>
          </ul>
        </div>
        <div className={styles.btnStyle}>
          <button
            // data-aos="fade-down"
            // data-aos-duration="2000"
            onClick={decrease}
            className={styles.prev}
            disabled={number == 0 ? true : false}
          >
            Previous{" "}
          </button>
          {numbering == quizData.length ? (
            <button className={styles.next} onClick={finish}>
              {" "}
              Finish Quiz{" "}
            </button>
          ) : (
            <button
              onClick={increase}
              // data-aos="fade-down"
              // data-aos-duration="2500"
              className={styles.next}
            >
              Next{" "}
            </button>
          )}
          {showAnswer ? (
            <button
              onClick={() => setShowAnswer(false)}
              className={styles.next}
            >
              Hide Answer{" "}
            </button>
          ) : (
            <button
              // data-aos="fade-down"
              // data-aos-duration="3000"
              onClick={() => setShowAnswer(true)}
              className={styles.next}
            >
              Show Answer{" "}
            </button>
          )}
        </div>
        <p> {showAnswer ? quizData[number].correctAnswer : ""}</p>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const data = await axios.get("https://the-trivia-api.com/api/questions");

  // const data = req;
  const initialData = data.data;
  return {
    props: {
      questions: initialData,
    },
  };
};
