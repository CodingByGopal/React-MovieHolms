import { useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdbApi";
import LoadingBars from "../components/LoadingPlaceHolders/LoadingBars";
import apiConfig from "../api/apiConfig";
import CastCrewCard from "../components/MovieTvCommonComponents/CastCrewCard";
import ButtonFilled from "../components/LayoutComponents/ButtonFilled";
import PageHeader from "../components/LayoutComponents/PageHeader";
import useFetch from "../api/use-fetch";
import bg from "../images/bg.jpg";
import { useEffect } from "react";
const FullCast = ({ setProgress }) => {
  //params details
  const params = useParams();
  const id = params.id;
  const typeOfUrl = params.typeOfUrl;
  const [numberOfElementsCast, setNumberOfElementsCast] = useState(10);
  const [numberOfElementsCrew, setNumberOfElementsCrew] = useState(12);

  const { data, isLoading } = useFetch(
    tmdbApi?.getSingleResult(typeOfUrl, id) + "&append_to_response=credits",
    0
  );

  // slice data and send it thru props to CastCrewCard component
  const castDetails = data?.credits?.cast;
  const crewDetails = data?.credits?.crew;
  const slicedCast = castDetails?.slice(0, numberOfElementsCast);
  const slicedCrew = crewDetails?.slice(0, numberOfElementsCrew);

  // loadMore data when load more cast button clicked
  const loadMoreCast = () => {
    setProgress(40);
    setNumberOfElementsCast((prevValue) => prevValue + 10);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };

  // loadMore data when load more crew button clicked
  const loadMoreCrew = () => {
    setProgress(40);
    setNumberOfElementsCrew((prevValue) => prevValue + 12);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  };

  useEffect(() => {
    if (isLoading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [setProgress, isLoading]);
  if (isLoading) return <LoadingBars />;

  return (
    <div className=" max-w-screen-2xl mx-auto">
      <PageHeader
        headingCenter={`${
          data?.title ||
          data?.name ||
          data?.original_title ||
          data?.original_name
        }
          - Cast & Crew`}
        headerImgProps={
          data?.backdrop_path
            ? apiConfig?.originalImage(data?.backdrop_path)
            : bg
        }
      />

      <div className=" moveRightAnimation cursor-pointer pb-14  grid lg:grid-cols-2 grid-cols-1  xl:px-40 lg:px-28 md:px-10 px-5 ">
        <div className=" mb-10 md:mb-0">
          <CastCrewCard
            headingProps="Cast"
            castCrewCount={castDetails?.length.toString()}
            castCrewDetailsProps={slicedCast}
          />
          {numberOfElementsCast < castDetails?.length &&
            castDetails?.length > 10 && (
              <div className="   mt-8 flex md:justify-start justify-center">
                <ButtonFilled
                  name="Load More"
                  btnOnClickAction={loadMoreCast}
                />
              </div>
            )}
        </div>
        <div>
          <CastCrewCard
            headingProps="Crew"
            castCrewCount={crewDetails?.length.toString()}
            castCrewDetailsProps={slicedCrew}
          />
          {numberOfElementsCrew < crewDetails?.length &&
            crewDetails?.length > 10 && (
              <div className="mt-8 flex md:justify-start justify-center">
                <ButtonFilled
                  name="Load More"
                  btnOnClickAction={loadMoreCrew}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default FullCast;
