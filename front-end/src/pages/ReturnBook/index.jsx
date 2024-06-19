import React, { useContext, useEffect, useState } from "react";

import { useFormik } from "formik";
import Select from "react-select";
import axios from "axios";
import { returnBook } from "../../api/booksApi";
import Context from "../../utils/context/context";
import { returnSchema } from "../../schema";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import OuterFrame from "../../components/OuterFrame";

function ReturnBook() {
  const [stats, setStats] = useState([]);
  const context = useContext(Context);
  const [user, setUser] = useState({
    uniqueUserId: "",
    name: "",
    fine: 0,
    dateOfIssue: "",
  });

  const initialValues = {
    issuedBookId: "",
    libraryPenalty: "",
    dateOfReturn: "",
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
    enableReinitialize: true,
    validationSchema: returnSchema,
    onSubmit: async (values, { resetForm }) => {
      context.setLoader(true);
      const result = await returnBook(values);
      if (result.type == "success") {
        setStats(() =>
          stats.filter((element) => element.issuedBookId != values.issuedBookId)
        );
        setUser({
          uniqueUserId: "",
          name: "",
          fine: 0,
          dateOfIssue: "",
        });
        resetForm({ ...initialValues });
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });

  useEffect(() => {
    context.setLoader(true);
    if (values.issuedBookId) {
      axios({
        method: "post",
        url: "http://localhost:3000/admin/book/validateReturnBook",
        data: { ...values },
        withCredentials: true,
      }).then((response) => {
        setUser(response.data);
      });
    } else if (!(values.dateOfReturn || values.issuedBookId))
      axios({
        method: "get",
        url: "http://localhost:3000/admin/book/returnBook",
        withCredentials: true,
      }).then((result) => {
        setStats(result.data);
      });
    context.setLoader(false);
  }, [values.dateOfReturn, values.issuedBookId]);
  return (
    <>
      <OuterFrame heading={"Return Book"}>
        <form>
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
            <label
              htmlFor="issuedBookId"
              className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
            >
              Accession no
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0 flex gap-1">
              {/* <Select
                id="issuedBookId"
                closeMenuOnSelect={true}
                placeholder="Select Accession no"
                isSearchable={true}
                name="issuedBookId"
                className="w-full md:w-1/2"
                onChange={(e) => {
                  setData("dcds");
                  handleChange({
                    target: {
                      name: "issuedBookId",
                      value: e.value,
                    },
                  });
                }}
                options={stats.map((element) => {
                  return {
                    value: element.issuedBookId,
                    label:
                      element.books.bookId +
                      " - " +
                      element.books.title.slice(0, 16),
                  };
                })}
              /> */}
              <select
                name="issuedBookId"
                id="issuedBookId"
                value={values.issuedBookId}
                onChange={handleChange}
                className="w-full md:w-1/2 capitalize h-10 rounded-md px-2 border-gray-500/40 border"
              >
                <option value="" selected disabled>
                  Select Accession no
                </option>
                {stats.map((element) => (
                  <option value={element.issuedBookId}>
                    {element.books.bookId +
                      " - " +
                      element.books.title.slice(0, 16)}
                  </option>
                ))}
              </select>
              <span className="text-red-500 text-sm font-semibold">
                {touched.issuedBookId && errors.issuedBookId}
              </span>
            </div>
          </div>

          <Input
            type="number"
            name="libraryPenalty"
            id="libraryPenalty"
            label={"Library Penalty"}
            min={0}
            disabled={!values.issuedBookId}
            placeholder="Rs xxx"
            onBlur={handleBlur}
            onChange={handleChange}
            onWheel={(e) => {
              e.target.blur();
              e.stopPropagation();
            }}
            value={values.libraryPenalty}
            touched={touched.libraryPenalty}
            errors={errors.libraryPenalty}
          />

          <Input
            type="date"
            name="dateOfReturn"
            label={"Date Of Return"}
            id="dateOfReturn"
            disabled={!values.issuedBookId}
            min={user.dateOfIssue.slice(0, 10)}
            max={new Date().toISOString().slice(0, 10)}
            value={values.dateOfReturn}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.dateOfReturn}
            errors={errors.dateOfReturn}
          />

          <Input
            type="text"
            disabled={true}
            name="name"
            id="name"
            value={user.name}
            label="Name"
          />

          <Input
            type="text"
            label={"Unique User Id"}
            disabled={true}
            name="uniqueUserId"
            id="uniqueUserId"
            value={user.uniqueUserId}
          />

          <Input
            type="Date"
            label="Date Of Issue"
            disabled={true}
            name="dateOfIssue"
            id="dateOfIssue"
            value={user.dateOfIssue.slice(0, 10)}
          />

          <Input
            type="number"
            label={"Late Fee"}
            disabled={true}
            name="fine"
            id="fine"
            value={user.fine}
          />

          <Input
            type="number"
            label={"Total Fine"}
            disabled={true}
            name="totalFine"
            id="totalFine"
            value={
              parseFloat(user.fine) + (parseFloat(values.libraryPenalty) || 0)
            }
          />
        </form>
      </OuterFrame>
      <SubmitButton handleSubmit={handleSubmit} />
    </>
  );
}

export default ReturnBook;
