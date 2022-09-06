import useImageLoad from "../../api/use-imageLoad";
import ShimmerLoader from "./ShimmerLoader";

const LazyBackgroundSingle = ({
  src,
  children,
  onClickProps,
  titleProps,
  extraTitle,
  clickable,
  onErrorImgSrc,
}) => {
  const { givenSource, bgLoading } = useImageLoad(src, onErrorImgSrc);

  if (bgLoading)
    return (
      <div className=" flex flex-col">
        <ShimmerLoader />
        {titleProps && (
          <p
            className={`${
              extraTitle ? " text-base" : " text-sm"
            } mt-2 text-center text-transparent opacity-0  `}
          >
            {titleProps}
          </p>
        )}

        {extraTitle && (
          <span className=" text-center block  text-transparent opacity-0 text-xs mt-1">
            {extraTitle}
          </span>
        )}
      </div>
    );
  return (
    <div onClick={onClickProps}>
      <div
        className={`  ${
          clickable ? "cursor-pointer hover:opacity-70 hover:bg-black " : ""
        }   bg-top bg-no-repeat bg-cover  movieCard  rounded-2xl`}
        style={{
          backgroundImage: `url(${givenSource})`,
        }}
      >
        {children}
      </div>
      {titleProps && (
        <div>
          <p
            className={`${
              extraTitle ? " md:text-base text-sm" : " md:text-sm text-xs"
            } mt-2 text-center text-slate-300 hover:text-slate-100 cursor-pointer `}
          >
            {titleProps}
          </p>
          {extraTitle && (
            <span className=" text-center block text-slate-300 md:text-xs text-[0.66rem] mt-1">
              {extraTitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default LazyBackgroundSingle;
