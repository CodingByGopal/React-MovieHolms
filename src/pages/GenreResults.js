import { useParams } from "react-router-dom";
import tmdbApi from "../api/tmdbApi";
import useFetch from "../api/use-fetch";
import CategorySwitchComp from "../components/HelperComponents/CategorySwitchComp";
import bg from "../images/bg.jpg";

const GenreResults = ({ setProgress }) => {
  const params = useParams();
  const categoryOfUrl = params.categoryOfUrl;
  const idGenre = params.id;
  const upcoming =
    categoryOfUrl === "tv" ? "first_air_date.desc" : "release_date.desc";
  const listBtn = [
    {
      urlToSet: tmdbApi.getMovieTvbyGenre(
        categoryOfUrl,
        "popularity.desc",
        idGenre
      ),
      heading: "Based On Popularity",
      idToSet: "1",
    },

    {
      urlToSet: tmdbApi.getMovieTvbyGenre(
        categoryOfUrl,
        "vote_count.desc",
        idGenre
      ),
      heading: "Based On Votes",
      idToSet: "2",
    },

    {
      urlToSet: tmdbApi.getMovieTvbyGenre(categoryOfUrl, upcoming, idGenre),
      heading: "Upcoming",
      idToSet: "3",
    },
  ];
  const { data, isLoading } = useFetch(tmdbApi.getGenre(categoryOfUrl));

  const filterGenre = data?.genres?.filter((item) => {
    return item.id.toString() === params.id;
  });

  const genreName = !filterGenre?.[0]?.name
    ? ""
    : `- ${filterGenre?.[0]?.name}`;

  const headingText = `${
    categoryOfUrl === "movie" ? "Movies" : "Series"
  } Genre  ${genreName}`;

  const headingLoading = isLoading ? (
    <span className=" animate-pulse">Loading...</span>
  ) : (
    headingText
  );

  return (
    <CategorySwitchComp
      setProgress={setProgress}
      className="moveRightAnimation grid gap-4 sm:grid-cols-3 grid-cols-2"
      headingCenterProps={headingLoading}
      bgProps={bg}
      urlFetch={tmdbApi.getMovieTvbyGenre(
        categoryOfUrl,
        "popularity.desc",
        idGenre
      )}
      initId="1"
      listBtnProps={listBtn}
    />
  );
};

export default GenreResults;
