import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import "../styles/globals.css";
import Layout from "../components/Layout";
import { AppContext } from "../helpers/helpers";

function MyApp({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);
  const [menu, setMenu] = useState(false);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState();
  const [names, setNames] = useState("")

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    if (localStorage) {
      localStorage.getItem("theme");
    } else {
      console.log("errr");
    }
  }, []);


  const [changed, setChanged] = useState(false);

  const handleChange = () => {
    setChanged(!changed);
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    console.log(theme);
  };

  return (
    <ThemeProvider>
      <AppContext.Provider
        value={{
          isAuth,
          setIsAuth,
          menu,
          setMenu,
          theme,
          setTheme,
          changed,
          setChanged,
          handleChange,
          score,
          setScore,
          names,
          setNames,
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>{" "}
    </ThemeProvider>
  );
}

export default MyApp;
