import React from "react";
import apiConfig from "../../api/apiConfig";
import LazyImg from "../LoadingPlaceHolders/LazyImg";
import poster from "../../images/poster.jpg";
import male from "../../images/male.png";
import female from "../../images/female.png";
const LeftGridPeople = ({ dataProps }) => {
  const genderImg = dataProps?.gender === 1 ? female : male;

  return (
    <>
      <LazyImg
        errorImg={genderImg}
        otherClasses=" sm:w-full w-56 sm:mx-0 mx-auto shadow-2xl shadow-black rounded-xl "
        placeholderSrc={poster}
        alt={dataProps?.name}
        src={
          dataProps?.profile_path
            ? apiConfig?.w500Image(dataProps?.profile_path)
            : genderImg
        }
      />
    </>
  );
};

export default LeftGridPeople;
