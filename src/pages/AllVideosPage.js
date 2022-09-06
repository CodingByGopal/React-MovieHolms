import { useState } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import AllVideosGrid from "../components/VideosComponents/AllVideosGrid";
import ButtonFilled from "../components/LayoutComponents/ButtonFilled";
import PageHeader from "../components/LayoutComponents/PageHeader";
import useFetch from "../api/use-fetch";
import LoadingBars from "../components/LoadingPlaceHolders/LoadingBars";
import bg from "../images/bg.jpg";
import { useEffect } from "react";
const AllVideosPage = ({ setProgress }) => {
  const [numberOfElements, setNumberOfElement] = useState(15);
  const params = useParams();
  const categoryType = params?.categoryType;
  const idValue = params?.id;

  const { data, isLoading } = useFetch(
    tmdbApi?.getSingleResult(categoryType, idValue) +
      "&append_to_response=videos",
    0
  );
  const videoData = data?.videos?.results;

  // filtervideo youtube
  const filterYoutubeVideos = videoData?.filter((video) => {
    return video?.site?.toLowerCase() === "youtube";
  });

  // sliced video data sent thru props to  allvideosgrid
  const slicedVideos = filterYoutubeVideos?.slice(0, numberOfElements);

  // loadMore data when load more cast button clicked
  const loadMoreVideos = () => {
    setProgress(60);

    setNumberOfElement((prevValue) => prevValue + 10);
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
  }, [isLoading, setProgress]);

  if (isLoading) return <LoadingBars />;

  return (
    <div className=" max-w-screen-2xl mx-auto  pb-14">
      <PageHeader
        headingCenter={`${
          data?.title ||
          data?.name ||
          data?.original_title ||
          data?.original_name
        }
          - Videos`}
        headerImgProps={
          data?.backdrop_path
            ? apiConfig?.originalImage(data?.backdrop_path)
            : bg
        }
      />
      <div className="moveRightAnimation ">
        <AllVideosGrid filterYoutubeVideosProps={slicedVideos} />
      </div>

      {numberOfElements < filterYoutubeVideos?.length &&
        filterYoutubeVideos?.length > 15 && (
          <div className="md:mt-20 mt-8 flex  justify-center">
            <ButtonFilled name="Load More" btnOnClickAction={loadMoreVideos} />
          </div>
        )}
    </div>
  );
};

export default AllVideosPage;
