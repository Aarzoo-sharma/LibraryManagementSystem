import React, { useContext, useEffect, useRef, useState } from "react";

import { useFormik } from "formik";
import Select from "react-select";
import axios from "axios";
import { issueBook } from "../../api/booksApi";
import Context from "../../utils/context/context";
import Input from "../../components/input";
import SubmitButton from "../../components/SubmitButton";

function IssueBook() {
  const context = useContext(Context);
  const [stats, setStats] = useState({ user: [], books: [] });
  useEffect(() => {
    context.setLoader(true);
    axios({
      method: "get",
      url: "http://localhost:3000/admin/book/issueBook",
      withCredentials: true,
    }).then((result) => {
      result.status == 200
        ? setStats(result.data)
        : context.message(result.data);
      context.setLoader(false);
    });
  }, [context.message]);

  const initialValues = {
    dateOfIssue: new Date().toISOString().slice(0, 10),
    accession_no: "",
    userId: "",
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      context.setLoader(true);
      const result = await issueBook(values);
      if (result.type == "success") {
        resetForm({ ...initialValues });
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });

  return (
    <div className="m-1 md:m-3">
      <form className="px-1" id="form" onSubmit={handleSubmit}>
        <div className="border-2 py-3 mb-4 rounded-xl  bg-white">
          <h2 className="text-base py-1 font-semibold leading-7 px-5 border-b text-gray-900">
            Issue Book :-
          </h2>
          <div className="px-5 py-2">
            <div className=" border-gray-900/10 sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="accession_no"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Accession no
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0 flex gap-1">
                  {/* <Select
                    id="accession_no"
                    closeMenuOnSelect={true}
                    placeholder="Select Accession no"
                    name="accession_no"
                    isDisabled={!stats.books}
                    className="w-full md:w-1/2"
                    onChange={(e) => {
                      handleChange({
                        target: { name: "accession_no", value: e.value },
                      });
                    }}
                    options={
                      stats.books &&
                      stats.books.map((element) => {
                        return {
                          value: element.bookId,
                          label:
                            element.bookId + " - " + element.title.slice(0, 16),
                        };
                      })
                    }
                  /> */}
                  <select
                    name="accession_no"
                    id="accession_no"
                    value={values.accession_no}
                    onChange={handleChange}
                    className="w-full md:w-1/2 capitalize h-10 rounded-md px-2 border-gray-500/40 border"
                  >
                    <option value="">Select Accession no</option>
                    {stats.books.map((element) => (
                      <option value={element.bookId}>
                        {element.bookId + " - " + element.title.slice(0, 16)}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.accession_no && errors.accession_no}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="uniqueId"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Unique User Id:-
                </label>
                <div className="sm:col-span-2 sm:mt-0 sm:items-center">
                  {/* <Select
                    closeMenuOnSelect={true}
                    placeholder="User Id"
                    isSearchable={true}
                    name="uniqueId"
                    isDisabled={!stats.user}
                    className="w-full md:w-1/2"
                    onChange={(e) => {
                      handleChange({
                        target: { name: "userId", value: e.value },
                      });
                    }}
                    options={
                      stats.user &&
                      stats.user.map((element) => {
                        return {
                          value: element.userId,
                          label: element.uniqueUserId,
                        };
                      })
                    }
                  /> */}
                  <select
                    name="userId"
                    id="uniqueId"
                    value={values.userId}
                    onChange={handleChange}
                    className="w-full md:w-1/2 capitalize h-10 rounded-md px-2 border-gray-500/40 border"
                  >
                    <option disabled selected value="">
                      User Id
                    </option>
                    {stats.user.map((element) => (
                      <option value={element.userId}>
                        {element.uniqueUserId}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.uniqueId && errors.uniqueId}
                  </span>
                </div>
              </div>

              <Input
                id="dateOfIssue"
                name="dateOfIssue"
                label={"Date Of Issue"}
                type="date"
                value={values.dateOfIssue}
                max={new Date().toISOString().slice(0, 10)}
                onChange={handleChange}
                onBlur={handleBlur}
                touched={touched.dateOfIssue}
                errors={errors.dateOfIssue}
              />
            </div>
          </div>
        </div>

        <SubmitButton handleSubmit={handleSubmit} />
      </form>
    </div>
  );
}

export default IssueBook;
