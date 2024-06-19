import React, { useContext } from "react";
import Context from "../../utils/context/context";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import { useFormik } from "formik";
import { createStudent } from "../../schema";
import { updateUser } from "../../api/managePeople";

function UserEdit({ data, setOpen }) {
  const context = useContext(Context);
  const initialValues = { ...data };
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      context.setLoader(true);
      const result = await updateUser(values);
      if (result.type == "success") {
        setOpen(result.data);
      } else {
        setOpen(data);
      }
      context.setMessage(result);
      context.setLoader(false);
    },
    validationSchema: createStudent,
  });
  return (
    <div className="p-4">
      <Input
        id={"uniqueUserId"}
        name={"uniqueUserId"}
        type={"text"}
        onChange={handleChange}
        onBlur={handleBlur}
        label={"Unique User Id"}
        value={values.uniqueUserId}
        placeholder={"Unique User Id"}
        autoComplete={"uniqueUserId"}
        errors={errors.uniqueUserId}
        touched={touched.uniqueUserId}
      />
      <Input
        id={"name"}
        name={"name"}
        type={"text"}
        onChange={handleChange}
        onBlur={handleBlur}
        label={"Name"}
        value={values.name}
        placeholder={"Name"}
        autoComplete={"name"}
        errors={errors.name}
        touched={touched.name}
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
            checked={values.designation == "student"}
            value={"student"}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="student">Student</label>
          <input
            id="faculity"
            name="designation"
            type="radio"
            checked={values.designation == "faculity"}
            value={"faculity"}
            onChange={handleChange}
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
        id={"email"}
        name={"email"}
        type={"email"}
        onChange={handleChange}
        onBlur={handleBlur}
        label={"Email"}
        value={values.email}
        placeholder={"xyz@gmail.com"}
        autoComplete={"email"}
        errors={errors.email}
        touched={touched.email}
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
            checked={values.department == "MBA"}
            value={"MBA"}
            onChange={handleChange}
            onBlur={handleBlur}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="MBA">MBA</label>
          <input
            id="English"
            name="department"
            type="radio"
            value={"ENGLISH"}
            checked={values.department == "ENGLISH"}
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
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
}

export default UserEdit;
