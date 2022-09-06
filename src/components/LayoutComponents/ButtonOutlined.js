import React from "react";

const ButtonOutlined = ({ name, btnOnClickAction }) => {
  return (
    <button
      onClick={btnOnClickAction}
      className="py-2 md:text-sm text-xs px-4 ml-3 border hover:bg-slate-200 hover:text-slate-900  text-slate-50 rounded-full transition-all  duration-300"
    >
      {name}
    </button>
  );
};

export default ButtonOutlined;
