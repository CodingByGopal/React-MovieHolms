import apiConfig from "../../api/apiConfig";
import { useNavigate } from "react-router-dom";
import ButtonFilled from "../LayoutComponents/ButtonFilled";
import male from "../../images/male.png";
import female from "../../images/female.png";

// swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/free-mode";
import LazyBackgroundSingle from "../LoadingPlaceHolders/LazyBackgroundSingle";

const CreditsSlider = ({ creditDataProps, typeOfUrl, routeId }) => {
  const navigate = useNavigate();

  // navigate to Full Cast Result (typeOfUrl, routeId and titleOfResult came thru props from SingleResultMovieTv.js -> Credits -> CreditsSlider)
  const viewFullCastHandler = () => {
    navigate(`/fullCast/${typeOfUrl}/${routeId}`);
  };

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
        {creditDataProps?.length > 0 &&
          creditDataProps?.map((item) => {
            // navigate to single person result

            const viewSingleResultHandler = () => {
              navigate(`/singleResultPerson/${item?.id}`);
            };
            const genderImg = item?.gender === 1 ? female : male;
            return (
              <SwiperSlide key={item?.id}>
                <LazyBackgroundSingle
                  onErrorImgSrc={genderImg}
                  src={
                    item?.profile_path
                      ? apiConfig?.w500Image(item?.profile_path)
                      : genderImg
                  }
                  onClickProps={viewSingleResultHandler}
                  titleProps={item?.name}
                  extraTitle={item?.character ? `(${item?.character})` : ""}
                  clickable={true}
                />
              </SwiperSlide>
            );
          })}

        {(!creditDataProps || creditDataProps?.length === 0) && (
          <p className=" md:text-base text-sm">
            {" "}
            Enough Data for cast is not available{" "}
          </p>
        )}
      </Swiper>

      {creditDataProps?.length > 0 && (
        <div className=" text-center mt-10">
          <ButtonFilled
            name=" Full Cast And Crew"
            btnOnClickAction={viewFullCastHandler}
          />
        </div>
      )}
    </>
  );
};

export default CreditsSlider;
