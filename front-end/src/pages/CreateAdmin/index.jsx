import { useFormik } from "formik";
import React, { useContext } from "react";
import { createAdminSchema } from "../../schema";
import { createAdminApi } from "../../api/createAdminApi";
import Context from "../../utils/context/context";
import Input from "../../components/input";
import SubmitButton from "../../components/SubmitButton";
import OuterFrame from "../../components/OuterFrame";

function CreateAdmin() {
  const context = useContext(Context);
  const initialValues = {
    username: "",
    password: "",
    empName: "",
    email: "",
    confPassword: "",
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: createAdminSchema,
    onSubmit: async (values, { resetForm }) => {
      context.setLoader(true);
      const result = await createAdminApi(values);
      if (result.type == "success") {
        resetForm({ ...initialValues });
      }
      context.setLoader(false);
      context.setMessage(result);
    },
  });
  return (
    <div>
      <OuterFrame heading={"Create Admin"}>
        {true ? (
          <form>
            <Input
              id={"empName"}
              name={"empName"}
              label={"Employee Name"}
              type={"text"}
              autoComplete={"empName"}
              placeholder={"Name"}
              value={values.empName}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.empName}
              errors={errors.empName}
            />

            <Input
              id="username"
              name="username"
              label={"UserName"}
              type="text"
              autoComplete="username"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.username}
              errors={errors.username}
            />

            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="xyz@gmail.com"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.email}
              errors={errors.email}
            />

            <Input
              id="password"
              name="password"
              label={"Password"}
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.password}
              errors={errors.password}
            />

            <Input
              id="confPassword"
              name="confPassword"
              label={"Confirm Password"}
              type="password"
              value={values.confPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              onBlur={handleBlur}
              touched={touched.confPassword}
              errors={errors.confPassword}
            />
          </form>
        ) : (
          <div className="capitalize text-center font-bold">
            your are not allowed to perfrom any action here.
          </div>
        )}
      </OuterFrame>
      <SubmitButton handleSubmit={handleSubmit} />
    </div>
  );
}

export default CreateAdmin;
