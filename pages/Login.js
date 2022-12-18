import { signInWithPopup } from "firebase/auth";
import { useContext } from "react";
import { auth, provider } from "../components/Firebase-config";
import { AppContext } from "../helpers/helpers";
import { useRouter } from "next/router";

const Login = () => {
  const { isAuth, setIsAuth } = useContext(AppContext);
    const router = useRouter();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem(isAuth, true);
        setIsAuth(true);
        if (isAuth == true) {
        router.push("/");
        }
        const profilePic = res.user.photoURL;
        const name = res.user.displayName;
        const email = res.user.email;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("photoUrl", profilePic);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="logins">
      <div>
        <h2> Welcome to Quiz App </h2>
        <button onClick={signInWithGoogle}>Continue with Google </button>
        <p>
          This is a one-time password-less login so you don't need a password.{" "}
        </p>
      </div>
    </div>
  );
};

export default Login;
