import { useParams } from "react-router-dom";
import tmbdApi, { category } from "../api/tmdbApi";
import LoadingBars from "../components/LoadingPlaceHolders/LoadingBars";
import apiConfig from "../api/apiConfig";
import SeasonsGridComponents from "../components/MovieTvCommonComponents/SeasonsGridComponents";
import PageHeader from "../components/LayoutComponents/PageHeader";
import useFetch from "../api/use-fetch";
import { useState } from "react";
import ButtonFilled from "../components/LayoutComponents/ButtonFilled";
import bg from "../images/bg.jpg";
import { useEffect } from "react";

export const SeriesSeasonsAll = ({ setProgress }) => {
  const params = useParams();
  const id = params?.id;

  const { data, isLoading } = useFetch(
    tmbdApi?.getSingleResult(category?.tv, id),
    0
  );

  const [noOfElements, setNoOfElements] = useState(10);
  const seasonsSliced = data?.seasons?.slice(0, noOfElements);
  const loadMore = () => {
    setProgress(40);
    setNoOfElements((prev) => prev + 10);
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
  console.log(seasonsSliced?.length);
  if (isLoading) return <LoadingBars />;
  return (
    <div className=" max-w-screen-2xl mx-auto md:pb-20 pb-10">
      <PageHeader
        headingCenter={`${data?.name || data?.original_name} - Seasons`}
        headerImgProps={
          data?.backdrop_path
            ? apiConfig?.originalImage(data?.backdrop_path)
            : bg
        }
      />

      <div
        className={`${
          seasonsSliced?.length <= 2 ? " xl:grid-cols-1" : "xl:grid-cols-2"
        } moveRightAnimation grid  grid-cols-1 gap-6 mt-10 xl:px-40 lg:px-28 md:px-10 px-5 max-w-screen-2xl mx-auto`}
      >
        {seasonsSliced?.map((item) => {
          return (
            <SeasonsGridComponents
              title={data?.name || data?.original_name}
              key={item?.id}
              id={id}
              seasonNumber={item?.season_number}
              posterImageLink={item?.poster_path}
              overview={item?.overview}
              heading={item?.name}
              airDate={item?.air_date}
              total_episode={item?.episode_count}
            />
          );
        })}
      </div>

      {noOfElements < data?.seasons?.length && data?.seasons?.length > 10 && (
        <div className=" flex justify-center mt-10">
          <ButtonFilled name="Load More" btnOnClickAction={loadMore} />
        </div>
      )}
    </div>
  );
};
