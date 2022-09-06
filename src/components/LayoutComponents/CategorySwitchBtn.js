import React from "react";

const CategorySwitchBtn = ({
  urlChangeProps,
  btnOnClickAction,
  name,
  className,
  idProps,
}) => {
  return (
    <button
      disabled={urlChangeProps ? true : false}
      id={idProps}
      onClick={btnOnClickAction}
      className={`${className} ${
        urlChangeProps && !className?.includes("bg-white")
          ? " md:opacity-70  opacity-30 cursor-not-allowed "
          : ""
      }  py-2 lg:text-xs text-[0.6rem] px-3 
     rounded-lg `}
    >
      {name}
    </button>
  );
};

export default CategorySwitchBtn;
