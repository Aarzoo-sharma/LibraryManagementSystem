import { useFormik } from "formik";
import React, { useContext } from "react";
import { deleteUser } from "../../api/managePeople";
import Context from "../../utils/context/context";
import Input from "../../components/input";

function RemovePeople() {
  const context = useContext(Context);
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: { deleteType: "singlePerson" },
    onSubmit: async (values, { resetForm }) => {
      context.setLoader(true);
      const result = await deleteUser(values);
      if (result.type == "success") {
        resetForm();
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });
  return (
    <form className="px-1" onSubmit={handleSubmit}>
      <div className=" border-gray-900/10 sm:pb-0">
        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
          <label
            htmlFor="singlePerson"
            className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
          >
            Want to Delete a
          </label>
          <div className="mt-2 sm:col-span-1 sm:mt-0 flex items-center gap-3">
            <input
              id="singlePerson"
              name="deleteType"
              type="radio"
              value={"singlePerson"}
              checked={values.deleteType == "singlePerson"}
              onChange={(e) => {
                values.department = "";
                values.batchNo = "";
                handleChange(e);
              }}
              defaultChecked={true}
              onBlur={handleBlur}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="singlePerson">Single Entity</label>
            <input
              id="batch"
              name="deleteType"
              type="radio"
              value={"batch"}
              checked={values.deleteType == "batch"}
              onChange={(e) => {
                values.rollNo = "";
                handleChange(e);
              }}
              onBlur={handleBlur}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="batch">Batch</label>

            <span className="text-red-500 text-sm font-semibold">
              {touched.deleteType && errors.deleteType}
            </span>
          </div>
        </div>

        {values.deleteType == "singlePerson" ? (
          <Input
            type="text"
            name="uniqueUserId"
            label={"Unique User Id"}
            id="uniqueUserId"
            value={values.uniqueUserId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="User Id"
            touched={touched.uniqueUserId}
            errors={errors.uniqueUserId}
          />
        ) : (
          <>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
              <label
                htmlFor="batchNo"
                className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
              >
                Batch No
              </label>
              <div className="mt-2 sm:col-span-1 sm:mt-0 flex items-end flex-col gap-1">
                <input
                  type="text"
                  name="batchNo"
                  id="batchNo"
                  value={values.batchNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="20 / 21 / 23 ..."
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-md sm:text-sm sm:leading-6"
                />
                <span className="text-red-500 text-sm font-semibold">
                  {touched.batchNo && errors.batchNo}
                </span>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
              <label
                htmlFor="department"
                className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
              >
                Department
              </label>
              <div className="mt-2 sm:col-span-1 sm:mt-0 flex items-center gap-3">
                <input
                  id="MCA"
                  name="department"
                  type="radio"
                  value={"MCA"}
                  checked={values.department == "MCA"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="MCA">MCA</label>
                <input
                  id="MBA"
                  name="department"
                  type="radio"
                  value={"MBA"}
                  checked={values.department == "MBA"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="MBA">MBA</label>
                <input
                  id="English"
                  name="department"
                  type="radio"
                  value={"ENG"}
                  checked={values.department == "ENG"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="English">English</label>
                <span className="text-red-500 text-sm font-semibold">
                  {touched.department && errors.department}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex my-2 items-center justify-end gap-x-3">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default RemovePeople;
