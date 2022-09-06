import React from "react";
import { Puff } from "react-loader-spinner";
const LoadingPuff = () => {
  return (
    <div className="flex  justify-center  ">
      <Puff color="#f8fafc" height={60} width={60} />
    </div>
  );
};

export default LoadingPuff;
