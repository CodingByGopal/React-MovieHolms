import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import LazyImg from "../LoadingPlaceHolders/LazyImg";
import poster from "../../images/poster.jpg";
import pWhite from "../../images/p-white.png";
import male from "../../images/male.png";
import female from "../../images/female.png";

const CastCrewCard = ({
  castCrewDetailsProps,
  headingProps,
  castCrewCount,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      {headingProps && castCrewCount && (
        <h2 className="moveBottomAnimation  md:text-left  text-center  text-base font-bold  mb-4">
          {headingProps} ({castCrewCount})
        </h2>
      )}

      <ul>
        {castCrewDetailsProps?.length > 0 &&
          castCrewDetailsProps?.map((item, index) => {
            // navigate to single person result

            const viewSingleResultHandler = () => {
              navigate(`/singleResultPerson/${item?.id}`);
            };
            const gender = item?.gender;
            const genderImg = gender === 1 ? female : male;
            return (
              <li
                onClick={viewSingleResultHandler}
                className=" md:shadow-2xl shadow-lg shadow-[#111] mb-8 cursor-pointer  opacity-100 hover:opacity-80 rounded-lg overflow-hidden bg-[#222]  lg:w-4/5 w-full  lg:mx-0  text-sm"
                key={index}
              >
                <div className=" flex gap-5 ">
                  <LazyImg
                    alt={item?.original_name || item?.name}
                    placeholderSrc={poster}
                    src={
                      item?.profile_path
                        ? apiConfig.w500Image(item?.profile_path)
                        : genderImg
                    }
                    otherClasses="md:w-20  w-24"
                    errorImg={pWhite}
                  />
                  <div className=" p-3 ">
                    <h2 className=" mb-1 md:text-lg text-sm font-semibold">
                      {item?.original_name || item?.name}
                    </h2>
                    {item?.known_for_department && (
                      <p className=" mb-2 opacity-60  text-xs">
                        Department : {item?.known_for_department}
                      </p>
                    )}

                    {item?.character && (
                      <p className=" text-xs">Character : {item?.character}</p>
                    )}

                    {item?.job && (
                      <p className=" text-xs"> Job : {item?.job}</p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}

        {(!castCrewDetailsProps || castCrewDetailsProps?.length === 0) && (
          <li className="lg:mb-0 mb-5 text-sm opacity-60">
            {" "}
            Details Not Available{" "}
          </li>
        )}
      </ul>
    </div>
  );
};

export default CastCrewCard;
