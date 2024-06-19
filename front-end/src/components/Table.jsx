import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useFormik } from "formik";

function TableInfo({ data, type, onSubmit }) {
  const { values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      issuedBookId: [],
    },
    onSubmit,
  });
  if (type != "Books OverDue") {
    values.issuedBookId = [];
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className=" max-h-[30rem] overflow-auto ">
        <Table hoverable={true} className=" border-2">
          <TableHead>
            <TableHeadCell className="flex gap-1 p-4">
              {type == "Books OverDue" && (
                <Checkbox
                  onChange={(e) => {
                    document
                      .getElementsByName("issuedBookId")
                      .forEach((element) => {
                        element.checked = e.currentTarget.checked;
                        e.currentTarget.checked
                          ? (values.issuedBookId = [
                              ...values.issuedBookId,
                              element.value,
                            ])
                          : (values.issuedBookId = []);
                      });
                  }}
                />
              )}
              Accession no
            </TableHeadCell>
            <TableHeadCell className="p-4">Title And Author</TableHeadCell>
            <TableHeadCell className="p-4">Issued to</TableHeadCell>
            <TableHeadCell className="p-4">Designation & Department</TableHeadCell>
            <TableHeadCell className="p-4">Status</TableHeadCell>
            <TableHeadCell className="p-4">Date Of Issue</TableHeadCell>
            <TableHeadCell className="p-4">Date Of Return</TableHeadCell>
            <TableHeadCell className="p-4">
              {type == "Books OverDue" ? "Phone no" : "Fine"}
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data.map((element, index) => {
              element.dateOfIssue = element.dateOfIssue?.slice(0, 10);
              element.dateOfReturn = element.dateOfReturn?.slice(0, 10);
              const date1 = new Date(element.dateOfReturn);
              const date2 = new Date();
              if (date1 < date2 && element.status == "issued") {
                element = {
                  ...element,
                  dateOfReturn:
                    Math.floor(
                      Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)
                    ) + " days",
                  status: "Date Overdue",
                  fine: type == "Books OverDue" ? element.user.phone_no : "--",
                };
              } else if (element.status == "issued") {
                element = {
                  ...element,
                  dateOfReturn: "xxxx-xx-xx",
                  fine: "nill",
                };
              }
              return (
                <TableRow key={index} className="bg-white text-center border">
                  <TableCell className="flex justify-center items-end gap-2 p-4">
                    {type == "Books OverDue" && (
                      <>
                        <Checkbox
                          name="issuedBookId"
                          value={element.issuedBookId}
                          onChange={handleChange}
                        />
                      </>
                    )}
                    <span className="text-gray-600 font-bold">
                      {element.books?.bookId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-gray-600 font-bold">
                      {element.books?.title}
                    </span>
                    <br />
                    <span className="capitalize">{element.books?.author}</span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-gray-600 font-bold">
                      {element.user?.name}
                    </span>
                    <br />
                    <span className="capitalize">
                      {element.user?.uniqueUserId}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-gray-600 font-bold">
                      {element.user?.designation}
                    </span>
                    <br />
                    <span className="capitalize">
                      {element.user?.department}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-gray-600 font-bold">
                      {element.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="capitalize text-gray-600 font-bold">
                      {element.dateOfIssue}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 font-bold">
                      {element.dateOfReturn}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600 font-bold">
                      {element.fine}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
            {data.length == 0 && (
              <TableRow>
                <TableCell
                  className="text-center capitalize font-bold"
                  colSpan={8}
                >
                  no record
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {type == "Books OverDue" && (
        <div className="flex my-2 items-center justify-between gap-x-3">
          <span>Select users to send mail</span>
          <button
            type="submit"
            disabled={!values.issuedBookId.length}
            className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
          >
            Send Mail
          </button>
        </div>
      )}
    </form>
  );
}
export default TableInfo;
