// swiper imports

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Keyboard, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
//other imports
import React, { useState } from "react";
import apiConfig from "../../api/apiConfig";
import ButtonFilled from "../LayoutComponents/ButtonFilled";
import ButtonOutlined from "../LayoutComponents/ButtonOutlined";
import { useNavigate } from "react-router-dom";
import tmbdApi, { movieType } from "../../api/tmdbApi";
import useFetch from "../../api/use-fetch";
import SliderModal from "../VideosComponents/SliderModal";
import LazyBackgroundFull from "../LoadingPlaceHolders/LazyBackgroundFull";
import LoadingBars from "../LoadingPlaceHolders/LoadingBars";
import bg from "../../images/bg.jpg";
import { useEffect } from "react";
import onErroImg from "../../images/bg.jpg";
const Slider = ({ setProgress }) => {
  const [idForModal, setIdForModal] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  // popularMovie url

  const url = tmbdApi?.getMoviesList(movieType?.popular);
  const { data, isLoading, categoryOfUrl } = useFetch(url, 0);
  const slicedData = data?.results?.slice(0, 4);

  useEffect(() => {
    if (isLoading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [isLoading, setProgress]);

  if (isLoading) return <LoadingBars />;

  return (
    <>
      <Swiper
        modules={[Pagination, Keyboard, Autoplay]}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true,
        }}
        loop={true}
        grabCursor={true}
        spaceBetween={0}
        autoplay={{ delay: 2800, disableOnInteraction: false }}
      >
        {slicedData?.map((item) => {
          const titleText = item?.title || item?.original_title;

          // taking id and url category thru props and giving this as params to singleResultMovieTv

          const viewSingleResultHandler = () => {
            navigate(`/singleResult/${categoryOfUrl}/${item?.id}`);
          };

          //taking id to send it into modal

          const viewModal = () => {
            setShowModal(true);
            setIdForModal(item?.id);
          };

          return (
            <SwiperSlide key={item?.id}>
              {({ isActive }) => {
                return (
                  <div className="max-w-screen-2xl  mx-auto  ">
                    <LazyBackgroundFull
                      onErrorImgSrc={onErroImg}
                      src={
                        item?.backdrop_path
                          ? apiConfig?.originalImage(item?.backdrop_path)
                          : bg
                      }
                    >
                      <div className=" xl:py-52 lg:pt-40 py-32 xl:px-40 lg:px-28 md:px-10 px-5">
                        <h1
                          className={` ${
                            isActive ? "moveTopAnimationOne" : ""
                          } mb-4 text-3xl font-bold leading-none md:text-4xl xl:text-6xl `}
                        >
                          {titleText}
                        </h1>
                        <p
                          className={` ${
                            isActive ? "moveTopAnimationTwo" : ""
                          } max-w-2xl mb-6 font-light lg:mb-8 text-sm  lg:text-xl `}
                        >
                          {`${item?.overview?.substring(0, 200)}....`}
                        </p>
                        <div
                          className={`${
                            isActive ? "moveTopAnimationThree" : ""
                          }`}
                        >
                          <ButtonFilled
                            name="Watch Trailer"
                            // access modal by clicking on this button
                            btnOnClickAction={viewModal}
                          />

                          <ButtonOutlined
                            name="View More"
                            btnOnClickAction={viewSingleResultHandler}
                          />
                        </div>
                      </div>
                    </LazyBackgroundFull>
                  </div>
                );
              }}
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Acessing modal from here based on condition */}

      {showModal && (
        <SliderModal
          id={idForModal}
          categoryType={categoryOfUrl}
          isModalClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Slider;
