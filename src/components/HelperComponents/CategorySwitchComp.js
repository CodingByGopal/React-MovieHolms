import { useState } from "react";
import CategorySwitchBtn from "../LayoutComponents/CategorySwitchBtn";
import PageHeader from "../LayoutComponents/PageHeader";
import ResultsDataFetch from "../Results/ResultsDataFetch";

const CategorySwitchComp = ({
  urlFetch,
  initId,
  listBtnProps,
  bgProps,
  headingCenterProps,
  className,
  setProgress,
}) => {
  const [url, setUrl] = useState(urlFetch);
  const [activeId, setActiveId] = useState(initId);
  const [urlChange, setUrlChange] = useState(false);
  const activeClass = "bg-white  text-black";
  const nonActiveClass = `bg-[#222] text-white ${
    !urlChange ? "hover:bg-[#333]" : ""
  }  transition-all  duration-300`;

  return (
    <section className=" max-w-screen-2xl mx-auto">
      <PageHeader headerImgProps={bgProps} headingCenter={headingCenterProps} />
      <div className="md:flex md:justify-center  md:mb-10 mt-2  lg:px-28 md:px-16  px-8  ">
        <div className={className}>
          {listBtnProps?.map((item, index) => {
            return (
              <CategorySwitchBtn
                key={index}
                btnOnClickAction={(e) => {
                  setUrlChange(true);
                  setUrl(item?.urlToSet);
                  setActiveId(e.target.id);
                  setTimeout(() => {
                    setUrlChange(false);
                  }, 500);
                }}
                urlChangeProps={urlChange}
                name={item?.heading}
                idProps={item?.idToSet}
                className={
                  activeId === item?.idToSet ? activeClass : nonActiveClass
                }
              />
            );
          })}
        </div>
      </div>
      <ResultsDataFetch
        setProgress={setProgress}
        urlChangeProps={urlChange}
        fetchUrl={url}
      />
    </section>
  );
};

export default CategorySwitchComp;
