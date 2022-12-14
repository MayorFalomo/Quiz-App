import { createContext } from "react";

export const AppContext = createContext(null);

// import { createContext, useContext, useState } from "react";

// const AppContext = createContext({});

// export function AppWrapper({ children }) {
//   const [isAuth, setIsAuth] = useState(1);

//   return (
//     <AppContext.Provider value={{ isAuth, setIsAuth }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAppContext() {
//   return useContext(AppContext);
// }
