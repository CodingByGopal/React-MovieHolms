import React from "react";
import { useNavigate } from "react-router-dom";
// swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/free-mode";
import useFetch from "../../api/use-fetch";
import tmdbApi from "../../api/tmdbApi";
import BarsLoading from "../LoadingPlaceHolders/BarsLoading";
import { useEffect } from "react";

const GenreComp = ({ categoryOfUrl, setProgress }) => {
  const { data, isLoading } = useFetch(tmdbApi.getGenre(categoryOfUrl), 500);
  const scrollableItems = data?.genres;

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [isLoading, setProgress]);

  if (isLoading)
    return (
      <div className=" flex justify-center items-center h-[15vh]">
        <BarsLoading />
      </div>
    );
  return (
    <>
      <Swiper
        navigation={true}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        freeMode={true}
        spaceBetween={10}
        modules={[FreeMode, Navigation]}
      >
        {scrollableItems?.map((item, index) => {
          // taking id and url category thru  and giving this as params to singleResultMovieTv

          const viewSingleResultHandler = () => {
            navigate(`/genre/${categoryOfUrl}/${item?.id}/${item?.name}`);
          };

          return (
            <SwiperSlide key={index}>
              <div
                onClick={viewSingleResultHandler}
                className=" fadeInAnimation  opacity-100 cursor-pointer hover:opacity-75 rounded-xl bg-[#1c1c1c] p-10 flex justify-center items-center"
              >
                <p className=" md:text-base text-xs md:h-10 h-5">
                  {item?.name}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {(!scrollableItems || scrollableItems?.length === 0) && (
        <p>
          Enough data is not available to suggest{" "}
          {categoryOfUrl === "tv" ? "series" : categoryOfUrl} genres
        </p>
      )}
    </>
  );
};

export default GenreComp;
