import React, { useId, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Input = ({ placeholder, label, ref, type = "text", ...params }) => {
  const inputId = useId();
  const [isShow, setIsShow] = useState(false);

  const toggleShowHandler = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div className="relative border-b border-slate-400 flex justify-between items-center" tabIndex="-1">
      <input
        ref={ref}
        type={type === "password" ? (isShow ? "text" : "password") : type}
        id={inputId}
        placeholder={placeholder}
        {...params}
        className="w-full h-full font-vazir placeholder:font-vazir placeholder:text-sm text-lg px-2 py-4 placeholder:collapse focus:placeholder:visible peer outline-none border-none"
      />
      {type === "password" && (
        <button onClick={toggleShowHandler} className="text-2xl" tabIndex="-1">
          {isShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
        </button>
      )}
      <label
        className="transition-all absolute -translate-y-1/2 top-1/2 right-2 pointer-events-none peer-focus:top-0 not-peer-placeholder-shown:top-0 font-light"
        htmlFor={inputId}
        tabIndex="-1"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
