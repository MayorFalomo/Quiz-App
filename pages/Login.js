import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { auth, provider } from "../components/Firebase-config";
import { AppContext } from "../helpers/helpers";
import { useRouter } from "next/router";
import styles from '../styles/Login.module.css'
import { FcGoogle } from "react-icons/fc";


const login = () => {
  const icon = <FcGoogle size={30} />;

  const { isAuth, setIsAuth } = useContext(AppContext);
  const router = useRouter();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      localStorage.setItem(isAuth, true);
      setIsAuth(true);
      if (isAuth == true) {
          router.push("/");
        }
        const profilePic = res.user.photoURL;
        const name = res.user.displayName;
      const email = res.user.email;
      if (typeof window !== 'undefined') {
        localStorage.setItem("name", name)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem("email", email)
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem("photoUrl", profilePic)
      }
      })
      .catch((err) => {
        console.log(err);
    })
  }
  return (
    <div className={styles.container} >
      <div className={styles.main} >
      <h2>Welcome to Quiz App </h2>
      <button onClick={signInWithGoogle} >{icon} Sign In with Google </button>
        <p>This is a one-time password-less login so you don't need a password. </p>
        </div>
    </div>
  )
}

export default login;