import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Questions.module.css";
import Login from "../Login";
import arrayShuffle from "array-shuffle";
import { AppContext } from "../../helpers/helpers";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function quiz({ questions }) {
  const [number, setNumber] = useState(0);
  const [quizData, setQuizData] = useState(questions);
  const [state, setState] = useState();
  const [image, setImage] = useState();
  const [numbering, setNumbering] = useState(1);
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const [chosenOption, setChosenOption] = useState();
  const [showAnswer, setShowAnswer] = useState(false);
  const { score, setScore } = useContext(AppContext);

  const { theme } = useContext(AppContext);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (localStorage) {
      const getNameState = localStorage.getItem("name");
      setState(getNameState);
    } else {
      console.log("errr");
    }
  }, []);

  useEffect(() => {
    if (localStorage) {
      const getPhotoState = localStorage.getItem("photoUrl");
      setImage(getPhotoState);
    } else {
      console.log("err");
    }
  }, []);

  // Assigning incorrect answer array to oldArray
  const oldArray = [
    ...quizData[number].incorrectAnswers,
    quizData[number].correctAnswer,
  ];

  const showAns = (e) => {
    e.preventDefault();
    setShowAnswer(!showAnswer);
  };
  // Pushing the correct answer into the incorrect answer array and forming a new array
  oldArray.push(quizData[number].correctAnswer);
  const newArray = [...new Set(oldArray)];

  // Increase the number & index onClick of Next button
  const increase = (e) => {
    e.preventDefault();
    setNumber(number + 1);
    setNumbering(numbering + 1);

    // checking if correct Answer is in the array then assigning it to getAns
    const getAns = newArray.find(
      (element) => element === quizData[number].correctAnswer
    );
    // If the getAns == Whatever You chose increase the score
    if (getAns == chosenOption) {
      setScore(score + 1);
    }
  };

  // Only for the Finish Quiz Button
  const finish = () => {
    const getAns = newArray.find(
      (element) => element === quizData[number].correctAnswer
    );
    if (getAns == chosenOption) {
      setScore(score + 1);
    }
  };
  const decrease = () => {
    setNumber(number - 1);
    setNumbering(numbering - 1);
  };
  // UseEffect to check against Hydration - Important!
  useEffect(() => {
    setInitialRenderComplete(true);
  }, []);
  const arrayZero = (e) => {
    e.preventDefault();
    setChosenOption(newArray[0]);
  };
  const arrayOne = (e) => {
    e.preventDefault();
    setChosenOption(newArray[1]);
  };
  const arrayTwo = (e) => {
    e.preventDefault();
    setChosenOption(newArray[2]);
  };
  const arrayThree = (e) => {
    e.preventDefault();
    setChosenOption(newArray[3]);
  };

  // console.log(chosenOption);

  useEffect(() => {});
  if (!initialRenderComplete) {
    return null;
  } else {
    newArray.sort(() => (Math.random() > 0.5 ? 1 : -1)); // Shuffling the New array we pushed the
    return (
      <div id={theme} className={styles.container}>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          className={styles.profile}
        >
          <div className={styles.mainProfile}>
            <div className={styles.profilePic}>
              <img src={image} alt="img" />
            </div>
            <h2>{state} </h2>
          </div>
        </div>
        <div className={styles.main}>
          <h2>
            {numbering}. {questions[number].question}{" "}
          </h2>
          <div className={styles.list}>
            <ul className={styles.list1}>
              <div
                data-aos="flip-left"
                data-aos-duration="1000"
                className={styles.flex}
              >
                <h3>A. </h3>
                <button onClick={arrayZero}>
                  <li>{newArray[0]} </li>
                </button>
              </div>
              <div
                data-aos="flip-left"
                data-aos-duration="2000"
                className={styles.flex}
              >
                <h3>C. </h3>
                <button onClick={arrayOne}>
                  {" "}
                  <li> {newArray[1]} </li>
                </button>
              </div>
            </ul>

            <ul className={styles.list2}>
              <div
                data-aos="flip-left"
                data-aos-duration="1500"
                className={styles.flexOption}
              >
                <h2>B. </h2>
                <button onClick={arrayTwo}>
                  <li>{newArray[2]}</li>
                </button>
              </div>
              <div
                data-aos="flip-left"
                data-aos-duration="2500"
                className={styles.flexOption}
              >
                <h2>D. </h2>
                <button onClick={arrayThree}>
                  <li>{newArray[3]} </li>
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
            >
              Previous{" "}
            </button>
            {numbering == quizData.length ? (
              <Link href="./scores">
                <button className={styles.next} onClick={finish}>
                  {" "}
                  Finish Quiz{" "}
                </button>
              </Link>
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
              <button onClick={showAns} className={styles.next}>
                Hide Answer{" "}
              </button>
            ) : (
              <button
                // data-aos="fade-down"
                // data-aos-duration="3000"
                onClick={showAns}
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
}

export const getStaticProps = async () => {
  const data = await Axios.get("https://the-trivia-api.com/api/questions");

  // const data = req;
  const initialData = data.data;
  // setTimeout(1000);
  // clearTimeout();
  return {
    props: {
      questions: initialData,
    },
  };
};
