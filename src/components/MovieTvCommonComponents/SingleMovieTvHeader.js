import { useState } from "react";
import apiConfig from "../../api/apiConfig";
import { getYearOfRelease } from "../HelperComponents/GetReleaseYear";
import Modal from "../VideosComponents/Modal";
import { useNavigate } from "react-router-dom";
import GeneralModal from "../HelperComponents/GeneralModal";
import LazyBackgroundSingle from "../LoadingPlaceHolders/LazyBackgroundSingle";
import LazyBackgroundFull from "../LoadingPlaceHolders/LazyBackgroundFull";
import pWhite from "../../images/p-white.png";
import bg from "../../images/bg.jpg";
const SingleMovieTvHeader = ({
  hrefWatchProvider,
  backdrop_path,
  poster_path,
  overview,
  genresArray,
  release_date,
  tagline,
  ratingPercent,
  runtime,
  episode_run_time,
  resultTitle,
  number_of_episodes,
  number_of_seasons,
  videosDataForModal,
  categoryOfUrlProps,
}) => {
  const [readMore, setReadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalWatchNow, setShowModalWatchNow] = useState(false);
  const navigate = useNavigate();
  const slicedGenre = genresArray?.slice(0, 5);
  const yearRelease = release_date ? `(${getYearOfRelease(release_date)})` : "";

  return (
    <div className="  max-w-screen-2xl mx-auto ">
      <LazyBackgroundFull
        onErrorImgSrc={bg}
        src={backdrop_path ? apiConfig?.originalImage(backdrop_path) : bg}
      >
        <div className=" md:pt-40 pt-24 pb-10 max-w-screen-2xl  md:grid md:grid-cols-7 gap-6  xl:px-40 lg:px-28 md:px-10 px-5">
          <div className="md:block hidden col-start-1 col-end-3 ">
            <LazyBackgroundSingle
              onErrorImgSrc={pWhite}
              clickable={false}
              src={poster_path ? apiConfig?.w500Image(poster_path) : pWhite}
            />
          </div>

          <div className="moveBottomAnimation md:col-start-3 md:col-end-8  ">
            <h1 className=" md:text-5xl  text-3xl font-bold mb-2">
              {resultTitle} {yearRelease}
            </h1>
            {(release_date || runtime || episode_run_time?.length > 0) && (
              <ul className=" flex gap-2 mt-2 text-gray-300 md:text-base text-sm ">
                {release_date && <li>{release_date}</li>}

                {runtime ? <li>({runtime} min)</li> : ""}

                {episode_run_time?.length > 0 && (
                  <li>({episode_run_time?.[0]} min)</li>
                )}
              </ul>
            )}

            <ul className="flex gap-2 mt-2 text-gray-300 md:text-sm text-xs">
              {number_of_episodes && (
                <li>No of epidoses : {number_of_episodes}</li>
              )}

              {number_of_seasons && (
                <li>
                  <span>&#x0007C;</span> No of Seasons : {number_of_seasons}
                </li>
              )}
            </ul>
            {slicedGenre?.length > 0 && (
              <ul className="flex  gap-3 mt-3">
                {slicedGenre?.map((item) => {
                  const genreOnClick = () => {
                    navigate(
                      `/genre/${categoryOfUrlProps}/${item?.id}/${item?.name}`
                    );
                  };
                  return (
                    <div onClick={genreOnClick} key={item?.id}>
                      <li className="  cursor-pointer md:text-xs text-[0.65rem] md:border-2 md:rounded-full   md:px-3 md:py-1 px-0 py-0  bg-transparent hover:md:bg-slate-50 hover:text-red-600 font-semibold hover:md:text-[#121212] transition-all duration-200">
                        {item?.name}
                      </li>
                    </div>
                  );
                })}
              </ul>
            )}

            <div className=" flex mt-5 items-center gap-3 mb-5 ">
              <p
                className="   bg-black text-sm  p-3
             rounded-[50%] border-4 border-green-600"
              >
                <span className=" text-xl  font-semibold">
                  {(ratingPercent * 10)?.toFixed(0, 1)?.toString()}
                </span>
                <span className=" text-xs">%</span>
              </p>
              <span className=" font-semibold md:text-lg text-sm">
                {" "}
                TMDb Score
              </span>

              <p
                onClick={() => setShowModal(true)}
                className=" cursor-pointer hover:text-slate-300  transition-all duration-200"
              >
                <i className="fa-solid fa-play md:text-xl text-lg mr-3 md:ml-6 ml-3"></i>{" "}
                <span className=" hover:text-slate-300  transition-all duration-200 text-slate-200 md:text-lg text-sm">
                  Play Trailer
                </span>
              </p>
            </div>
            {hrefWatchProvider && (
              <a
                href={hrefWatchProvider}
                rel="noopener noreferrer"
                target="_blank"
              >
                <button className=" py-2   md:text-sm text-xs md:mb-0 mb-3  px-4  bg-red-600 hover:bg-red-700 rounded-full transition-all  duration-300">
                  Watch Now
                </button>
              </a>
            )}

            {!hrefWatchProvider && (
              <button
                onClick={() => setShowModalWatchNow(true)}
                className=" py-2   md:text-sm text-xs md:mb-0 mb-3  px-4  bg-red-600 hover:bg-red-700 rounded-full transition-all  duration-300"
              >
                Watch Now
              </button>
            )}

            {tagline && (
              <span className="  mt-5 text-sm  text-gray-300 block italic">
                {tagline}
              </span>
            )}

            <h2 className=" mt-6 md:text-xl text-lg font-semibold mb-3">
              Overview
            </h2>
            {overview ? (
              <p className=" text-gray-200 mb-8 md:text-base text-sm">
                {readMore ? overview : overview?.substring(0, 393)}

                {overview?.length > 393 && (
                  <button
                    className=" text-gray-300 opacity-70 hover:text-gray-50 hover:opacity-100"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "...Show Less" : "...Read More"}
                  </button>
                )}
              </p>
            ) : (
              "No Summary Given"
            )}
          </div>
        </div>
      </LazyBackgroundFull>

      {/* Acessing modal from here based on condition */}

      {showModal && (
        <Modal
          isLoading={videosDataForModal ? false : true}
          modalVideosProps={videosDataForModal}
          modalCloseHandler={() => setShowModal(false)}
        />
      )}
      {showModalWatchNow && (
        <GeneralModal modalCloseHandler={() => setShowModalWatchNow(false)} />
      )}
    </div>
  );
};

export default SingleMovieTvHeader;
