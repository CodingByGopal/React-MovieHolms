import React from "react";
import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Heading from "../LayoutComponents/Heading";
import LazyImg from "../LoadingPlaceHolders/LazyImg";
import poster from "../../images/poster.jpg";
import pWhite from "../../images/p-white.png";
import useElementOnScreen from "../../api/useElementOnScreen";
const LastSeasonDetail = ({ seasons_Array, resultTitle, id }) => {
  const [headingTxt, setHeadingTxt] = useState("");

  const last_season = seasons_Array?.length - 1;
  const season = seasons_Array?.[last_season];
  const posterImageLink = season?.poster_path;
  const heading = season?.name;
  const airDate = season?.air_date;
  const total_episode = season?.episode_count;
  const overview = season?.overview;
  const seasonNumber = season?.season_number;

  const navigate = useNavigate();

  const singleSeasonViewHandler = () => {
    navigate(`/series-season/${id}/${seasonNumber}`);
  };

  const viewAllSeasonsHandler = () => {
    navigate(`/series-seasons-all/${id}`);
  };

  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });

  useEffect(() => {
    seasons_Array?.length > 1
      ? setHeadingTxt(`Current season of ${resultTitle}`)
      : setHeadingTxt(`${resultTitle} Season`);
  }, [resultTitle, seasons_Array?.length]);

  const imgSrc = posterImageLink
    ? apiConfig?.w500Image(posterImageLink)
    : pWhite;

  return (
    <div
      ref={containerRef}
      className={`section ${
        isVisible ? "" : "section--hidden"
      } md:my-14 my-10  text-gray-300  xl:px-40 lg:px-28 md:px-10 px-5 max-w-screen-2xl mx-auto`}
    >
      {/* set heading and view all season button dynamically */}

      <div className="md:flex md:justify-between ">
        <div className=" text-center">
          <Heading headingText={headingTxt} />
        </div>

        {seasons_Array?.length > 1 && (
          <div className="md:block hidden  text-sm hover:text-gray-50 transition-all duration-200  ">
            <button onClick={viewAllSeasonsHandler}>View All Seasons</button>
          </div>
        )}
      </div>

      {/* season card */}

      <div
        onClick={singleSeasonViewHandler}
        className=" shadow-2xl shadow-black sm:text-left text-center flex sm:flex-row flex-col gap-5 cursor-pointer opacity-100 hover:opacity-80 bg-[#1c1c1c] p-5 rounded-xl "
      >
        <LazyImg
          alt={heading}
          placeholderSrc={poster}
          src={imgSrc}
          otherClasses="lg:w-24 md:shadow-2xl shadow-lg  shadow-black   w-32  h-full sm:mx-0 mx-auto  rounded-lg"
          errorImg={pWhite}
        />
        <div className=" flex  flex-col gap-2  sm:items-start items-center  mb-3">
          <div>
            <h6 className="  mt-2 text-gray-50 hover:text-gray-300 text-lg md:mb-3 mb-4 font-semibold leading-none">
              {heading ? heading : `Season ${(last_season + 1)?.toString()}`}
            </h6>
            <div className=" flex md:gap-3 gap-2 md:flex-row flex-col">
              <p className="text-xs text-gray-400 opacity-75">
                Air date : {airDate ? airDate : "( Not Updated )"}
              </p>
              <p className=" text-xs text-gray-400 opacity-75">
                Total Episodes :{" "}
                {total_episode ? total_episode : "( Not Updated )"}
              </p>
            </div>
          </div>

          <p className="text-gray-300  md:text-base text-sm ">
            {overview
              ? `${overview?.substring(0, 150)}...`
              : "No Overview Given"}{" "}
          </p>
        </div>
      </div>

      {/* showing season button dynamically */}

      {seasons_Array?.length > 1 && (
        <div className="md:hidden block text-center mt-6 hover:underline underline-offset-4 text-sm hover:text-gray-50 transition-all duration-200  ">
          <button onClick={viewAllSeasonsHandler}>View All Seasons</button>
        </div>
      )}
    </div>
  );
};

export default LastSeasonDetail;
