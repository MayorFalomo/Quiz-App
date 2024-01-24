import React, { useState } from "react";
import styles from "../styles/Questions.module.css";
import { useSelector } from "react-redux";

const Questions = ({ quest }) => {
  const theme = useSelector((state) => state.currentTheme.value);
  const [number, setNumber] = useState(0);

  const [numbering, setNumbering] = useState(1);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [chosenOption, setChosenOption] = useState();
  const [showAnswer, setShowAnswer] = useState(false);
  const [current, setCurrent] = useState(0);

  //   console.log(quest, "Now this is it");
  console.log(quest[1], "Now ");

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
          <h2 className={styles.question}>
            {numbering}. {quest.questions}{" "}
          </h2>

          {/* <p> {showAnswer ? quizData[number].correctAnswer : ""}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Questions;
