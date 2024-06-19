import React from "react";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import UserEdit from "../pages/Users/UserEdit";
import UpdateBooks from "../pages/BooksInfo/UpdateBooks";

function Modal({ open, setOpen }) {
  return (
    <Transition.Root show={open ? true : false} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen">
          <div className="flex min-h-full justify-center p-2 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white  pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:py-2">
                <div className="border-b px-4">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-2 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={setOpen}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <h2 className="text-base capitalize font-semibold leading-7 text-gray-900">
                    {"Edit " + open.type + " Info"}
                  </h2>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="text-center sm:text-left">
                    {open.type == "user" ? (
                      <UserEdit setOpen={setOpen} data={open} />
                    ) : (
                      <UpdateBooks setOpen={setOpen} data={open} />
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
