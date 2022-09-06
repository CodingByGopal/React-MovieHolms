import React from "react";
import ReactPlayer from "react-player";
import LoadingPuff from "../LoadingPlaceHolders/LoadingPuff";

const ModalVideos = ({ videoDataModalProps, isLoadingProps }) => {
  const trailerFilter = videoDataModalProps?.filter((video) => {
    return (
      video?.type?.toLowerCase() === "trailer" &&
      video?.site?.toLowerCase() === "youtube"
    );
  });

  if (isLoadingProps)
    return (
      <div className=" aspect-video flex  w-full h-full justify-center  items-center ">
        <LoadingPuff />
      </div>
    );
  return (
    <div>
      {trailerFilter?.length > 0 &&
        trailerFilter?.slice(0, 1).map((item, index) => {
          const urlYoutube = `https://www.youtube.com/watch?v=${item?.key}`;

          return (
            <div key={index} className="aspect-video ">
              <ReactPlayer
                playing={true}
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
            </div>
          );
        })}

      {(!trailerFilter || trailerFilter?.length === 0) && (
        <p className="px-5 md:text-base text-xs flex  items-center justify-center aspect-video">
          Offical Trailer is not available right now.
        </p>
      )}
    </div>
  );
};

export default ModalVideos;
