import { useFormik } from "formik";
import React, { useContext, useRef } from "react";
import { addCsvFile } from "../../api/booksApi";
import Context from "../../utils/context/context";
import PopUp from "../../components/popUp";

function CsvFileInput() {
  const context = useContext(Context);
  const ref = useRef();
  const { handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      context.setLoader(true);
      const result = await addCsvFile(values);
      if (result.type == "success") {
        ref.current.value = null;
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });
  return (
    <div className="flex-1 p-2 md:p-6 border flex  flex-col justify-around">
      <h1 className="text-3xl md:text-5xl font-[gabriola] my-5 text-center">
        Welcome to Kathua Campus Online
        <br /> library Management.
      </h1>
      <h5 className="text-sm md:text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
        aspernatur ad illo a eligendi deserunt officiis maxime impedit, repellat
        enim ratione optio aut?
      </h5>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="md:p-6"
      >
        <fieldset className="border p-3">
          <legend className="px-1 text-base font-semibold leading-7">
            Excel file:
          </legend>
          <input
            id="file"
            ref={ref}
            name="csvFile"
            type="file"
            accept=".xls,.xlsx,.csv"
            className="block w-full md:text-lg text-gray-900 border border-gray-300 p-1 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            onChange={(e) => {
              if (e.currentTarget.files[0])
                setFieldValue("csvFile", e.currentTarget.files[0]);
            }}
            onBlur={handleBlur}
          />
        </fieldset>
        <div className="flex mt-2 pt-1 items-center justify-end gap-x-3">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CsvFileInput;
