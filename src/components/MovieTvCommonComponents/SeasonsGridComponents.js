import { useNavigate } from "react-router-dom";
import apiConfig from "../../api/apiConfig";
import LazyImg from "../LoadingPlaceHolders/LazyImg";
import poster from "../../images/poster.jpg";
import pWhite from "../../images/p-white.png";
const SeasonsGridComponents = ({
  id,
  seasonNumber,
  posterImageLink,
  overview,
  heading,
  airDate,
  total_episode,
}) => {
  const navigate = useNavigate();
  const singleSeasonViewHandler = () => {
    navigate(`/series-season/${id}/${seasonNumber}`);
  };

  return (
    <div
      onClick={singleSeasonViewHandler}
      className=" shadow-2xl shadow-black text-gray-300  sm:text-left text-center flex sm:flex-row flex-col gap-5 cursor-pointer opacity-100 hover:opacity-80 bg-[#1c1c1c] p-5 rounded-xl "
    >
      <LazyImg
        alt={heading}
        placeholderSrc={poster}
        src={posterImageLink ? apiConfig?.w500Image(posterImageLink) : pWhite}
        otherClasses="md:w-32 md:shadow-2xl shadow-lg  shadow-black  w-28 h-full sm:mx-0 mx-auto  rounded-lg"
        errorImg={pWhite}
      />
      <div className=" flex flex-col justify-center space-y-4 mt-4 text-center sm:mt-0 sm:text-left">
        <p
          className={`${
            overview?.length > 200
              ? " h-20  overflow-y-scroll scrollBarCustom"
              : ""
          } text-sm opacity-80`}
        >
          {overview ? overview : " No Overview"}
        </p>
        <div>
          <h6 className="  text-gray-50 hover:text-gray-300 md:text-xl text-lg mb-2 font-semibold leading-none">
            {heading ? heading : `Season ${seasonNumber?.toString()}`}
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
      </div>
    </div>
  );
};

export default SeasonsGridComponents;
