import React, { useEffect, useState } from "react";
import styles from "../styles/Questions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginUser } from "./GlobalRedux/features/userSlice";
import { scoreAnswer } from "./GlobalRedux/features/scoreSlice";
import { db } from "../Firebase-config";
import { setDoc, doc, runTransaction } from "firebase/firestore";
import { timeUp } from "./GlobalRedux/features/timeUpSlice";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// import Questions from "../../components/Questions";

const Questions = ({ questions, delay, quizData, numbering, number }) => {
  // const [number, setNumber] = useState(0);
  // const [quizData, setQuizData] = useState(questions);

  // const [newQuestArray, setNewQuestArray] = useState([]);
  // const [numbering, setNumbering] = useState(1);
  // const [chosenOption, setChosenOption] = useState("");
  // const [showAnswer, setShowAnswer] = useState(false);
  // const [current, setCurrent] = useState(0);
  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.currentUser.value);
  const theme = useSelector((state) => state.currentTheme.value);
  const score = useSelector((state) => state.score.value);

  const dispatch = useDispatch();

  const router = useRouter();

  //UseEffect to run the loginUser Object and assign them value
  // useEffect(() => {
  //   dispatch(
  //     loginUser({
  //       id: localStorage.getItem("id"),
  //       name: localStorage.getItem("name"),
  //       email: localStorage.getItem("email"),
  //       profilePics: localStorage.getItem("photoUrl"),
  //       score: 0,
  //       time: 0,
  //     })
  //   );
  // }, []);

  // console.log(questions, "question 0");

  //useEffect to add the correct answer into the spread array of incorrect answers to form a new array of four options

  //   console.log(quest, "Now this is it");
  // console.log(quest[1], "Now ");

  //   const oldArray = [
  //     ...quizData[number].incorrectAnswers,
  //     quizData[number].correctAnswer,
  //   ];

  //   //Function to toggle displaying and hiding the answer
  //   const showAns = (e) => {
  //     e.preventDefault();
  //     setShowAnswer(!showAnswer);
  //   };
  //   // Pushing the correct answer into the incorrect answer array and forming a new array
  //   oldArray.push(quizData[number].correctAnswer);
  //   const newArray = [...new Set(oldArray)];

  //   // Increase the number & index onClick of Next button
  //   const increase = (e) => {
  //     e.preventDefault();
  //     setNumber(number + 1);
  //     setNumbering(numbering + 1);
  //     setCurrent(0);

  //     // checking if correct Answer is in the array then assigning it to getAns
  //     const getAns = newArray.find(
  //       (element) => element === quizData[number].correctAnswer
  //     );
  //     // If getAns == Whatever You chose, increase the score
  //     if (getAns == chosenOption) {
  //       setScore(score + 1);
  //     }
  //   };

  //   // Only for the Finish Quiz Button
  //   const finish = () => {
  //     const getAns = newArray.find(
  //       (element) => element === quizData[number].correctAnswer
  //     );
  //     if (getAns == chosenOption) {
  //       setScore(score + 1);
  //     }
  //   };
  //   const decrease = () => {
  //     setNumber(number - 1);
  //     setNumbering(numbering - 1);
  //     setCurrent(0);
  //   };
  //   // UseEffect to check against Hydration - Important!
  //   useEffect(() => {
  //     setInitialRenderComplete(true);
  //   }, []);
  //   const arrayZero = (e) => {
  //     e.preventDefault();
  //     setChosenOption(newArray[0]);
  //     setCurrent(1);
  //   };
  //   const arrayOne = (e) => {
  //     e.preventDefault();
  //     setChosenOption(newArray[1]);
  //     setCurrent(2);
  //   };
  //   const arrayTwo = (e) => {
  //     e.preventDefault();
  //     setChosenOption(newArray[2]);
  //     setCurrent(3);
  //   };
  //   const arrayThree = (e) => {
  //     e.preventDefault();
  //     setChosenOption(newArray[3]);
  //     setCurrent(4);
  //   };

  //   // console.log(
  //   //   typeof window !== "undefined" ? localStorage.getItem("photoUrl") : ""
  //   // );
  //   // console.log(score);

  //   useEffect(() => {}, []);
  //   if (!initialRenderComplete) {
  //     return null;
  //   } else {
  //     newArray.sort(() => (Math.random() > 0.5 ? 1 : -1)); // Shuffling the New array we pushed the
  //   }
  return (
    <div id={theme.theme} className={styles.container}>
      <div>
        <div className={styles.main}>
          <div className={styles.main}>
            <h2
              className={
                theme.theme == "dark" ? styles.questDark : styles.question
              }
            >
              {" "}
              {numbering}. {questions[number].question}{" "}
            </h2>
            <div className={styles.list}>
              {/* <ul className={styles.list1}>
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
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
