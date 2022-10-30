import React from "react";
import { useParams } from "react-router-dom";
import tmdbApi, { category } from "../api/tmdbApi";
import useFetch from "../api/use-fetch";
import Heading from "../components/LayoutComponents/Heading";
import ScrollableItems from "../components/HelperComponents/ScrollableItems";
import LoadingBars from "../components/LoadingPlaceHolders/LoadingBars";
import LeftGridPeople from "../components/PeopleComponent/LeftGridPeople";
import RightGridPeople from "../components/PeopleComponent/RightGridPeople";
import { useEffect } from "react";
import useElementOnScreen from "../api/useElementOnScreen";
import PersonalInfoPeople from "../components/PeopleComponent/PersonalInfoPeople";
import MovieTvByPersonCard from "../components/PeopleComponent/MovieTvByPersonCard";

const SingleResultPerson = ({ setProgress }) => {
  const params = useParams();
  const { data, isLoading } = useFetch(
    tmdbApi.getSingleResult(category?.person, params?.id) +
      "&append_to_response=movie_credits,tv_credits,external_ids",
    500
  );

  const movieCreditsCast = data?.movie_credits?.cast;
  const tvCreditsCast = data?.tv_credits?.cast;
  const movieCreditsCrew = data?.movie_credits?.crew;
  const tvCreditsCrew = data?.tv_credits?.crew;

  const creditsList = [
    {
      headingText: ` Acting In Movies (${movieCreditsCast?.length})`,
      dataPropsToPass: movieCreditsCast,
      categoryValue: "movie",
    },
    {
      headingText: `Production Work In Movies (${movieCreditsCrew?.length})`,
      dataPropsToPass: movieCreditsCrew,
      categoryValue: "movie",
    },
    {
      headingText: `Acting In Series (${tvCreditsCast?.length})`,
      dataPropsToPass: tvCreditsCast,
      categoryValue: "tv",
    },
    {
      headingText: `Production Work In Series (${tvCreditsCrew?.length})`,
      dataPropsToPass: tvCreditsCrew,
      categoryValue: "tv",
    },
  ];
  useEffect(() => {
    if (isLoading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [isLoading, setProgress]);
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });

  if (isLoading) return <LoadingBars />;
  return (
    <section className=" md:pb-20 pb-14 md:pt-32 pt-24  xl:px-40 lg:px-28 md:px-10 px-5 max-w-screen-2xl mx-auto">
      <div className="sm:shadow-2xl sm:shadow-black  sm:p-10 p-0 sm:bg-[#1c1c1c] rounded-xl grid sm:grid-cols-8 grid-cols-1 sm:gap-5 gap-8 mb-10">
        <div className="sm:col-start-1 sm:col-end-3 ">
          <LeftGridPeople dataProps={data} />
        </div>
        <div className="sm:col-start-3 sm:col-end-9 md:p-5 p-0">
          <RightGridPeople dataProps={data} />
        </div>
      </div>

      <div
        ref={containerRef}
        className={`${isVisible ? "" : "section--hidden"} section mb-10`}
      >
        <Heading headingText="Know For" />

        <ScrollableItems
          scrollableItemsProps={
            movieCreditsCast?.length > 0
              ? movieCreditsCast?.slice(0, 7)
              : tvCreditsCast?.slice(0, 7)
          }
          categoryOfUrlProps={movieCreditsCast?.length > 0 ? "movie" : "tv"}
        />
      </div>

      <PersonalInfoPeople data={data} />

      {creditsList?.map((item, index) => {
        return (
          <div key={index}>
            {item?.dataPropsToPass?.length > 0 && (
              <MovieTvByPersonCard item={item} setProgress={setProgress} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default SingleResultPerson;
