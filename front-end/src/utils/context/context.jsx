import { createContext, useState } from "react";

const Context = createContext({});

export const AppContext = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState();
  const [user, setUser] = useState("user");
  const [loader, setLoader] = useState(false);
  const context = {
    loggedIn,
    setLoggedIn,
    message,
    setMessage,
    user,
    setUser,
    loader,
    setLoader,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
export default Context;
