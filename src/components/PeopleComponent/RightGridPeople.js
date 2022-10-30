import React, { useState } from "react";
import Heading from "../LayoutComponents/Heading";

const RightGridPeople = ({ dataProps }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <span className=" opacity-40  sm:hidden block border-t mb-4"></span>
      <Heading className="moveBottomAnimation " headingText={dataProps?.name} />
      <h2 className=" mb-4 text-lg md:text-xl  font-semibold">Biography</h2>
      {dataProps?.biography ? (
        <p className="opacity-80    md:text-base text-sm">
          {readMore
            ? dataProps?.biography
            : dataProps?.biography?.substring(0, 858)}

          {dataProps?.biography?.length > 858 && (
            <button
              className=" text-gray-300 opacity-70 hover:text-gray-50 hover:opacity-100"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "...Show Less" : "...Read More"}
            </button>
          )}
        </p>
      ) : (
        <p className=" mt-5 opacity-80 text-sm">No Summary Given</p>
      )}
      <span className="sm:hidden opacity-40 block border-t mt-4"></span>
    </>
  );
};

export default RightGridPeople;
