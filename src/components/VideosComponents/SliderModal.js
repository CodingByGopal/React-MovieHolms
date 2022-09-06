import React from "react";
import tmdbApi from "../../api/tmdbApi";
import useFetch from "../../api/use-fetch";
import Modal from "./Modal";

const SliderModal = ({ isModalClose, id, categoryType }) => {
  const { data, isLoading } = useFetch(tmdbApi.getVideos(categoryType, id));

  return (
    <>
      <Modal
        modalCloseHandler={isModalClose}
        modalVideosProps={data?.results}
        isLoading={isLoading}
      />
    </>
  );
};

export default SliderModal;
