import React, { useState } from "react";
import apiConfig from "../../api/apiConfig";
import LazyImg from "../LoadingPlaceHolders/LazyImg";
import CastCrewCard from "./CastCrewCard";
import episode from "../../images/episode.jpg";
import eWhite from "../../images/e-white.png";

const SingleEpisodeCard = ({
  air_date,
  crewArray,
  episode_number,
  guest_starsArray,
  name,
  overview,
  runtime,
  still_path,
  vote_average,
  indexNo,
}) => {
  const [noOfElementsCast, setNoOfElementsCast] = useState(2);
  const [noOfElementsCrew, setNoOfElementsCrew] = useState(2);

  const srcImg = still_path ? apiConfig?.w500Image(still_path) : eWhite;

  const loadMoreCast = () => {
    setNoOfElementsCast((prev) => prev + 5);
  };
  const loadMoreCrew = () => {
    setNoOfElementsCrew((prev) => prev + 5);
  };

  return (
    <div className="md:p-10 p-5  shadow-2xl shadow-black bg-[#1c1c1c] rounded-lg ">
      <div className=" md:flex md:gap-8 mb-8">
        <LazyImg
          alt={name}
          placeholderSrc={episode}
          src={srcImg}
          otherClasses="md:w-96 w-full shadow-2xl  shadow-black   mb-8 md:mb-0   rounded-lg"
          errorImg={eWhite}
        />
        <div>
          <h1 className="md:text-2xl    text-xl font-semibold mb-2  ">
            {name ? name : ` Chapter ${episode_number}`}
          </h1>

          <div className=" flex gap-2">
            {air_date && (
              <span className=" text-xs opacity-60">( {air_date} )</span>
            )}
            <span className=" text-xs opacity-60">
              Episode :{" "}
              {episode_number ? episode_number : (indexNo + 1)?.toString()}
            </span>
            {runtime && (
              <span className="text-xs opacity-60">({runtime} min)</span>
            )}
          </div>

          <div className=" flex  gap-4 items-center my-3 md:my-5">
            <p className=" text-xs">{vote_average?.toFixed(1)} ⭐</p>
            <p className=" text-xs opacity-70">TMDb Rating</p>
          </div>

          <h2 className=" mb-3 mt-2  font-medium   text-lg ">Overview</h2>
          <p
            className={`${
              overview?.length > 250
                ? " h-20  overflow-y-scroll scrollBarCustom"
                : ""
            } text-sm opacity-80`}
          >
            {overview ? overview : " No Overview"}
          </p>
        </div>
      </div>

      <div className="  grid md:grid-cols-2 grid-cols-1 md:gap-2 gap-0">
        <div>
          <h3 className="  mb-3 mt-2  font-medium   text-lg">
            Guest Cast ({guest_starsArray?.length?.toString()})
          </h3>

          <CastCrewCard
            castCrewDetailsProps={guest_starsArray?.slice(0, noOfElementsCast)}
            headingProps={null}
          />
          {noOfElementsCast < guest_starsArray?.length &&
            guest_starsArray?.length > 2 && (
              <div className=" md:justify-start flex justify-center">
                <button
                  onClick={loadMoreCast}
                  className="  mt-5 md:mb-0 mb-5  text-xs px-4 py-1 rounded-full  bg-transparent hover:bg-white text-white border-white border-2 hover:text-black transition-all duration-300"
                >
                  Load More
                </button>
              </div>
            )}
        </div>

        <div>
          <h3 className="  mb-3 mt-2  font-medium   text-lg">
            Crew ({crewArray?.length?.toString()})
          </h3>

          <CastCrewCard
            castCrewCount={null}
            castCrewDetailsProps={crewArray?.slice(0, noOfElementsCrew)}
            headingProps={null}
          />
          {noOfElementsCrew < crewArray?.length && crewArray?.length > 2 && (
            <div className=" md:justify-start flex justify-center">
              <button
                onClick={loadMoreCrew}
                className=" mt-5 md:mb-0 mb-5  text-xs px-4 py-1 rounded-full  bg-transparent hover:bg-white text-white border-white border-2 hover:text-black transition-all duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleEpisodeCard;
