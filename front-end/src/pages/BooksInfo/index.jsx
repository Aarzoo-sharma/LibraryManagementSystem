import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { backend } from "../../api/variables";
import TableInfo from "../../components/Table";
import { sendOverDueBookMail } from "../../api/mail";
import Context from "../../utils/context/context";
import AllBooksDetail from "./allBooksDetail";

const buttons = [
  { name: "All Book Detail", url: "/admin/book/getAllBookDetail" },
  { name: "All Issued Book Detail", url: "/admin/book/getAllIssuedBookDetail" },
  { name: "Issued Books", url: "/admin/book/getIssuedBooks" },
  { name: "Books OverDue", url: "/admin/book/getBooksOverDue" },
];

function BooksInfo() {
  const context = useContext(Context);
  const [url, setUrl] = useState(buttons[0]);
  const [data, setData] = useState([]);
  useEffect(() => {
    context.setLoader(true);
    axios({
      url: backend + url.url,
      method: "get",
      withCredentials: true,
    })
      .then((response) => {
        if (response.status == 200) setData(response.data);
        context.setLoader(false);
      })
      .catch((error) => {
        context.setLoader(false);
        console.error(error);
      });
  }, [url]);

  const sendMail = async (values, { resetForm }) => {
    context.setLoader(true);
    const result = await sendOverDueBookMail(values);
    if (result.type == "success") {
      resetForm();
    }
    document.getElementsByName("issuedBookId").forEach((element) => {
      if (element.checked) element.checked = false;
    });
    context.setLoader(false);
    context.setMessage(result);
  };

  const handleData = (value) => {
    setData(() =>
      data.map((element) => (element.bookId == value.bookId ? value : element))
    );
  };

  const handleDeleteData = (value) => {
    setData(() => data.filter((element) => element.bookId != value.bookId));
  };
  return (
    <main>
      <div className="relative isolate overflow-hidden">
        {/* Secondary navigation */}
        <header className="pb-4 pt-6 sm:pb-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              Kathua Campus
            </h1>
            <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:leading-7">
              {buttons.map((item) => (
                <button
                  key={item.name}
                  className={
                    url.name == item.name ? "text-indigo-600" : "text-gray-700"
                  }
                  disabled={url.name == item.name}
                  onClick={() => {
                    setUrl(item);
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </header>
      </div>

      <div className="space-y-16 xl:space-y-20 border-y border-y-gray-900/10 lg:border-y lg:border-y-gray-900/5">
        {/* Recent activity table */}
        <div className="py-4">
          <div className="overflow-hidden border- border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                {url.name != "All Book Detail" ? (
                  <TableInfo data={data} type={url.name} onSubmit={sendMail} />
                ) : (
                  <AllBooksDetail
                    data={data}
                    handleData={handleData}
                    handleDeleteData={handleDeleteData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BooksInfo;
