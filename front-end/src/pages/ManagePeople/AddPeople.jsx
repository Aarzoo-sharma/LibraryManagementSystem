import { useFormik } from "formik";
import React, { useContext } from "react";
import { createStudent } from "../../schema";
import { createUser } from "../../api/managePeople";
import Context from "../../utils/context/context";
import PopUp from "../../components/popUp";
import Input from "../../components/input";
import SubmitButton from "../../components/SubmitButton";

function AddPeople() {
  const initialValues = {
    name: "",
    uniqueUserId: "",
    email: "",
    phone_no: "",
    designation: undefined,
    department: undefined,
  };
  const context = useContext(Context);
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema: createStudent,
    onSubmit: async (value, { resetForm }) => {
      context.setLoader(true);
      const result = await createUser(value);
      if (result.type == "success") {
        resetForm({ ...initialValues });
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });
  return (
    <form className="px-1">
      <div className=" border-gray-900/10 sm:pb-0">
        <Input
          type="text"
          name="name"
          label={"Name"}
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Name"
          touched={touched.name}
          errors={errors.name}
        />

        <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
          <label
            htmlFor="designation"
            className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
          >
            Designation
          </label>
          <div className="mt-2 sm:col-span-1 sm:mt-0 flex items-center gap-3">
            <input
              id="student"
              name="designation"
              type="radio"
              value={"student"}
              checked={values.designation == "student"}
              onChange={handleChange}
              onBlur={handleBlur}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="student">Student</label>
            <input
              id="faculity"
              name="designation"
              type="radio"
              value={"faculity"}
              checked={values.designation == "faculity"}
              onChange={(e) => {
                values.rollNo = "";
                handleChange(e);
              }}
              onBlur={handleBlur}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor="faculity">Faculity</label>

            <span className="text-red-500 text-sm font-semibold">
              {touched.designation && errors.designation}
            </span>
          </div>
        </div>

        <Input
          type="text"
          name="uniqueUserId"
          label={"Unique User Id"}
          id="uniqueUserId"
          value={values.uniqueUserId}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="user Id"
          touched={touched.uniqueUserId}
          errors={errors.uniqueUserId}
        />

        <Input
          type="email"
          name="email"
          label={"Email"}
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="xyz@gmail.com"
          touched={touched.email}
          errors={errors.email}
        />

        <Input
          type="text"
          name="phone_no"
          label={"Phone No"}
          id="phone_no"
          value={values.phone_no}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="xxx xxx xxxx"
          touched={touched.phone_no}
          errors={errors.phone_no}
        />

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
      </div>

      <SubmitButton handleSubmit={handleSubmit} />
    </form>
  );
}

export default AddPeople;
