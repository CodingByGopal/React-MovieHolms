import Heading from "../LayoutComponents/Heading";
import ScrollableItems from "../HelperComponents/ScrollableItems";
import useElementOnScreen from "../../api/useElementOnScreen";

const SimilarMovieTv = ({ categoryDetails, similarDataProps }) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0.2,
  });
  return (
    <div
      ref={containerRef}
      className={`section ${
        isVisible ? "" : "section--hidden"
      } md:my-20 my-10  text-gray-300  xl:px-40 lg:px-28 md:px-10 px-5 max-w-screen-2xl mx-auto`}
    >
      <Heading
        headingText={` Similar ${
          categoryDetails === "movie" ? "Movies" : "Series"
        }`}
      />

      <ScrollableItems
        refreshPage={true}
        scrollableItemsProps={similarDataProps}
        categoryOfUrlProps={categoryDetails}
      />
    </div>
  );
};

export default SimilarMovieTv;
