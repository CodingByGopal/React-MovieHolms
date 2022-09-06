import React from "react";

const GeneralModal = ({ modalCloseHandler }) => {
  return (
    <div className=" px-2 min-w-screen h-screen fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none ">
      <div
        onClick={modalCloseHandler}
        className="absolute bg-black opacity-80 inset-0 z-0"
      ></div>
      <div className="moveTopAnimationModal bg-[#121212] w-full max-w-5xl    relative mx-auto my-auto  shadow-lg   ">
        <div
          onClick={modalCloseHandler}
          className=" cursor-pointer hover:text-red-600 transition-all duration-300 absolute lg:-top-2 lg:-right-2 -top-3 -right-2 text-2xl text-gray-50 "
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </div>
        <div>
          <div className="text-center  aspect-video  flex justify-center items-center">
            <p className=" px-5 md:text-base text-xs">
              Streaming Platfrom is not available right now
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
