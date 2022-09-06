import React from "react";
import useElementOnScreen from "../../api/useElementOnScreen";
import ScrollableComponent from "./ScrollableComponent";

const TrendingData = ({ item }) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });
  return (
    <div
      ref={containerRef}
      className={`section ${
        isVisible ? "" : "section--hidden"
      } md:mb-8 mb-2 md:pt-10 pt-5 xl:px-40 lg:px-28 md:px-10 px-5  `}
    >
      <h2 className=" md:text-2xl text-xl mb-8  md:px-0 px-2 font-semibold ">
        {item?.headingText}
      </h2>
      <ScrollableComponent timerCounts={1000} url={item?.url} />
    </div>
  );
};

export default TrendingData;
