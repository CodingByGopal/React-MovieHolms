import React from "react";
import { Bars } from "react-loader-spinner";
const BarsLoading = () => {
  return (
    <div className=" flex justify-center items-center">
      <Bars color="#f8fafc" height={40} width={40} />
    </div>
  );
};

export default BarsLoading;
