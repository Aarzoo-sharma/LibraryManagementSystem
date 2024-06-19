import React from "react";

function SubmitButton({ handleSubmit, label, disabled }) {
  return (
    <div className="flex my-2 items-center justify-end gap-x-3">
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={disabled}
        className="mr-2 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
      >
        {label || "Submit"}
      </button>
    </div>
  );
}

export default SubmitButton;
