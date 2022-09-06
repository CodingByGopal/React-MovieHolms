import useImageLoad from "../../api/use-imageLoad";

const PageHeader = ({ headingCenter, headerImgProps }) => {
  const { givenSource, bgLoading } = useImageLoad(headerImgProps);

  return (
    <div
      className={`${
        bgLoading ? "skeleton-box-full" : ""
      } px-3   md:pt-28 pt-20  bg-cover  flex justify-center bg-center
      bg-no-repeat `}
      style={{
        backgroundImage: `linear-gradient(rgba(18, 18, 18,0.8),rgba(18, 18, 18)),url(${givenSource})`,
      }}
    >
      <h1 className="moveLeftAnimation md:mb-10  mb-6 text-center lg:text-5xl text-3xl  font-bold ">
        {headingCenter}
      </h1>
    </div>
  );
};

export default PageHeader;
