import React, { useContext } from "react";
import Context from "../utils/context/context";
import LoginPage from "../pages/Login";

function RouteCheck({ component }) {
  const context = useContext(Context);
  
  return context.loggedIn ? component : <LoginPage />;
}

export default RouteCheck;
