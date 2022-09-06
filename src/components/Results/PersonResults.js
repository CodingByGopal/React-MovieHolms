import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import LazyBackgroundSingle from "../LoadingPlaceHolders/LazyBackgroundSingle";
import male from "../../images/male.png";
import female from "../../images/female.png";
import { useEffect, useState } from "react";

const PersonResults = ({ profile_path, name, id, genderProps }) => {
  const navigate = useNavigate();
  const [genderImg, setGenderImg] = useState("");
  // taking id and url category thru props and giving this as params to singleResultMovieTv

  const viewSingleResultHandler = () => {
    navigate(`/singleResultPerson/${id}`);
  };

  useEffect(() => {
    if (genderProps === 1) {
      setGenderImg(female);
    } else if (genderProps === 2) {
      setGenderImg(male);
    } else {
      setGenderImg(male);
    }
  }, [genderProps]);
  return (
    <div className="moveBottomAnimation mb-5">
      <LazyBackgroundSingle
        onErrorImgSrc={genderImg}
        clickable={true}
        src={profile_path ? apiConfig?.w500Image(profile_path) : genderImg}
        onClickProps={viewSingleResultHandler}
        titleProps={name}
      />
    </div>
  );
};

export default PersonResults;
