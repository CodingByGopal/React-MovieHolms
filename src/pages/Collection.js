import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import tmdbApi from "../api/tmdbApi";
import useFetch from "../api/use-fetch";
import { getYearOfRelease } from "../components/HelperComponents/GetReleaseYear";
import LazyBackgroundFull from "../components/LoadingPlaceHolders/LazyBackgroundFull";
import LazyBackgroundSingle from "../components/LoadingPlaceHolders/LazyBackgroundSingle";
import LoadingBars from "../components/LoadingPlaceHolders/LoadingBars";
import pWhite from "../images/p-white.png";
import bg from "../images/bg.jpg";
import { useEffect } from "react";
const Collection = ({ setProgress }) => {
  const params = useParams();
  const collectionId = params.id;
  let navigate = useNavigate();
  const [readMore, setReadMore] = useState(false);

  const { data, isLoading, categoryOfUrl } = useFetch(
    tmdbApi.getCollection(collectionId),
    0
  );
  const parts = data?.parts;
  useEffect(() => {
    if (isLoading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [isLoading, setProgress]);
  if (isLoading) return <LoadingBars />;

  return (
    <div className="  max-w-screen-2xl mx-auto ">
      <LazyBackgroundFull
        onErrorImgSrc={bg}
        src={
          data?.backdrop_path
            ? apiConfig?.originalImage(data?.backdrop_path)
            : bg
        }
      >
        <div className=" lg:pt-40 pt-32 pb-28 max-w-screen-2xl  xl:px-40 lg:px-28 md:px-10 px-5">
          <h1 className="moveLeftAnimation md:text-5xl  text-4xl font-bold">
            {data?.title ||
              data?.name ||
              data?.original_title ||
              data?.original_name}
          </h1>
          <div className="moveRightAnimation">
            <h2 className="mt-8 md:text-xl text-lg font-semibold mb-3">
              Overview
            </h2>

            {data?.overview ? (
              <p className="  text-gray-200 mb-8 md:text-base text-sm">
                {readMore ? data?.overview : data?.overview?.substring(0, 393)}

                {data?.overview?.length > 393 && (
                  <button
                    className=" text-gray-300 opacity-70 hover:text-gray-50 hover:opacity-100"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "...Show Less" : "...Read More"}
                  </button>
                )}
              </p>
            ) : (
              <p className=" mb-4 text-sm">No Summary Given</p>
            )}
          </div>
          <div className="moveLeftAnimation grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3  grid-cols-2 lg:gap-4 gap-3">
            {parts?.map((item) => {
              const viewSingleResultHandler = () => {
                navigate(`/singleResult/${categoryOfUrl}/${item?.id}`);
              };
              const title = item?.title || item?.original_title;
              const releaseDate = item?.release_date;
              return (
                <LazyBackgroundSingle
                  onErrorImgSrc={pWhite}
                  key={item?.id}
                  src={
                    item?.poster_path
                      ? apiConfig?.w500Image(item?.poster_path)
                      : pWhite
                  }
                  onClickProps={viewSingleResultHandler}
                  titleProps={` ${title} ${
                    releaseDate ? `(${getYearOfRelease(releaseDate)})` : ""
                  }`}
                  clickable={true}
                />
              );
            })}
          </div>
        </div>
      </LazyBackgroundFull>
    </div>
  );
};

export default Collection;
