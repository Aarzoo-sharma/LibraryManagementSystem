import { useContext, useEffect } from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Context from "../utils/context/context";

export default function PopUp() {
  const { message, setMessage } = useContext(Context);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setMessage("");
    }, 7000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);
  const closePopUp = () => {
    setMessage("");
  };
  return (
    <div className="z-50 fixed flex justify-center bottom-20 left-0 w-full">
      <Alert
        onClose={closePopUp}
        severity={message.type}
        className="min-w-[40%] mx-4"
      >
        <AlertTitle className="capitalize">{message.type}</AlertTitle>
        {message.message}
      </Alert>
    </div>
  );
}
