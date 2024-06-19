import axios from "axios";
import { backend } from "./variables";

const loginApi = async (values) => {
  try {
    const result = await axios.post(
      backend + "/admin/login",
      { ...values },
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const logoutApi = async () => {
  try {
    const result = await axios.get(backend + "/admin/logout", {
      withCredentials: true,
    });
    if (result.data.loggedOut) return true;
    else return false;
  } catch (error) {
    console.log(error);
  }
};

const forgetPasswordApi = async (values) => {
  try {
    const result = await axios.post(
      backend + "/admin/forgetPassword",
      { ...values },
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const resetPasswordWithTokenApi = async (values, token) => {
  try {
    const result = await axios.post(
      backend + "/admin/resetPassword/" + token,
      { ...values },
      { withCredentials: true }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export { loginApi, logoutApi, forgetPasswordApi, resetPasswordWithTokenApi };
