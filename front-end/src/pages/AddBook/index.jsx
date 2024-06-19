import React from "react";
import CsvFileInput from "./CsvFileInput";
import ManuallyInput from "./ManuallyInput";

function AddBook() {
  return (
    <div className="flex flex-wrap justify-between m-2 rounded-md md:p-2 gap-3">
      <CsvFileInput />
      <ManuallyInput />
    </div>
  );
}

export default AddBook;
