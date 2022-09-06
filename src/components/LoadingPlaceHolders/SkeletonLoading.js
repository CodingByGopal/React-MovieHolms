import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/free-mode";
import ShimmerLoader from "../LoadingPlaceHolders/ShimmerLoader";
const SkeletonLoading = () => {
  const text = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return (
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
      grabCursor={true}
      freeMode={true}
      spaceBetween={10}
      modules={[FreeMode, Navigation]}
    >
      {text?.map((index) => {
        return (
          <SwiperSlide key={index}>
            <div className=" flex flex-col">
              <ShimmerLoader />
              <div className="p-5  mt-2"></div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default SkeletonLoading;
