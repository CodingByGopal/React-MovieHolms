import React from "react";
import { Bars } from "react-loader-spinner";

const LoadingBars = () => {
  return (
    <div className=" h-screen flex-col flex justify-center items-center">
      <Bars color="#f8fafc" height={40} width={40} />
      <p className=" text-xs font-semibold mt-5">Loading</p>
    </div>
  );
};

export default LoadingBars;
