import { Provider } from "react-redux";

import { store } from "./store";

//So her we're simply saying whatever is inside the provider should have the content of store
//It's this provider we then use to wrap our next app root
export function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
