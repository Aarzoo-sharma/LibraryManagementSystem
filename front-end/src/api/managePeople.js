import axios from "axios";
import { backend } from "./variables";

const createUser = async (values) => {
  try {
    const result = await axios.post(
      backend + "/admin/manageUser/addUser",
      {
        ...values,
      },
      { withCredentials: true }
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (values) => {
  try {
    const result = await axios({
      url: backend + "/admin/manageUser/updateUser",
      data: { ...values },
      method: "post",
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (values) => {
  try {
    const result = await axios({
      url: backend + "/admin/manageUser/deleteUser",
      data: { ...values },
      method: "delete",
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
export { createUser, updateUser, deleteUser };
