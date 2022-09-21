import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi, { category } from "../api/tmdbApi";
import LoadingBars from "../components/LoadingPlaceHolders/LoadingBars";
import PageHeader from "../components/LayoutComponents/PageHeader";
import SingleEpisodeCard from "../components/MovieTvCommonComponents/SingleEpisodeCard";
import useFetch from "../api/use-fetch";
import AllVideosGrid from "../components/VideosComponents/AllVideosGrid";
import Heading from "../components/LayoutComponents/Heading";
import ButtonFilled from "../components/LayoutComponents/ButtonFilled";
import footerbg from "../images/footerbg.jpg";
import apiConfig from "../api/apiConfig";
import { useEffect } from "react";
import useElementOnScreen from "../api/useElementOnScreen";
const GetSeriesSeasonDetail = ({ setProgress }) => {
  const params = useParams();
  const tvId = params?.tvId;
  const seasonNumber = params?.seasonNo;
  const [noOfEpisodes, setNoOfEpisodes] = useState(3);

  const loadMoreEpisode = () => {
    setProgress(40);
    setNoOfEpisodes((prev) => prev + 5);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };

  const { data, isLoading } = useFetch(
    tmdbApi?.getSingleSeason(tvId, seasonNumber) + "&append_to_response=videos",
    0
  );
  const { data: otherData, isLoading: loading } = useFetch(
    tmdbApi?.getSingleResult(category.tv, tvId),
    0
  );

  const episodes = data?.episodes;

  const videosData = data?.videos?.results;
  const slicedData = episodes?.slice(0, noOfEpisodes);
  const heading =
    data?.name || data?.original_name
      ? `${otherData?.name || otherData?.original_name} : ${
          data?.name || data?.original_name
        } & Videos`
      : ` Season ${data?.season_number} & Videos`;

  useEffect(() => {
    if (isLoading || loading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [isLoading, loading, setProgress]);

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });

  if (isLoading || loading) return <LoadingBars />;
  return (
    <section className=" max-w-screen-2xl mx-auto  pb-20 ">
      <div className=" mb-4">
        <PageHeader
          headingCenter={heading}
          headerImgProps={
            otherData?.backdrop_path
              ? apiConfig.originalImage(otherData?.backdrop_path)
              : footerbg
          }
        />
        <div className=" xl:px-40 lg:px-28 md:px-10 px-5  mb-5  md:flex  justify-center  md:justify-end">
          {episodes && (
            <p className=" md:text-end text-center  text-xs opacity-80">
              Total Number of episodes : {episodes?.length}
            </p>
          )}
        </div>
      </div>

      <div className="  xl:px-40 lg:px-28 md:px-10 px-5 ">
        {slicedData?.length > 0 &&
          slicedData?.map((item, index) => {
            return (
              <div key={item?.id} className=" mb-10">
                <SingleEpisodeCard
                  indexNo={index}
                  air_date={item?.air_date}
                  crewArray={item?.crew}
                  episode_number={item?.episode_number}
                  guest_starsArray={item?.guest_stars}
                  name={item?.name}
                  overview={item?.overview}
                  runtime={item?.runtime}
                  still_path={item?.still_path}
                  vote_average={item?.vote_average}
                />
              </div>
            );
          })}
      </div>

      {noOfEpisodes < episodes?.length && episodes?.length > 3 && (
        <div className="  flex justify-center ">
          <ButtonFilled
            name="Load More Episodes"
            btnOnClickAction={loadMoreEpisode}
          />
        </div>
      )}
      {(!episodes || episodes?.length === 0) && (
        <div className=" text-center  flex justify-center items-center h-[70vh] xl:px-40 lg:px-28 md:px-10 px-5">
          <p className=" text-xl "> No Data available</p>
        </div>
      )}
      <div
        ref={containerRef}
        className={`section ${isVisible ? "" : "section--hidden"}`}
      >
        <div className=" xl:px-40 lg:px-28 md:px-10 px-5 mt-14 md:text-start text-center">
          <Heading
            headingText={`Popular Videos - ${
              data?.name || data?.original_name
                ? data?.name || data?.original_name
                : ` Season ${data?.season_number}`
            }`}
          />
        </div>
        <AllVideosGrid filterYoutubeVideosProps={videosData} />
      </div>
    </section>
  );
};

export default GetSeriesSeasonDetail;
