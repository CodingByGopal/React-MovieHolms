import tmdbApi, { category, tvType } from "../api/tmdbApi";
import CategorySwitchComp from "../components/HelperComponents/CategorySwitchComp";

import bg from "../images/footerbg.jpg";
const Series = ({ setProgress }) => {
  const listBtn = [
    {
      urlToSet: tmdbApi?.getTrending(category?.tv),
      heading: "Trending Series",
      idToSet: "1",
    },

    {
      urlToSet: tmdbApi?.getTvList(tvType?.top_rated),
      heading: "Top Rated Series",
      idToSet: "2",
    },
    {
      urlToSet: tmdbApi?.getTvList(tvType?.popular),
      heading: "Popular Series",
      idToSet: "3",
    },
    {
      urlToSet: tmdbApi?.discover(category.tv, "vote_count.desc"),
      heading: "Based On Votes",
      idToSet: "4",
    },
  ];
  return (
    <CategorySwitchComp
      setProgress={setProgress}
      className="moveRightAnimation grid gap-4  md:grid-cols-4 sm:grid-cols-3  grid-cols-2"
      headingCenterProps="Series"
      bgProps={bg}
      urlFetch={tmdbApi?.getTrending(category.tv)}
      initId="1"
      listBtnProps={listBtn}
    />
  );
};

export default Series;
