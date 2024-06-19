import axios from "axios";
import { backend } from "./variables";

const addBookManually = async (values) => {
  const response = await axios.post(
    backend + "/admin/book/createBook",
    {
      ...values,
    },
    { withCredentials: true }
  );
  return response.data;
};

const updateBook = async (values) => {
  const response = await axios.post(
    backend + "/admin/book/updateBook",
    {
      ...values,
    },
    { withCredentials: true }
  );
  return response.data;
};

const addCsvFile = async (values) => {
  const response = await axios.post(
    backend + "/admin/book/addCsvFile",
    {
      ...values,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(response);
  return response.data;
};

const issueBook = async (values) => {
  const response = await axios.post(
    backend + "/admin/book/issueBook",
    {
      ...values,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

const returnBook = async (values) => {
  const response = await axios.put(
    backend + "/admin/book/returnBook",
    {
      ...values,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
const deleteBook = async (values) => {
  const response = await axios.delete(backend + "/admin/book/updateBook", {
    data: { ...values },
    withCredentials: true,
  });
  return response.data;
};
export {
  addBookManually,
  updateBook,
  addCsvFile,
  issueBook,
  returnBook,
  deleteBook,
};
