import React from "react";
import useElementOnScreen from "../../api/useElementOnScreen";
import Heading from "../LayoutComponents/Heading";
import MoviesTvByPerson from "./MoviesTvByPerson";

const MovieTvByPersonCard = ({ item, setProgress }) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });
  return (
    <div
      ref={containerRef}
      className={`section ${isVisible ? "" : "section--hidden"} sm:mt-16 mt-8`}
    >
      <div className=" sm:text-start text-center ">
        <Heading headingText={item?.headingText} />
      </div>

      <MoviesTvByPerson
        setProgress={setProgress}
        categoryOfUrl={item?.categoryValue}
        dataProps={item?.dataPropsToPass}
      />
    </div>
  );
};

export default MovieTvByPersonCard;
