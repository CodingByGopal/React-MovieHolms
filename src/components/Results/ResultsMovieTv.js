import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import { getYearOfRelease } from "../HelperComponents/GetReleaseYear";
import LazyBackgroundSingle from "../LoadingPlaceHolders/LazyBackgroundSingle";
import pWhite from "../../images/p-white.png";
const ResultsMovieTv = ({
  urlCategory,
  id,
  poster_path,
  release_date,
  name,
  hoverEffectProps,
}) => {
  const navigate = useNavigate();

  // taking id and url category thru props and giving this as params to singleResultMovieTv

  const viewSingleResultHandler = () => {
    navigate(`/singleResult/${urlCategory}/${id}`);
  };

  return (
    <div className=" moveBottomAnimation  mb-5">
      <LazyBackgroundSingle
        onErrorImgSrc={pWhite}
        hoverEffect={hoverEffectProps}
        clickable={true}
        titleProps={` ${name} ${
          release_date ? `(${getYearOfRelease(release_date)})` : ""
        }`}
        onClickProps={viewSingleResultHandler}
        src={poster_path ? apiConfig?.w500Image(poster_path) : pWhite}
      />
    </div>
  );
};

export default ResultsMovieTv;
