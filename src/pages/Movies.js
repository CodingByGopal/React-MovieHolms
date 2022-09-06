import tmdbApi, { category, movieType } from "../api/tmdbApi";
import CategorySwitchComp from "../components/HelperComponents/CategorySwitchComp";
import bg from "../images/footerbg.jpg";

const Movies = ({ setProgress }) => {
  const listBtn = [
    {
      urlToSet: tmdbApi?.getTrending(category.movie),
      heading: "Trending Movies",
      idToSet: "1",
    },

    {
      urlToSet: tmdbApi?.getMoviesList(movieType?.top_rated),
      heading: "Top Rated Movies",
      idToSet: "2",
    },
    {
      urlToSet: tmdbApi?.getMoviesList(movieType?.popular),
      heading: "Popular Movies",
      idToSet: "3",
    },
    {
      urlToSet: tmdbApi?.discover(category.movie, "vote_count.desc"),
      heading: "Based On Votes",
      idToSet: "4",
    },
  ];
  return (
    <CategorySwitchComp
      setProgress={setProgress}
      className="moveRightAnimation grid gap-4 md:grid-cols-4 sm:grid-cols-3  grid-cols-2"
      headingCenterProps="Movies"
      bgProps={bg}
      urlFetch={tmdbApi?.getTrending(category.movie)}
      initId="1"
      listBtnProps={listBtn}
    />
  );
};

export default Movies;
