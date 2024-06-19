import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import SubmitButton from "../../components/SubmitButton";
import { useFormik } from "formik";
import Context from "../../utils/context/context";
import { resetPasswordWithTokenApi } from "../../api/loginApi";

function ResetPassword() {
  const { token } = useParams();
  const context = useContext(Context);
  const navigate = useNavigate();
  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useFormik({
    initialValues: { password: "", confPassword: "" },
    onSubmit: async (values) => {
      context.setLoader(true);
      const result = await resetPasswordWithTokenApi(values, token);
      if (result.type == "success") {
        navigate("/");
      }
      context.setMessage(result);
      context.setLoader(false);
    },
  });
  return (
    <div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 ">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img className="h-10 w-auto" src={logo} alt="Your Company" />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset Your Password
            </h2>
          </div>

          <div className="mt-10">
            <div>
              <form method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="flex justify-between items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                    <span className="text-red-600 font-medium text-sm">
                      {/* {touched.password && errors.password} */}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ConfPassword"
                    className="flex justify-between items-center text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                    <span className="text-red-600 font-medium text-sm">
                      {touched.confPassword && errors.confPassword}
                    </span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="confPassword"
                      name="confPassword"
                      type="password"
                      value={values.confPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="block w-full rounded-md border-0 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <SubmitButton handleSubmit={handleSubmit} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
