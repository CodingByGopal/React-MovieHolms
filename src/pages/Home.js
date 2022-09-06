import tmdbApi, { category } from "../api/tmdbApi";
import Slider from "../components/HomeComponents/Slider";
import TrendingData from "../components/HomeComponents/TrendingData";

const Home = ({ setProgress }) => {
  const textAndUrlList = [
    {
      headingText: "Trending Movies",
      url: tmdbApi?.getTrending(category?.movie),
    },
    {
      headingText: "Trending Series",
      url: tmdbApi?.getTrending(category?.tv),
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Slider setProgress={setProgress} />
      <div className=" pt-10">
        {textAndUrlList?.map((item) => {
          return <TrendingData key={item?.headingText} item={item} />;
        })}
      </div>

      <div className=" mb-20"> </div>
    </div>
  );
};

export default Home;
