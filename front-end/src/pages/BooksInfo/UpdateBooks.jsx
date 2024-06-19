import React, { useContext } from "react";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { useFormik } from "formik";
import { addBookSchema } from "../../schema";
import Context from "../../utils/context/context";
import { updateBook } from "../../api/booksApi";

function UpdateBooks({ data, setOpen }) {
  const context = useContext(Context);
  const initialValues = { ...data };
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
    validationSchema: addBookSchema,
    onSubmit: async (values) => {
      context.setLoader(true);
      const result = await updateBook(values);
      if (result.type == "success") {
        setOpen(result.data);
      } else {
        setOpen(data);
      }
      context.setMessage(result);
      context.setLoader(false);
    },
  });

  let year = [1975];
  while (year[year.length - 1] < new Date().getFullYear()) {
    year.push(year[year.length - 1] + 1);
  }

  return (
    <div className="p-4 max-h-[50vh] md:max-h-fit overflow-auto sm:w-[50vw]">
      <Input
        type="text"
        name="title"
        label={"Title"}
        id="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Title"
        touched={touched.title}
        errors={errors.title}
      />
      <Input
        type="text"
        name="author"
        label={"Author"}
        id="author"
        value={values.author}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Author"
        touched={touched.author}
        errors={errors.author}
      />
      <Input
        type="text"
        name="place_publisher"
        label={"Place & Publisher"}
        id="place_publisher"
        value={values.place_publisher}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Place & Publisher"
        touched={touched.place_publisher}
        errors={errors.place_publisher}
      />

      <Input
        type="text"
        name="edition"
        label={"Edition"}
        id="edition"
        value={values.edition}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Edition"
        touched={touched.edition}
        errors={errors.edition}
      />

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

      <Input
        type="number"
        name="pages"
        label={"Pages"}
        id="pages"
        value={values.pages}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="1-999"
        min={1}
        touched={touched.pages}
        errors={errors.pages}
      />

      <Input
        type="text"
        name="source"
        label={"Source"}
        id="source"
        value={values.source}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Source"
        touched={touched.source}
        errors={errors.source}
      />

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

      <Input
        type="number"
        name="cost"
        label={"Cost"}
        id="cost"
        value={values.cost}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Rs. xxx"
        min={0}
        touched={touched.cost}
        errors={errors.cost}
      />
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
}

export default UpdateBooks;
