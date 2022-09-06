import ReactPlayer from "react-player";
import LoadingPuff from "../LoadingPlaceHolders/LoadingPuff";

const AllVideosGrid = ({ filterYoutubeVideosProps }) => {
  return (
    <div className="xl:px-40 lg:px-28 md:px-10 px-5">
      {filterYoutubeVideosProps?.length > 0 && (
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-6 gap-10 ">
          {filterYoutubeVideosProps?.map((item) => {
            const urlYoutube = `https://www.youtube.com/watch?v=${item?.key}`;

            return (
              <div
                key={item?.id}
                className="aspect-video  cursor-pointer hover:opacity-80 opacity-100 "
              >
                <ReactPlayer
                  playing={true}
                  className=" shadow-2xl shadow-black"
                  playIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="80"
                      width="80"
                      viewBox="-35.20005 -41.33325 305.0671 247.9995"
                    >
                      <path
                        d="M229.763 25.817c-2.699-10.162-10.65-18.165-20.748-20.881C190.716 0 117.333 0 117.333 0S43.951 0 25.651 4.936C15.553 7.652 7.6 15.655 4.903 25.817 0 44.236 0 82.667 0 82.667s0 38.429 4.903 56.85C7.6 149.68 15.553 157.681 25.65 160.4c18.3 4.934 91.682 4.934 91.682 4.934s73.383 0 91.682-4.934c10.098-2.718 18.049-10.72 20.748-20.882 4.904-18.421 4.904-56.85 4.904-56.85s0-38.431-4.904-56.85"
                        fill="red"
                      />
                      <path
                        d="M93.333 117.559l61.333-34.89-61.333-34.894z"
                        fill="#fff"
                      />
                    </svg>
                  }
                  light={true}
                  fallback={
                    <div className=" aspect-video flex  w-full h-full justify-center  items-center ">
                      <LoadingPuff />
                    </div>
                  }
                  width="100%"
                  height="100%"
                  controls={true}
                  url={urlYoutube}
                  pip={true}
                  stopOnUnmount={false}
                />

                {item?.name && (
                  <p className="md:mt-2 mt-4 text-sm md:text-start text-center font-semibold opacity-80 ">
                    {item?.name}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {(!filterYoutubeVideosProps ||
        filterYoutubeVideosProps?.length === 0) && (
        <p className="md:text-start text-center">No Videos Avaialble</p>
      )}
    </div>
  );
};

export default AllVideosGrid;
