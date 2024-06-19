import { useFormik } from "formik";
import React, { useContext } from "react";
import { loginSchema } from "../../schema";
import logo from "../../assets/logo.png";
import { loginApi } from "../../api/loginApi";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../utils/context/context";

function LoginPage() {
  const navigate = useNavigate("");
  const context = useContext(Context);
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      context.setLoader(true);
      const result = await loginApi(values);
      if (result.loggedIn) {
        context.setLoggedIn(true);
        context.setUser(result.username);
        navigate("/");
      } else {
        context.setMessage(result);
      }
      context.setLoader(false);
    },
  });
  return (
    <div className="flex flex-row-reverse min-h-screen flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-10 w-auto" src={logo} alt="Your Company" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="flex justify-between items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                    <span className="text-red-600 font-medium text-sm">
                      {touched.username && errors.username}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="flex justify-between items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                    <span className="text-red-600 font-medium text-sm">
                      {touched.password && errors.password}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm leading-6">
                    <Link
                      to={"/forgetPassword"}
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
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

export default LoginPage;
