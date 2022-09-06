import React from "react";
import tmdbApi from "../api/tmdbApi";
import PageHeader from "../components/LayoutComponents/PageHeader";
import ResultsDataFetch from "../components/Results/ResultsDataFetch";
import bg from "../images/footerbg.jpg";
const People = ({ setProgress }) => {
  return (
    <div className="  max-w-screen-2xl mx-auto">
      <PageHeader headerImgProps={bg} headingCenter="People" />
      <ResultsDataFetch
        setProgress={setProgress}
        fetchUrl={tmdbApi?.getPerson()}
      />
    </div>
  );
};

export default People;
