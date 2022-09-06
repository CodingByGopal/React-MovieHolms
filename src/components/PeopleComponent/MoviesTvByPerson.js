import { useState } from "react";
import apiConfig from "../../api/apiConfig";
import ButtonFilled from "../LayoutComponents/ButtonFilled";
import { useNavigate } from "react-router-dom";
import LazyImg from "../LoadingPlaceHolders/LazyImg";
import poster from "../../images/poster.jpg";
import pWhite from "../../images/p-white.png";
const MoviesTvByPerson = ({ dataProps, categoryOfUrl, setProgress }) => {
  const [noOfElemets, setNoOfElements] = useState(3);
  const slicedData = dataProps?.slice(0, noOfElemets);
  const navigate = useNavigate();
  const loadMore = () => {
    setProgress(40);
    setNoOfElements((prev) => prev + 6);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };

  return (
    <>
      <div className=" grid xl:grid-cols-2 grid-cols-1 gap-7">
        {slicedData?.map((item, index) => {
          // taking id and url category thru props and giving this as params to singleResultMovieTv

          const viewSingleResultHandler = () => {
            navigate(`/singleResult/${categoryOfUrl}/${item?.id}`);
          };

          return (
            <div
              onClick={viewSingleResultHandler}
              key={index}
              className=" shadow-2xl shadow-black sm:text-left text-center flex sm:flex-row flex-col gap-5 cursor-pointer opacity-100 hover:opacity-80 bg-[#1c1c1c] p-5 rounded-xl "
            >
              <LazyImg
                placeholderSrc={poster}
                alt={
                  item?.title ||
                  item?.original_title ||
                  item?.name ||
                  item?.original_name
                }
                src={
                  item?.poster_path
                    ? apiConfig?.w500Image(item?.poster_path)
                    : pWhite
                }
                otherClasses="sm:w-24 w-32 md:shadow-xl shadow-lg  shadow-black   sm:mx-0  mx-auto  rounded-xl"
                errorImg={pWhite}
              />
              <div>
                <h1 className=" mb-3 font-medium ">
                  {item?.title ||
                    item?.original_title ||
                    item?.name ||
                    item?.original_name}
                </h1>
                <div className=" flex sm:justify-start justify-center gap-3">
                  {(item?.release_date || item?.first_air_date) && (
                    <span className=" text-xs mb-3 block opacity-75">
                      {item?.release_date || item?.first_air_date}
                    </span>
                  )}
                  <span className=" text-xs mb-3 block opacity-75">
                    {item?.vote_average?.toFixed(1)} ⭐
                  </span>
                </div>

                <p className=" text-sm opacity-80 mb-4 ">
                  {item?.overview
                    ? `${item?.overview?.substring(0, 200)}...`
                    : "No Overview Given"}
                </p>

                {item?.character && (
                  <p className="  text-xs ">Character : {item?.character}</p>
                )}
                {item?.job && <p className=" text-xs">Job : {item?.job}</p>}
              </div>
            </div>
          );
        })}
      </div>

      {dataProps?.length > 3 && dataProps?.length > noOfElemets && (
        <div className=" flex justify-center my-8 ">
          <ButtonFilled name="Load More" btnOnClickAction={loadMore} />
        </div>
      )}
    </>
  );
};

export default MoviesTvByPerson;
