import useImageLoad from "../../api/use-imageLoad";

const LazyBackgroundFull = ({ src, children, onErrorImgSrc }) => {
  const { givenSource, bgLoading } = useImageLoad(src, onErrorImgSrc);

  return (
    <div
      className={`bg-cover bg-no-repeat bg-top  ${
        bgLoading ? "skeleton-box-full" : ""
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),#121212),url(${givenSource})`,
      }}
    >
      {children}
    </div>
  );
};

export default LazyBackgroundFull;
