import React, { useContext, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Logo from "../assets/logo.png";
import { Dialog } from "@headlessui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutApi } from "../api/loginApi";
import Context from "../utils/context/context";
import PopUp from "./popUp";
import Setting from "./Setting";
import Loader from "./Loader";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Add Books", href: "/admin/addBook" },
  { name: "Books Info", href: "/admin/booksInfo" },
  { name: "Issue Book", href: "/admin/issueBook" },
  { name: "Return Book", href: "/admin/returnBook" },
];

function Navbar() {
  const context = useContext(Context);
  const navigator = useNavigate("");
  const logout = async () => {
    const result = await logoutApi();
    if (result) {
      context.setLoggedIn(false);
      context.setUser("user");
      navigator("/");
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      {/* adding popup message and loader component for all pages */}
      {context.message && <PopUp />}
      <Loader />
      <header className="sticky bg-white inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1 items-center gap-x-6">
            <button
              type="button"
              className="-m-3 p-3 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
            <img className="h-8 w-auto" src={Logo} alt="Your Company" />
          </div>
          <nav className="hidden md:flex md:gap-x-6 md:text-sm md:font-semibold md:leading-6 md:text-gray-700">
            {context.loggedIn &&
              navigation.map((item, itemIdx) => (
                <Link
                  key={itemIdx}
                  className="hover:bg-slate-100/80 px-1 hover:transition-[3s] hover:rounded-md"
                  to={item.href}
                >
                  {item.name}
                </Link>
              ))}
          </nav>
          {context.loggedIn&&<div className="flex flex-1 items-center justify-end gap-x-4">
            <Setting />

            <Link onClick={logout} className="-m-1.5 p-1.5" title="logout">
              <span className="sr-only">Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </Link>
          </div>}
        </div>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen&&context.loggedIn}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
            <div className="-ml-0.5 flex h-16 items-center gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="-ml-0.5">
                <a href="#" className="-m-1.5 block p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src={Logo} alt="" />
                </a>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
