import ReactPlayer from "react-player/youtube";
import ButtonFilled from "../LayoutComponents/ButtonFilled";
import { useNavigate } from "react-router-dom";
import LoadingPuff from "../LoadingPlaceHolders/LoadingPuff";
import Heading from "../LayoutComponents/Heading";
import useElementOnScreen from "../../api/useElementOnScreen";

const VideoGrid = ({
  videoDataProps,
  categoryTypeProps,
  idProps,
  headingTextProps,
}) => {
  const navigate = useNavigate();
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    threshold: 0,
  });
  const viewAllVideos = () => {
    navigate(`/allVideos/${categoryTypeProps}/${idProps}`);
  };
  const filterYoutubeVideos = videoDataProps?.filter((video) => {
    return video?.site?.toLowerCase() === "youtube";
  });

  return (
    <div
      ref={containerRef}
      className={`section ${
        isVisible ? "" : "section--hidden"
      } xl:px-40 lg:px-28 md:px-10 px-5 mt-10 max-w-screen-2xl mx-auto`}
    >
      <Heading headingText={headingTextProps} />

      {filterYoutubeVideos?.length > 0 && (
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-6 gap-8 ">
          {filterYoutubeVideos?.slice(0, 6)?.map((item) => {
            const urlYoutube = `https://www.youtube.com/watch?v=${item?.key}`;

            return (
              <div
                key={item?.id}
                className="aspect-video  hover:opacity-80 opacity-100 "
              >
                <ReactPlayer
                  playing={true}
                  className=" shadow-2xl shadow-black"
                  playIcon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="90"
                      width="90"
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

      {(!videoDataProps || videoDataProps?.length === 0) && (
        <p className=" opacity-80">No Videos Avaialble</p>
      )}

      {videoDataProps?.length > 6 && (
        <div className="flex justify-center mt-10 ">
          <ButtonFilled
            btnOnClickAction={viewAllVideos}
            name="View All Videos"
          />
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
