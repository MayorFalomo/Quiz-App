import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/Questions.module.css";
import { AppContext } from "../../helpers/helpers";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginUser } from "../GlobalRedux/features/userSlice";
import { scoreAnswer } from "../GlobalRedux/features/scoreSlice";
import { db } from "../../components/Firebase-config";
import {
  getFirestore,
  collection,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";

export default function quiz({ questions }) {
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

  // const { score, setScore } = useContext(AppContext);

  const router = useRouter();

  // console.log(quizData, "questions");
  // console.log(quizData, "quizData");

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    if (localStorage) {
      const getEmailFromStorage = localStorage.getItem("email");
      if (!getEmailFromStorage) {
        router.push("/login");
      }
    }
  }, []);

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

  useEffect(() => {
    const oldArray = [
      ...quizData[number].incorrectAnswers,
      quizData[number].correctAnswer,
    ];

    const newArray = oldArray.sort(() => (Math.random() > 0.5 ? 1 : -1));
    // console.log(newArray, "new array");
    setNewQuestArray(newArray);
  }, [quizData[number]]);

  // console.log(newQuestArray, "new quest array");

  // Increase the number & index onClick of Next button
  const increase = () => {
    setNumber(number + 1);
    setNumbering(numbering + 1);
    setCurrent(0);

    // checking if correct Answer is in the array then assigning it to getAns
    const getAns = newQuestArray.find(
      (element) => element === quizData[number].correctAnswer
    );
    // If getAns == Whatever You chose, increase the score
    if (getAns == chosenOption) {
      dispatch(
        scoreAnswer({
          score: score.score + 1,
        })
      );
      // setScore(score + 1);
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
          })
        );
        //Updates the score in the users object
      }
      // console.log(score.score, "score.score");
      // console.log(score.score + 1, "score + 1");
      // console.log(user.score, "user score ");
      // ...
      await setDoc(doc(db, "users", user.id), {
        ...user, // Spread operator to keep other properties of the user object unchanged.
        score: score.score + 1,
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
  console.log(user, "user");

  return (
    <div id={theme.theme} className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.mainProfile}>
          <div
            style={{
              backgroundImage: `url(${user.profilePics})`,
            }}
            className={styles.profilePic}
          ></div>
          <h2> {user.name} </h2>
        </div>
      </div>

      <div className={styles.main}>
        <h2 className={styles.question}>
          {numbering}. {questions[number].question}{" "}
        </h2>
        <div className={styles.list}>
          <ul className={styles.list1}>
            <div className={styles.flex}>
              <h3>A. </h3>
              <button
                id={current === 1 ? styles.stay : ""}
                onClick={() => {
                  setChosenOption(newQuestArray[0]);
                  setCurrent(1);
                }}
              >
                <li>{newQuestArray[0]} </li>
              </button>
            </div>
            <div className={styles.flex}>
              <h2>C. </h2>
              <button
                id={current === 3 ? styles.stay : ""}
                onClick={() => {
                  setChosenOption(newQuestArray[2]);
                  setCurrent(3);
                }}
              >
                <li>{newQuestArray[2]}</li>
              </button>
            </div>
          </ul>

          <ul className={styles.list2}>
            <div
              // data-aos="flip-left"
              // data-aos-duration="2000"
              className={styles.flexOption}
            >
              <h3>B. </h3>
              <button
                id={current === 2 ? styles.stay : ""}
                onClick={() => {
                  setChosenOption(newQuestArray[1]);
                  setCurrent(2);
                }}
              >
                {" "}
                <li> {newQuestArray[1]} </li>
              </button>
            </div>
            <div
              // data-aos="flip-left"
              // data-aos-duration="2500"
              className={styles.flexOption}
            >
              <h2>D. </h2>
              <button
                id={current === 4 ? styles.stay : ""}
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
