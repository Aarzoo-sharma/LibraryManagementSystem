import axios from "axios";
import { backend } from "./variables";

const sendOverDueBookMail = async (values) => {
  try {
    const result = await axios.post(
      backend + "/admin/book/overDueMail",
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
export { sendOverDueBookMail };
