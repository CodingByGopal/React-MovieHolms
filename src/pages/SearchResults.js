import { useState } from "react";
import { fetchData } from "../api/fetchData";
import tmdbApi from "../api/tmdbApi";
import Heading from "../components/LayoutComponents/Heading";
import PageHeader from "../components/LayoutComponents/PageHeader";
import ButtonFilled from "../components/LayoutComponents/ButtonFilled";
import PersonResults from "../components/Results/PersonResults";
import ResultsMovieTv from "../components/Results/ResultsMovieTv";
import GenreComp from "../components/SearchAndGenre/GenreComp";
import Search from "../components/SearchAndGenre/Search";
import { useNavigate } from "react-router-dom";
import bg from "../images/footerbg.jpg";
const SearchResults = ({ setProgress }) => {
  const [allData, setAllData] = useState([]);
  const [totalResults, settotalResults] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(2);
  const [dataFinished, setDataFinished] = useState("");
  const [loadMoreVisible, setLoadMoreVisible] = useState(false);
  const [isSearchExist, setIsSearchExist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const getSearch = async () => {
    setProgress(40);
    setIsLoading(true);
    const getData = await fetchData(tmdbApi?.search(searchTerm));

    if (getData) {
      setIsLoading(false);
      setProgress(100);
      settotalResults(getData?.total_results);
      setAllData(getData?.results);
      setLoadMoreVisible(true);
      setIsSearchExist(false);

      setTimeout(() => {
        setIsSearchExist(true);
      }, 1000);
    } else if (getData?.results?.length === 0) {
      setAllData([]);
      setLoadMoreVisible(false);
      setProgress(100);
      setIsLoading(false);
    } else {
      navigate("/error-page");
    }
  };

  const searchHandler = (e) => {
    setSearchTerm(e?.target?.value?.toLowerCase());
  };

  const fetchMoreData = async () => {
    setProgress(40);
    const resultsData = await fetchData(
      tmdbApi?.search(searchTerm) + "&page=" + page
    );
    if (resultsData) {
      // now if we want page 3 then do setPage((prevpage) => prevpage + 1)
      setPage((prevpage) => prevpage + 1);

      const resultsFinal = resultsData?.results;

      // collecting previous array data and newly fetched data in one array

      const freshData = [...allData, ...resultsFinal];

      // removing duplicate data from new array

      const uniqueData = new Set();
      const filteredArr = freshData?.filter((el) => {
        const duplicate = uniqueData?.has(el?.id);
        uniqueData.add(el?.id);
        return !duplicate;
      });

      // setresults to new array

      setAllData(filteredArr);
      setProgress(100);
      //disable load More button when all pages done
      const currentPage = resultsData?.page;
      const totalPage = resultsData?.total_pages;

      if (currentPage === totalPage) {
        setDataFinished("No More data Available");
        setLoadMoreVisible(false);
      }
    } else {
      navigate("/error-page");
    }
  };

  return (
    <div className=" max-w-screen-2xl mx-auto">
      <PageHeader headingCenter=" Search & Genres " headerImgProps={bg} />

      <div className="  mt-5 xl:px-20 lg:px-8 md:px-4 px-1">
        <Search
          searchTermProps={searchTerm}
          searchData={getSearch}
          onChangeProps={searchHandler}
        />

        <div className=" h-6 mt-4">
          {allData?.length === 0 && !isSearchExist && (
            <p className="text-center">Not Found</p>
          )}
          {isLoading && <p className=" text-center">Loading.....</p>}
        </div>

        {allData?.length > 0 && (
          <div>
            <p className=" mt-2 text-xs text-right  mr-2 opacity-75 md:pr-16 pr-0 mb-5">
              Total Results Found: {totalResults}
            </p>
            <div className="   grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 px-2 md:px-10 grid-cols-2 gap-3 ">
              {allData?.map((item, index) => {
                return (
                  <div key={index}>
                    {item?.media_type !== "person" && (
                      <ResultsMovieTv
                        urlCategory={item?.media_type}
                        id={item?.id}
                        poster_path={item?.poster_path}
                        release_date={item?.release_date}
                        name={
                          item?.name ||
                          item?.original_name ||
                          item?.title ||
                          item?.original_title
                        }
                      />
                    )}

                    {item?.media_type === "person" && (
                      <PersonResults
                        genderProps={item?.gender}
                        id={item?.id}
                        profile_path={item?.profile_path}
                        name={item?.name}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {!loadMoreVisible ? (
              <p className="flex justify-center mt-10"> {dataFinished}</p>
            ) : (
              ""
            )}

            {loadMoreVisible && totalResults > 20 ? (
              <div className=" flex justify-center my-4">
                <ButtonFilled
                  name="Load More"
                  btnOnClickAction={fetchMoreData}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        <div className=" mb-10 mt-4 ">
          <div className="  px-2">
            <Heading className="moveLeftAnimation" headingText="Movie-Genres" />
          </div>
          <GenreComp setProgress={setProgress} categoryOfUrl="movie" />
        </div>

        <div className=" mb-20 ">
          <div className="  px-2">
            <Heading
              className="moveLeftAnimation"
              headingText="Series-Genres"
            />
          </div>
          <GenreComp setProgress={setProgress} categoryOfUrl="tv" />
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
