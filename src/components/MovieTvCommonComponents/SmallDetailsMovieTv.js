import SocialLinks from "./SocialLinks";
import StatusBudgetDetails from "./StatusBudgetDetails";
import ProductionDetails from "./ProductionDetails";
import Heading from "../LayoutComponents/Heading";
import useElementOnScreen from "../../api/useElementOnScreen";

const SmallDetailsMovieTv = ({
  budget,
  revenue,
  status,
  original_language,
  production_companies_Array,
  production_countries_Array,
  homepageLink,
  external_ids,
}) => {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });
  return (
    <div
      ref={containerRef}
      className={`section ${
        isVisible ? "" : "section--hidden"
      }  md:mt-20 mt-10  text-gray-300  xl:px-40 lg:px-28 md:px-10 px-5 max-w-screen-2xl mx-auto`}
    >
      <Heading headingText="Other Details" />

      {(external_ids?.facebook_id ||
        external_ids?.instagram_id ||
        external_ids?.twitter_id ||
        homepageLink) && (
        <SocialLinks
          homepageLinkProps={homepageLink}
          linkDataProps={external_ids}
        />
      )}
      <StatusBudgetDetails
        status={status}
        original_language={original_language}
        budget={budget}
        revenue={revenue}
      />
      <ProductionDetails
        production_companies_Array={production_companies_Array}
        production_countries_Array={production_countries_Array}
      />
    </div>
  );
};

export default SmallDetailsMovieTv;
