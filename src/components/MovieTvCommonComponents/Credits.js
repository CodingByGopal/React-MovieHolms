import React, { useEffect } from "react";
import { useState } from "react";
import useElementOnScreen from "../../api/useElementOnScreen";
import Heading from "../LayoutComponents/Heading";
import CreditsSlider from "./CreditsSlider";

const Credits = ({ categoryDetails, id, resultTitle, creditsDataProps }) => {
  const [castHeading, setCastHeading] = useState("");

  useEffect(() => {
    if (categoryDetails === "movie") {
      setCastHeading("Top Billed Cast");
    } else if (categoryDetails === "tv") {
      setCastHeading("Series Cast");
    }
  }, [categoryDetails]);

  const slicedData = creditsDataProps?.cast?.slice(0, 7);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0.2,
  });
  return (
    <div
      ref={containerRef}
      className={` ${
        isVisible ? "" : " section--hidden"
      } section md:mt-10   xl:px-40 lg:px-28 md:px-10 px-5 max-w-screen-2xl mx-auto`}
    >
      <Heading headingText={castHeading} />
      <CreditsSlider
        typeOfUrl={categoryDetails}
        routeId={id}
        creditDataProps={slicedData}
        titleOfResult={resultTitle}
      />
    </div>
  );
};

export default Credits;
