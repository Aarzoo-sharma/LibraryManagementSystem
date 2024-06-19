import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { useContext, useState } from "react";
import Context from "../../utils/context/context";
import { deleteBook } from "../../api/booksApi";
import Modal from "../../components/modal";

function AllBooksDetail({ data, handleData, handleDeleteData }) {
  const context = useContext(Context);
  const [editData, setEditData] = useState(false);

  const handleDelete = async (values) => {
    context.setLoader(true);
    const result = await deleteBook(values);
    if (result.type == "success") {
      handleDeleteData(result.data);
    }
    context.setMessage(result);
    context.setLoader(false);
  };

  const handleClick = (element) => {
    setEditData({
      type: "book",
      ...element,
    });
  };

  const handleSetOpen = (value) => {
    setEditData(false);
    handleData(value);
  };
  return (
    <>
      <Modal open={editData} setOpen={handleSetOpen} />
      <div className=" max-h-[30rem] overflow-auto ">
        <h2 className="font-bold my-2 px-4">Total Books:- {data.length}</h2>
        <Table hoverable={true} className="border-2">
          <TableHead className="text-center">
            <TableHeadCell className="px-4 flex justify-center gap-1 md:px-0">
              {/* <Checkbox
                onChange={(e) => {
                  document.getElementsByName("").forEach((element) => {
                    element.checked = e.currentTarget.checked;
                    e.currentTarget.checked
                      ? (values.issuedBookId = [
                          ...values.issuedBookId,
                          element.value,
                        ])
                      : (values.issuedBookId = []);
                  });
                }}
              /> */}
              Accession no
            </TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">
              Title And Author
            </TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">
              Place and Publisher
            </TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">
              Edition and Year
            </TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">Pages</TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">Source</TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">
              Bill no & Bill Date
            </TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">Cost</TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">Status</TableHeadCell>
            <TableHeadCell className="px-4 md:px-0">
              Edit / Delete
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {data &&
              data.map((element, index) => {
                element.billDate = element.BillDate?.slice(0, 10);

                return (
                  <TableRow key={index} className="bg-white text-center border">
                    <TableCell className="flex justify-center items-end gap-2 p-4">
                      <>
                        {/* <Checkbox
                          name="accession_no"
                          value={"accession_no"}
                          onChange={}
                        /> */}
                      </>

                      <span className="text-gray-600 font-bold">
                        {element.bookId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-gray-600 font-bold">
                        {element.title}
                      </span>
                      <br />
                      <span className="capitalize">{element.author}</span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-gray-600 font-bold">
                        {element.place_publisher}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-gray-600 font-bold">
                        {element.edition} edition
                      </span>
                      <br />
                      <span className="capitalize">{element.year}</span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-gray-600 font-bold">
                        {element.pages}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-gray-600 font-bold">
                        {element.source}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold">
                        {element.billNo}
                      </span>
                      <br />
                      <span className="capitalize">{element.billDate}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold">
                        {element.cost}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-600 font-bold">
                        {element.issuedTo == "" ? "Not Issued" : "Issued"}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <button
                        className="bg-blue-500 p-2 px-4 rounded-lg text-white hover:bg-blue-400"
                        onClick={() => {
                          handleClick(element);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-gray-900 p-2 px-4 rounded-lg text-white hover:bg-gray-400"
                        onClick={() => {
                          handleDelete({ bookId: element.bookId });
                        }}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            {!data && (
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
    </>
  );
}

export default AllBooksDetail;
