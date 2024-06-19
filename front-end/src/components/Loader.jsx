import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Context from "../utils/context/context";

export default function Loader() {
  const context = React.useContext(Context);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={context.loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
