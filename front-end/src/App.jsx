import "./index.css";
import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/navbar";
import AddBook from "./pages/AddBook";
import RouteCheck from "./components/routeCheck";
import Context from "./utils/context/context";
import IssueBook from "./pages/IssueBook";
import ManagePeople from "./pages/ManagePeople";
import ReturnBook from "./pages/ReturnBook";
import CreateAdmin from "./pages/CreateAdmin";
import BooksInfo from "./pages/BooksInfo";
import DeleteAdmin from "./pages/DeleteADmin";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/resetPassword";
import UserDetail from "./pages/Users";
import { backend } from "./api/variables";

function App() {
  const context = useContext(Context);
  useEffect(() => {
    try {
      axios({
        method: "get",
        url: backend+"/checkAuth",
        withCredentials: true,
      }).then((result) => {
        context.setUser(result.data.username);
        context.setLoggedIn(result.data.loggedIn);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/" element={<RouteCheck component={<Home />} />} />
            <Route
              path="/admin/addBook"
              element={<RouteCheck component={<AddBook />} />}
            />
            <Route
              path="/admin/issueBook"
              element={<RouteCheck component={<IssueBook />} />}
            />
            <Route
              path="/admin/returnBook"
              element={<RouteCheck component={<ReturnBook />} />}
            />
            <Route
              path="/admin/managePeople"
              element={<RouteCheck component={<ManagePeople />} />}
            />
            <Route
              path="/admin/createAdmin"
              element={<RouteCheck component={<CreateAdmin />} />}
            />
            <Route
              path="/admin/deleteAdmin"
              element={<RouteCheck component={<DeleteAdmin />} />}
            />
            <Route
              path="/admin/booksInfo"
              element={<RouteCheck component={<BooksInfo />} />}
            />
            <Route
              path="/admin/profile"
              element={<RouteCheck component={<Profile />} />}
            />
            <Route
              path="/admin/usersDetail"
              element={<RouteCheck component={<UserDetail />} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
