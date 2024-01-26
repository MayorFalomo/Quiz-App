import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import { auth, db, provider } from "../components/Firebase-config";
// import { AppContext } from "../helpers/helpers";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../components/GlobalRedux/features/userSlice";
import { doc, setDoc } from "firebase/firestore";

const login = () => {
  const icon = <FcGoogle size={30} />;

  const router = useRouter();
  const theme = useSelector((state) => state.currentTheme.value);

  const dispatch = useDispatch();

  //*If you want sign up/login to go properly make sure you use a tryCatch
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider)
        .then(async (res) => {
          dispatch(
            loginUser({
              id: res.user.uid,
              name: res.user.displayName,
              emails: res.user.email,
              profilePics: res.user.photoURL,
              score: 0,
              time: 0,
            })
          );
          localStorage.setItem("id", res.user.uid);
          localStorage.setItem("email", res.user.email);
          localStorage.setItem("name", res.user.displayName);
          localStorage.setItem("photoUrl", res.user.photoURL);
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            username: res.user.displayName,
            email: res.user.email,
            profilePic: res.user.photoURL
              ? res.user.photoURL
              : "https://i.pinimg.com/564x/33/f4/d8/33f4d8c6de4d69b21652512cbc30bb05.jpg",
            score: 0,
            time: 0,
          });
          router.push("/");
        })

        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage) {
      localStorage.setItem("theme", theme.theme);
    } else {
      console.log("errr");
    }
  }, [theme.theme]);

  const user = useSelector((state) => state.currentUser.value);

  // console.log(user, "I Am User");

  return (
    <div id={theme.theme} className={styles.container}>
      <div className={styles.main}>
        <h2>Welcome to Quiz App </h2>
        <button onClick={signInWithGoogle}>{icon} Sign In with Google </button>
        <p>
          This is a one-time password-less login so you don't need a password.{" "}
        </p>
      </div>
    </div>
  );
};

export default login;
