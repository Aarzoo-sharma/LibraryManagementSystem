import React, { useContext, useEffect, useState } from "react";
import Context from "../../utils/context/context";
import axios from "axios";
import { backend } from "../../api/variables";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import Modal from "../../components/modal";

function UserDetail() {
  const context = useContext(Context);
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(false);
  useEffect(() => {
    context.setLoader(true);
    axios
      .get(backend + "/admin/manageUser/usersDetail", { withCredentials: true })
      .then((response) => {
        setData(response.data);
        context.setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        context.setLoader(false);
      });
  }, []);
  const handleClick = (element) => {
    setEditData({
      type: "user",
      ...element,
    });
  };
  const handleSetOpen = (value) => {
    setEditData(false);
    setData(() =>
      data.map((element) => (element.userId == value.userId ? value : element))
    );
  };
  return (
    <div className="relative isolate overflow-hidden">
      <header className="pb-4 pt-6 sm:pb-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
          <h1 className="text-base font-semibold leading-7 text-gray-900">
            All Users Detail
          </h1>
        </div>
      </header>
      <Modal open={editData} setOpen={handleSetOpen} />
      <div className="space-y-16 xl:space-y-20 border-y border-y-gray-900/10 lg:border-y lg:border-y-gray-900/5">
        {/* Recent activity table */}
        <div className="py-4">
          <div className="overflow-hidden border- border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                <div className="max-h-[30rem] overflow-auto ">
                  <Table hoverable={true} className="border-2 text-center">
                    <TableHead>
                      <TableHeadCell>Unique User Id</TableHeadCell>
                      <TableHeadCell>Name</TableHeadCell>
                      <TableHeadCell>Designation</TableHeadCell>
                      <TableHeadCell>Department</TableHeadCell>
                      <TableHeadCell>Email</TableHeadCell>
                      <TableHeadCell>Phone no</TableHeadCell>
                      <TableHeadCell>Registered by</TableHeadCell>
                      <TableHeadCell>Edit</TableHeadCell>
                    </TableHead>
                    <TableBody className="divide-y">
                      {data &&
                        data.map((element, index) => (
                          <TableRow
                            key={index}
                            className="text-gray-600 text-center font-bold bg-white border hover:bg-gray-500/10"
                          >
                            <TableCell>{element.uniqueUserId}</TableCell>
                            <TableCell>{element.name}</TableCell>
                            <TableCell>{element.designation}</TableCell>
                            <TableCell>{element.department}</TableCell>
                            <TableCell>{element.email}</TableCell>
                            <TableCell>{element.phone_no}</TableCell>
                            <TableCell>{element.createdByEmp}</TableCell>
                            <TableCell>
                              <button
                                className="bg-blue-500 p-2 px-4 rounded-lg text-white hover:bg-blue-400"
                                onClick={() => {
                                  handleClick(element);
                                }}
                              >
                                Edit
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
