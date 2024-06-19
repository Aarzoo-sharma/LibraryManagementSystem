import React from "react";

function Input({
  id,
  name,
  label,
  type,
  value,
  onChange,
  onBlur,
  touched,
  errors,
  autoComplete,
  placeholder,
  min,
  max,
  onWheel,
  disabled,
  className,
  children,
}) {
  return (
    <div>
      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:pt-3">
        <label
          htmlFor={id}
          className="block text-sm font-medium sm:pl-16 leading-6 text-gray-900 sm:pt-1.5"
        >
          {label}
        </label>
        <div className="mt-2 sm:col-span-2 sm:mt-0 flex flex-wrap items-center gap-1">
          <input
            id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onWheel={onWheel}
            min={min}
            max={max}
            disabled={disabled}
            className={
              className ||
              "block w-full md:w-1/2 rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            }
          />
          {children}
          <span className="text-red-500 text-sm font-semibold">
            {touched && errors}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Input;
