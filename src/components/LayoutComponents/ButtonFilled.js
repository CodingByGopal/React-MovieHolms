import React from "react";

const ButtonFilled = ({ name, btnOnClickAction }) => {
  return (
    <button
      onClick={btnOnClickAction}
      className=" py-2   md:text-sm text-xs md:mb-0 mb-3  px-4  bg-red-600 hover:bg-red-700 rounded-full transition-all  duration-300"
    >
      {name}
    </button>
  );
};

export default ButtonFilled;
