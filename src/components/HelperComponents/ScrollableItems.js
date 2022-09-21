import { getYearOfRelease } from "./GetReleaseYear";
import { useNavigate } from "react-router-dom";
import pWhite from "../../images/p-white.png";
import apiConfig from "../../api/apiConfig";
import LazyBackgroundSingle from "../LoadingPlaceHolders/LazyBackgroundSingle";
// swiper imports

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/free-mode";
const ScrollableItems = ({
  refreshPage,
  scrollableItemsProps,
  categoryOfUrlProps,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {scrollableItemsProps?.length > 0 && (
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
          {scrollableItemsProps?.map((item, index) => {
            // taking id and url category thru props and giving this as params to singleResultMovieTv

            const viewSingleResultHandler = () => {
              navigate(`/singleResult/${categoryOfUrlProps}/${item?.id}`);
              if (refreshPage) {
                window.location.reload(false);
              }
            };
            const title =
              item?.title ||
              item?.name ||
              item?.original_title ||
              item?.original_name;
            const releaseDate = item?.release_date || item?.first_air_date;
            return (
              <SwiperSlide key={index}>
                <LazyBackgroundSingle
                  onErrorImgSrc={pWhite}
                  clickable={true}
                  titleProps={` ${title} ${
                    releaseDate ? `(${getYearOfRelease(releaseDate)})` : ""
                  }`}
                  extraTitle={false}
                  onClickProps={viewSingleResultHandler}
                  src={
                    item?.poster_path
                      ? apiConfig?.w500Image(item?.poster_path)
                      : pWhite
                  }
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {(!scrollableItemsProps || scrollableItemsProps?.length === 0) && (
        <p>Details not available</p>
      )}
    </>
  );
};

export default ScrollableItems;
