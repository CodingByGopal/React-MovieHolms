import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdbApi";
import LoadingBars from "../components/LoadingPlaceHolders/LoadingBars";
import BelongsToCollection from "../components/MovieTvCommonComponents/BelongsToCollection";
import Credits from "../components/MovieTvCommonComponents/Credits";
import LastSeasonDetail from "../components/MovieTvCommonComponents/LastSeasonDetail";
import SimilarMovieTv from "../components/MovieTvCommonComponents/SimilarMovieTv";
import SingleMovieTvHeader from "../components/MovieTvCommonComponents/SingleMovieTvHeader";
import SmallDetailsMovieTv from "../components/MovieTvCommonComponents/SmallDetailsMovieTv";
import VideoGrid from "../components/VideosComponents/VideoGrid";
import useFetch from "../api/use-fetch";
import { useState } from "react";
import { useEffect } from "react";

const SingleResultMovieTv = ({ setProgress }) => {
  const params = useParams();
  const id = params.id;
  const categoryType = params.typeOfUrl;
  const [watchProviderLink, setWatchProviderLink] = useState("");

  const { data, isLoading, categoryOfUrl } = useFetch(
    tmdbApi?.getSingleResult(categoryType, id) +
      "&append_to_response=videos,credits,external_ids,similar,watch/providers",
    500
  );

  const indexOfwatchprovider = Object.keys(data).indexOf("watch/providers");
  const watchProviderAny = Object?.values(data)[indexOfwatchprovider]?.results;
  const languageArray = data?.spoken_languages;

  useEffect(() => {
    if (watchProviderAny) {
      const watchProviderIndiaLink = watchProviderAny?.IN?.link;
      const firstWatchProviderLink = Object?.values(watchProviderAny)[0]?.link;

      if (watchProviderIndiaLink) {
        setWatchProviderLink(watchProviderIndiaLink);
      } else {
        setWatchProviderLink(firstWatchProviderLink);
      }
    } else {
      setWatchProviderLink("");
    }

    if (isLoading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [watchProviderAny, setProgress, isLoading]);

  if (isLoading) return <LoadingBars />;
  return (
    <section>
      <SingleMovieTvHeader
        hrefWatchProvider={watchProviderLink}
        categoryOfUrlProps={categoryOfUrl}
        videosDataForModal={data?.videos?.results}
        backdrop_path={data?.backdrop_path}
        poster_path={data?.poster_path}
        resultTitle={
          data?.title ||
          data?.name ||
          data?.original_title ||
          data?.original_name
        }
        overview={data?.overview}
        genresArray={data?.genres}
        release_date={data?.release_date || data?.first_air_date}
        tagline={data?.tagline}
        ratingPercent={data?.vote_average}
        runtime={data?.runtime}
        episode_run_time={data?.episode_run_time}
        number_of_episodes={data?.number_of_episodes}
        number_of_seasons={data?.number_of_seasons}
      />

      <Credits
        creditsDataProps={data?.credits}
        categoryDetails={categoryOfUrl}
        id={data?.id}
      />

      <SmallDetailsMovieTv
        production_countries_Array={data?.production_countries}
        production_companies_Array={data?.production_companies}
        original_language={languageArray}
        budget={data?.budget}
        revenue={data?.revenue}
        status={data?.status}
        homepageLink={data?.homepage}
        external_ids={data?.external_ids}
      />
      {categoryType === "tv" && (
        <LastSeasonDetail
          id={id}
          seasons_Array={data?.seasons}
          resultTitle={
            data?.title ||
            data?.name ||
            data?.original_title ||
            data?.original_name
          }
        />
      )}

      {data?.belongs_to_collection && (
        <BelongsToCollection
          tagline={data?.tagline}
          collection={data?.belongs_to_collection}
        />
      )}

      <VideoGrid
        videoDataProps={data?.videos?.results}
        categoryTypeProps={categoryOfUrl}
        idProps={id}
        headingTextProps="Popular Videos"
      />
      <SimilarMovieTv
        similarDataProps={data?.similar?.results?.slice(0, 7)}
        categoryDetails={categoryOfUrl}
      />
    </section>
  );
};

export default SingleResultMovieTv;
