import { useEffect, useState } from "react";

const Search = ({ onChangeProps, searchData, searchTermProps }) => {
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    if (searchTermProps?.length > 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [searchTermProps?.length]);

  return (
    <div className="flex-1  gap-2 flex justify-center items-center px-2 lg:ml-6 z-30 ">
      <div className="max-w-xl w-full ">
        <div className="relative ">
          <button className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <input
            onChange={onChangeProps}
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-full leading-5 bg-[#1c1c1c] text-gray-300  text-xs placeholder:opacity-50 placeholder:text-xs placeholder-gray-400 focus:outline-none focus:bg-[#222] focus:text-gray-300 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search for movies, series or person"
          />
        </div>
      </div>
      <div className=" ">
        <button
          title={`${
            searchTermProps ? "Search" : "Please enter something to search"
          } `}
          disabled={searchTermProps ? false : true}
          onClick={searchData}
          className={`py-2 ${
            searchTermProps ? "cursor-pointer " : "  cursor-not-allowed"
          }    ${
            isDisable
              ? " opacity-60 bg-red-500 "
              : "opacity-100 bg-red-600 hover:bg-red-700"
          }   px-4  text-sm    rounded-full transition-all  duration-300 `}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
