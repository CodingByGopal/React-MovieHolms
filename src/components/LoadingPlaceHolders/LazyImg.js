import { useState, useEffect } from "react";

const LazyImg = ({
  alt,
  placeholderSrc,
  src,
  otherClasses,
  errorImg,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading  " : "loaded";

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
    img.onerror = () => {
      setImgSrc(errorImg);
    };
  }, [src, setImgSrc, errorImg]);

  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || "movie nuggets posters"}
      className={`${otherClasses} ${customClass}`}
    />
  );
};

export default LazyImg;
