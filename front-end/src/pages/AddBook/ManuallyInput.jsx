import { useFormik } from "formik";
import React, { useContext } from "react";
import { addBookManually } from "../../api/booksApi";
import { addBookSchema } from "../../schema";
import Context from "../../utils/context/context";
import PopUp from "../../components/popUp";

function ManuallyInput() {
  const context = useContext(Context);
  const initialValues = {
    accession_no: "",
    author: "",
    title: "",
    place_publisher: "",
    edition: "",
    year: 0,
    pages: "",
    source: "",
    billNo: "",
    billDate: new Date(),
    cost: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: addBookSchema,
    onSubmit: async (value, { resetForm }) => {
      context.setLoader(true);
      const result = await addBookManually(value);
      if (result.type == "success") {
        resetForm({ ...initialValues });
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });

  let year = [1975];
  while (year[year.length - 1] < new Date().getFullYear()) {
    year.push(year[year.length - 1] + 1);
  }

  return (
    <div className="flex-1">
      <form className="md:px-1" onSubmit={handleSubmit}>
        <div className="border-2 py-3 mb-4 rounded-xl  bg-white">
          <h2 className="text-base py-1 font-semibold leading-7 px-5 border-b text-gray-900">
            Add Book Detail :-
          </h2>
          <div className="px-5 py-2">
            <div className=" border-gray-900/10 sm:pb-0">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="accession_no"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Accession No
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-end flex-col gap-1">
                  <input
                    type="number"
                    name="accession_no"
                    id="accession_no"
                    value={values.accession_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Accession No"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.accession_no && errors.accession_no}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="author"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Author
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0 flex items-end flex-col gap-1">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    value={values.author}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Author Name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.author && errors.author}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Title
                </label>
                <div className="sm:col-span-2 sm:mt-0 flex items-end flex-col">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Book Title"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.title && errors.title}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="place_publisher"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Place & Publishers
                </label>
                <div className="sm:col-span-2 sm:mt-0 flex items-end flex-col">
                  <input
                    type="text"
                    name="place_publisher"
                    id="place_publisher"
                    value={values.place_publisher}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Place & Publisher"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.place_publisher && errors.place_publisher}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="edition"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Edition
                </label>
                <div className="sm:col-span-2 sm:mt-0 flex items-end flex-col">
                  <input
                    type="text"
                    name="edition"
                    id="edition"
                    value={values.edition}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Edition"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.edition && errors.edition}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Year
                </label>
                <div className="sm:col-span-2 sm:mt-0 flex items-center gap-2">
                  <select
                    id="year"
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    defaultValue={0}
                    className="block max-sm:w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled value={0}>
                      Select Year
                    </option>

                    {year.map((element) => (
                      <option value={element} key={element}>
                        {element}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.year && errors.year}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="pages"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Pages
                </label>
                <div className="sm:col-span-2 sm:mt-0 flex items-end flex-col">
                  <input
                    type="number"
                    name="pages"
                    id="pages"
                    value={values.pages}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="1-999"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.pages && errors.pages}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="source"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Source
                </label>
                <div className="sm:col-span-2 sm:mt-0 flex items-end flex-col">
                  <input
                    type="text"
                    name="source"
                    id="source"
                    value={values.source}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Source"
                    className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.source && errors.source}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="billNo"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Bill No & date
                </label>
                <div className="mt-2 sm:col-span-2 sm:mt-0 flex gap-1 items-center">
                  <input
                    type="number"
                    name="billNo"
                    id="billNo"
                    value={values.billNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xxxx"
                    className="block w-1/2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <input
                    type="date"
                    name="billDate"
                    id="billDate"
                    value={values.billDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="xxxx"
                    className="block w-1/2 rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />

                  <span className="text-red-500 text-sm font-semibold">
                    {(touched.billDate || touched.billNo) &&
                      (errors.billDate || errors.billNo)}
                  </span>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
                <label
                  htmlFor="cost"
                  className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
                >
                  Cost
                </label>
                <div className="sm:col-span-2 sm:mt-0 flex items-end flex-col">
                  <input
                    type="number"
                    name="cost"
                    id="cost"
                    value={values.cost}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Rs. xxx"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                  />
                  <span className="text-red-500 text-sm font-semibold">
                    {touched.cost && errors.cost}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex my-2 items-center justify-end gap-x-3">
          {/* <button
              type="submit"
              className="text-sm font-semibold border py-2 px-3 rounded-md leading-6 text-gray-900 bg-white hover:bg-white/60"
            >
              Cancel
            </button> */}
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

export default ManuallyInput;
