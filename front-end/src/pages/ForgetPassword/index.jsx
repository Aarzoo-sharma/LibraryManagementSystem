import { useFormik } from "formik";
import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Context from "../../utils/context/context";
import SubmitButton from "../../components/SubmitButton";
import { forgetSchema } from "../../schema";
import { forgetPasswordApi } from "../../api/loginApi";

function ForgetPassword() {
  const context = useContext(Context);
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: { email: "" },
    validationSchema: forgetSchema,
    onSubmit: async (values, { resetForm }) => {
      context.setLoader(true);
      const result = await forgetPasswordApi(values);
      if (result.type == "success") {
        resetForm();
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });
  return (
    <div className="flex flex-row-reverse min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-10 w-auto" src={logo} alt="Your Company" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset your Password
            </h2>
          </div>

          <div className="mt-3">
            <div>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="flex justify-between items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                    <span className="text-red-600 font-medium text-sm">
                      {touched.email && errors.email}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm leading-6">
                    <Link
                      to={"/"}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Login Page
                    </Link>
                  </div>
                </div>

                <SubmitButton
                  disabled={errors.email || !values.email}
                  label={"Send Mail"}
                  handleSubmit={handleSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 sm:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        />
      </div>
    </div>
  );
}

export default ForgetPassword;
