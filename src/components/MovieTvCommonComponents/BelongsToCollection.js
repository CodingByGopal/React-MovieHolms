import React from "react";
import apiConfig from "../../api/apiConfig";
import ButtonFilled from "../LayoutComponents/ButtonFilled";
import { useNavigate } from "react-router-dom";
import useImageLoad from "../../api/use-imageLoad";
import bg from "../../images/bg.jpg";
import useElementOnScreen from "../../api/useElementOnScreen";

const BelongsToCollection = ({ collection, tagline }) => {
  const navigate = useNavigate();

  // navigate to collection page by taking id and name
  const viewFullCollection = () => {
    navigate(`/collection/${collection?.id}`);
  };
  //custom hook for image loading

  const { givenSource, bgLoading } = useImageLoad(
    collection?.backdrop_path
      ? apiConfig?.originalImage(collection?.backdrop_path)
      : bg
  );

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });
  return (
    <div
      ref={containerRef}
      className={` section ${
        isVisible ? "" : "section--hidden"
      } my-10  text-gray-300  xl:px-40 lg:px-28 md:px-10 px-5 max-w-screen-2xl mx-auto`}
    >
      <div
        // set background dynamically based on condition
        style={{
          backgroundImage: `linear-gradient(rgba(18,18,18,0.5),rgba(18,18,18,0.5)),url(${givenSource})`,
        }}
        className={`${
          bgLoading ? "skeleton-box-full" : ""
        } shadow-2xl shadow-black   rounded-3xl flex flex-col justify-center bg-[#1c1c1c] h-80  bg-no-repeat bg-cover bg-center p-10`}
      >
        <h1 className=" text-center mb-6 sm:text-5xl text-3xl text-gray-50 font-bold">
          {collection?.name}
        </h1>

        {tagline && (
          <p className=" italic text-center md:text-xl text-sm mb-10 ">
            {tagline}
          </p>
        )}

        <div className="flex justify-center ">
          <ButtonFilled
            btnOnClickAction={viewFullCollection}
            name="Full Collection"
          />
        </div>
      </div>
    </div>
  );
};

export default BelongsToCollection;
