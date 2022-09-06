import React from "react";
import { useState, useEffect } from "react";
import { fetchData } from "../../api/fetchData";
import tmdbApi from "../../api/tmdbApi";
import useFetch from "../../api/use-fetch";
import ButtonFilled from "../LayoutComponents/ButtonFilled";
import LoadingPuff from "../LoadingPlaceHolders/LoadingPuff";
import PersonResults from "./PersonResults";
import ResultsMovieTv from "./ResultsMovieTv";
import { useNavigate } from "react-router-dom";
const ResultsDataFetch = ({ fetchUrl, urlChangeProps, setProgress }) => {
  //initializing state
  let navigate = useNavigate();
  const [allResultsData, setAllResultsData] = useState([]);
  const [page, setPage] = useState(2);
  const [errorState, setErrorState] = useState(false);
  const [dataFinished, setDataFinished] = useState("");
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const { data, isLoading, categoryOfUrl } = useFetch(fetchUrl);
  const totalResutls = data?.total_results;

  useEffect(() => {
    if (isLoading || urlChangeProps) {
      setProgress(40);
    } else {
      setProgress(100);
    }

    if (
      (fetchUrl?.includes("/discover/movie") ||
        fetchUrl?.includes("/discover/tv")) &&
      data?.results?.length === 0
    ) {
      navigate("/error-page");
    }
    setAllResultsData(data?.results);
    setLoadMoreVisible(true);
  }, [
    data?.results,
    fetchUrl,
    navigate,
    isLoading,
    setProgress,
    urlChangeProps,
  ]);

  // fetching more data by clicking Load more button

  const fetchMoreData = async () => {
    setProgress(40);
    const resultsData = await fetchData(fetchUrl + "&page=" + page);

    // now if we want page 3 then do setPage((prevpage) => prevpage + 1)
    setPage((prevpage) => prevpage + 1);

    const resultsFinal = resultsData?.results;

    if (resultsData) {
      // collecting previous array data and newly fetched data in one array

      const freshData = [...allResultsData, ...resultsFinal];

      // removing duplicate data from new array

      const uniqueData = new Set();
      const filteredArr = freshData?.filter((el) => {
        const duplicate = uniqueData?.has(el?.id);
        uniqueData.add(el?.id);
        return !duplicate;
      });

      // setresults to new array

      setAllResultsData(filteredArr);
      setProgress(100);
      //disable load More button when all pages done
      const currentPage = resultsData?.page;
      const totalPage = resultsData?.total_pages;

      if (currentPage === totalPage) {
        setDataFinished("No More data Available");
        setLoadMoreVisible(false);
      }
    } else {
      setErrorState(true);
      setProgress(100);
    }
  };

  if (isLoading || urlChangeProps)
    return (
      <div className="md:h-[75vh] h-[70vh] flex justify-center items-center">
        <LoadingPuff />
      </div>
    );
  if (errorState)
    return (
      <div className=" flex justify-center items-center  md:h-[75vh] h-[70vh]">
        <p className=" md:text-base  animate-pulse font-bold text-sm">
          An error occurred
        </p>
      </div>
    );

  return (
    <div className=" mt-5 xl:px-20 lg:px-8 md:px-4 px-1 pb-10 ">
      <div className="  grid xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-3 px-2 md:px-10 grid-cols-2 gap-3 ">
        {fetchUrl !== tmdbApi?.getPerson() &&
          allResultsData?.map((item) => {
            return (
              <ResultsMovieTv
                urlCategory={categoryOfUrl}
                id={item?.id}
                name={
                  item?.title ||
                  item?.original_title ||
                  item?.name ||
                  item?.original_name
                }
                key={item?.id}
                poster_path={item?.poster_path}
                release_date={item?.release_date || item?.first_air_date}
              />
            );
          })}
        {fetchUrl === tmdbApi.getPerson() &&
          allResultsData?.map((item) => {
            return (
              <PersonResults
                genderProps={item?.gender}
                id={item?.id}
                profile_path={item?.profile_path}
                name={item?.name}
                key={item?.id}
              />
            );
          })}
      </div>

      {!loadMoreVisible ? (
        <p className="flex justify-center mt-10"> {dataFinished}</p>
      ) : (
        ""
      )}
      {loadMoreVisible && totalResutls > 20 ? (
        <div className=" flex justify-center py-4 ">
          <ButtonFilled name="Load More" btnOnClickAction={fetchMoreData} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ResultsDataFetch;
