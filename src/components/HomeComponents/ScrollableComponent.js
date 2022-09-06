import ScrollableItems from "../HelperComponents/ScrollableItems";
import useFetch from "../../api/use-fetch";
import SkeletonLoading from "../LoadingPlaceHolders/SkeletonLoading";

const ScrollableComponent = ({ url, timerCounts }) => {
  const { data, categoryOfUrl, isLoading } = useFetch(url, timerCounts);
  const slicedData = data?.results?.slice(0, 7);

  if (isLoading) return <SkeletonLoading />;

  return (
    <ScrollableItems
      categoryOfUrlProps={categoryOfUrl}
      scrollableItemsProps={slicedData}
    />
  );
};

export default ScrollableComponent;
