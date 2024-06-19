import axios from "axios";
import { backend } from "./variables";
const createAdminApi = async (values) => {
  try {
    const result = await axios.post(
      backend + "/admin/createAdmin",
      { ...values },
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {}
};

const deleteAdminApi = async (values) => {
  try {
    const result = await axios.delete(backend + "/admin/deleteAdmin", {
      withCredentials: true,
      data: { ...values },
    });
    return result.data;
  } catch (error) {}
};
export { createAdminApi, deleteAdminApi };
