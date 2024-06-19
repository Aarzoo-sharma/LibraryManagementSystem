import React from "react";

function OuterFrame({ children, heading, subHeading }) {
  return (
    <div className="m-3">
      <div className="border-2 py-3 mb-4 rounded-xl  bg-white">
        <h2 className="text-base capitalize py-1 flex flex-col font-semibold leading-7 px-5 border-b text-gray-900">
          <span>{heading} :-</span>
          {subHeading && <span className="text-xs mx-2">{subHeading} :-</span>}
        </h2>
        <div className="px-5 py-2">
          <div className=" border-gray-900/10 sm:pb-0">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default OuterFrame;
