import React, { useContext, useEffect, useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import Context from "../../utils/context/context";
import Input from "../../components/input";
import { useFormik } from "formik";
import { backend } from "../../api/variables";
import axios from "axios";
import SubmitButton from "../../components/SubmitButton";
import { profileSchema } from "../../schema";

function Profile() {
  const context = useContext(Context);
  let [initialValues, setInitial] = useState({
    empName: "",
    email: "",
    username: "",
    currPassword: "",
    password: "",
    confPassword: "",
  });

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
    validationSchema: profileSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    context.setLoader(true);
    axios
      .get(backend + "/admin/adminProfile/adminDetail", {
        withCredentials: true,
      })
      .then((response) => {
        setInitial({ ...initialValues, ...response.data });
        context.setLoader(false);
      });
  }, []);

  const handleName = async () => {
    context.setLoader(true);
    axios
      .patch(
        backend + "/admin/adminProfile/changeEmpName",
        { empName: values.empName },
        { withCredentials: true }
      )
      .then((response) => {
        context.setLoader(false);
        if (response.data.type == "success") {
          setInitial({ ...initialValues, empName: values.empName });
        }
        context.setMessage(response.data);
      });
  };
  const handleEmail = async () => {
    context.setLoader(true);
    axios
      .patch(
        backend + "/admin/adminProfile/changeEmail",
        { email: values.email },
        { withCredentials: true }
      )
      .then((response) => {
        context.setLoader(false);
        if (response.data.type == "success") {
          setInitial({ ...initialValues, email: values.email });
        }
        context.setMessage(response.data);
      });
  };
  const handleUsername = async () => {
    context.setLoader(true);
    axios
      .patch(
        backend + "/admin/adminProfile/changeUsername",
        { username: values.username },
        { withCredentials: true }
      )
      .then((response) => {
        context.setLoader(false);
        if (response.data.type == "success") {
          setInitial({ ...initialValues, username: values.username });
        }
        context.setMessage(response.data);
      });
  };
  const handlePassword = async () => {
    context.setLoader(true);
    axios
      .post(
        backend + "/admin/adminProfile/changePassword",
        {
          password: values.password,
          confPassword: values.confPassword,
          currPassword: values.currPassword,
        },
        { withCredentials: true }
      )
      .then((response) => {
        context.setLoader(false);
        if (response.data.type == "success") {
          values.currPassword = "";
          values.password = "";
          values.confPassword = "";
        }
        context.setMessage(response.data);
      });
  };
  return (
    <div>
      <OuterFrame
        heading={"Hi " + initialValues.empName}
        subHeading={"Welcome to profile section"}
      >
        <Input
          id={"empName"}
          name={"empName"}
          label={"Employee Name"}
          type={"text"}
          value={values.empName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Name"}
          touched={touched.empName}
          errors={errors.empName}
        >
          <SubmitButton
            disabled={values.empName.trim() == initialValues.empName.trim()}
            label={"Change Name"}
            handleSubmit={handleName}
          />
        </Input>
        <Input
          id={"email"}
          name={"email"}
          label={"Email"}
          type={"email"}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"xyz@gmail.com"}
          touched={touched.email}
          errors={errors.email}
        >
          <SubmitButton
            disabled={values.email.trim() == initialValues.email.trim()}
            label={"Change Email"}
            handleSubmit={handleEmail}
          />
        </Input>

        <Input
          id={"username"}
          name={"username"}
          label={"Username"}
          type={"text"}
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"username"}
          touched={touched.username}
          errors={errors.username}
        >
          <SubmitButton
            disabled={values.username.trim() == initialValues.username.trim()}
            label={"Change Username"}
            handleSubmit={handleUsername}
          />
        </Input>
        <Input
          id={"currPassword"}
          name={"currPassword"}
          label={"Current Password"}
          type={"password"}
          value={values.currPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Current Password"}
          touched={touched.currPassword}
          errors={errors.currPassword}
        ></Input>
        <Input
          id={"password"}
          name={"password"}
          label={"New Password"}
          type={"password"}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"New Password"}
          touched={touched.password}
          errors={errors.password}
        ></Input>
        <Input
          id={"confPassword"}
          name={"confPassword"}
          label={"Confirm Password"}
          type={"password"}
          value={values.confPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"confirm Password"}
          touched={touched.confPassword}
          errors={errors.confPassword}
        >
          <SubmitButton
            disabled={errors.confPassword || !values.confPassword}
            label={"Change Password"}
            handleSubmit={handlePassword}
          />
        </Input>
      </OuterFrame>
    </div>
  );
}

export default Profile;
