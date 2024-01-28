import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Questions.module.css";
// import { AppContext } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginUser } from "../../components/GlobalRedux/features/userSlice";
import { scoreAnswer } from "../../components/GlobalRedux/features/scoreSlice";
import { db } from "../../Firebase-config";
import { setDoc, doc, runTransaction } from "firebase/firestore";
import { timeUp } from "../../components/GlobalRedux/features/timeUpSlice";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Questions from "../../components/Questions";

export default function quiz({ questions, delayResend = "120" }) {
  const [number, setNumber] = useState(0);
  const [quizData, setQuizData] = useState(questions);
  const [newQuestArray, setNewQuestArray] = useState([]);
  const [numbering, setNumbering] = useState(1);
  const [chosenOption, setChosenOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state) => state.currentUser.value);
  const theme = useSelector((state) => state.currentTheme.value);
  const score = useSelector((state) => state.score.value);

  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);

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

  useEffect(() => {
    dispatch(
      loginUser({
        id: localStorage.getItem("id"),
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        profilePic: localStorage.getItem("photoUrl"),
        score: 0,
        time: 0,
      })
    );
  }, []);

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

  useEffect(() => {
    const oldArray = [
      ...quizData[number].incorrectAnswers,
      quizData[number].correctAnswer,
    ];

    //Then this Function gets the above array and shuffles the options in the array so the options are arranged randomly then assigns that array to the newQuest State then the dependency array runs only when the quizData[number] changes so the options are then shuffled again and so on
    const newArray = oldArray.sort(() => (Math.random() > 0.5 ? 1 : -1));
    setNewQuestArray(newArray);
  }, [quizData[number]]);

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
        //Using transactions in firebase i can run get, update etc. operations in a single call, first i initialize a run transaction method in firebase
        await runTransaction(db, async (transaction) => {
          const userDocRef = doc(db, "users", user.id); //This part searches for the user in the fireStore
          const userDoc = await transaction.get(userDocRef); //If it's found get the userDocRef and assign it to userDoc which would now contain the user data like name, score, time etc then i run the check to see if the userDocRef score is > than the current score amd if it is update it.
          const newScore = score.score + 1;
          console.log(score.score, "score.score");
          console.log(newScore, "newScore");
          if (newScore > userDoc.data().score) {
            transaction.update(userDocRef, {
              score: newScore,
              time: 120 - delay,
            });
          }
        });
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

      //*Basic function to update a document in firebase
      // await setDoc(doc(db, "users", user.id), {
      //   ...user, // Spread operator to keep other properties of the user object unchanged.
      //   score: score.score + 1,
      //   time: 120 - delay,
      // });
      dispatch(
        timeUp({
          timeUpMessage: false,
        })
      );
      router.push("/scores");
    } catch (error) {
      console.log(error);
    }
  };

  const decrease = () => {
    setNumber(number - 1);
    setNumbering(numbering - 1);
    setCurrent(0);
  };

  return (
    <div id={theme.theme} className={styles.container}>
      <div className={styles.profile}>
        <h1 className={theme.theme == "dark" ? styles.darkTimer : styles.timer}>
          {delay <= 10 ? <span className={styles.hourglass}> ⏳</span> : ""}{" "}
          {`${minutes} : ${seconds}`}
        </h1>
        <div className={styles.mainProfile}>
          <div
            style={{
              backgroundImage: `url(${user.profilePic})`,
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
          {" "}
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
                    : current === 1 && theme.theme == "light"
                    ? styles.persistLightColor
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

            <div className={styles.flex}>
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
                    : current === 2 && theme.theme == "light"
                    ? styles.persistLightColor
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
                    : current === 3 && theme.theme == "light"
                    ? styles.persistLightColor
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
            <div className={styles.flexOption}>
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
                    : current === 4 && theme.theme == "light"
                    ? styles.persistLightColor
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
            <button onClick={increase} className={styles.next}>
              Next{" "}
            </button>
          )}
          {/* {showAnswer ? (
            <button
              onClick={() => setShowAnswer(false)}
              className={styles.next}
            >
              Hide Answer{" "}
            </button>
          ) : (
            <button onClick={() => setShowAnswer(true)} className={styles.next}>
              Show Answer{" "}
            </button>
          )}
          {
            <p> {showAnswer ? quizData[number].correctAnswer : ""}</p>
          } */}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(
    "https://the-trivia-api.com/api/questions?limit=10"
  );
  const data = res.data;
  console.log(res.data);
  return {
    props: {
      questions: data,
    },
  };
};
