import React from "react";

const Button = ({
  label,
  ref,
  onClick,
  wide = false,
  className = "",
  type = "fill",
  ...params
}) => {
  const clickHandler = (ev) => {
    if (typeof onClick !== "function") {
      throw new Error("Must provide a function for onClick");
    }

    onClick(ev);
  };

  const calcFill = (type) => {
    switch (type) {
      case "fill":
        return "bg-purple-800";
      case "outline":
        return "bg-transparent";
    }
  };

  const calcColor = (type) => {
    switch (type) {
      case "fill":
        return "text-slate-50";
      case "outline":
        return "text-purple-800";
    }
  };

  return (
    <>
      <button
        ref={ref}
        onClick={clickHandler}
        className={`${wide ? "w-full" : ""} px-8 py-4 flex ${calcFill(
          type
        )} ${calcColor(
          type
        )} items-center border border-purple-800 justify-center text-lg cursor-pointer rounded-full ${className}`}
        {...params}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
