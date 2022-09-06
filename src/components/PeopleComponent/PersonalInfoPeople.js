import useElementOnScreen from "../../api/useElementOnScreen";
import Heading from "../LayoutComponents/Heading";
import SocialLinks from "../MovieTvCommonComponents/SocialLinks";
import PeopleSmallInfo from "./PeopleSmallInfo";

const PersonalInfoPeople = ({ data }) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });
  return (
    <div
      ref={containerRef}
      className={` section ${isVisible ? "" : "section--hidden"} my-16`}
    >
      <Heading headingText="Personal Info" />
      {(data?.external_ids?.facebook_id ||
        data?.external_ids?.instagram_id ||
        data?.external_ids?.twitter_id ||
        data?.homepageLink) && (
        <SocialLinks
          linkDataProps={data?.external_ids}
          homepageLinkProps={data?.hompage}
        />
      )}

      <PeopleSmallInfo dataProps={data} />
    </div>
  );
};

export default PersonalInfoPeople;
