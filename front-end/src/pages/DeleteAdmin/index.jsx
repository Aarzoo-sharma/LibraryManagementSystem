import React, { useContext, useState } from "react";
import OuterFrame from "../../components/OuterFrame";
import { useFormik } from "formik";
import Input from "../../components/input";
import Context from "../../utils/context/context";
import SubmitButton from "../../components/SubmitButton";
import { useEffect } from "react";
import axios from "axios";
import { backend } from "../../api/variables";
import Select from "react-select";
import { deleteAdminApi } from "../../api/createAdminApi";

function DeleteAdmin() {
  const context = useContext(Context);
  const [data, setData] = useState(false);
  const [userSelected, setUserSelected] = useState({
    username: "",
    email: "",
    createdByEmp: "",
    activeStatus: "",
  });
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { id: "" },
    onSubmit: async (values, { resetForm }) => {
      context.setLoader(true);
      const result = await deleteAdminApi(values);
      if (result.type == "success") {
        setUserSelected({
          username: "",
          email: "",
          createdByEmp: "",
          activeStatus: "",
        });
        resetForm();
      }
      context.setMessage(result);
      context.setLoader(false);
    },
  });

  useEffect(() => {
    context.setLoader(true);
    axios
      .get(backend + "/admin/allAdminDetails", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) setData(response.data);
      })
      .catch((error) => {
        context.setMessage(error.response.data);
        console.log(error);
      });
    context.setLoader(false);
  }, []);
  return (
    <div>
      <OuterFrame
        heading={"Delete Admin"}
        subHeading={"Only Super Admin can delete other admins "}
      >
        {data ? (
          <form>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
              <label
                htmlFor="id"
                className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
              >
                Employee Name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0 flex gap-1">
                <select
                  name="id"
                  onChange={(e) => {
                    handleChange(e);
                    setUserSelected(() =>
                      data.find((element) => element.id == e.target.value)
                    );
                  }}
                  value={values.id}
                  className="w-full md:w-1/2 capitalize h-10 rounded-md px-2 border-gray-500/40 border"
                >
                  <option disabled value={""} className="h-10">
                    User
                  </option>
                  {data &&
                    data.map((element, index) => (
                      <option key={index} value={element.id}>
                        {element.empName}
                      </option>
                    ))}
                </select>
                <span className="text-red-500 text-sm font-semibold">
                  {/* {touched.id && errors.id} */}
                </span>
              </div>
            </div>

            <Input
              type="text"
              disabled={true}
              name="username"
              id="name"
              value={userSelected.username}
              label="Username"
            />

            <Input
              type="email"
              disabled={true}
              name="email"
              id="email"
              value={userSelected.email}
              label="Email"
            />

            <Input
              type="text"
              disabled={true}
              name="createdByEmp"
              id="createdByEmp"
              value={userSelected.createdByEmp}
              label="Registered by"
            />

            <Input
              type="text"
              disabled={true}
              name="activeStatus"
              id="activeStatus"
              value={userSelected.activeStatus?.toUpperCase()}
              label="Active Status"
            />

            {userSelected && (
              <SubmitButton
                label={"Block user"}
                disabled={!(userSelected.activeStatus === "active")}
                handleSubmit={handleSubmit}
              />
            )}
          </form>
        ) : (
          <div className="capitalize text-center font-bold">
            your are not allowed to perfrom any action here.
          </div>
        )}
      </OuterFrame>
    </div>
  );
}

export default DeleteAdmin;
