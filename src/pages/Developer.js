import { useEffect } from "react";
import useImageLoad from "../api/use-imageLoad";
import dev from "../images/dev.jpg";

const Developer = ({ setProgress }) => {
  const { givenSource, bgLoading } = useImageLoad(dev);

  useEffect(() => {
    if (bgLoading) {
      setProgress(40);
    } else {
      setProgress(100);
    }
  }, [bgLoading, setProgress]);

  const socialData = [
    {
      link: "https://www.linkedin.com/in/gopal-ji-470753218/",
      icon: <i className="  fa-brands fa-linkedin"></i>,
    },
    {
      link: "https://www.instagram.com/_matarpaneer/",
      icon: <i className="  fa-brands fa-instagram"></i>,
    },
    {
      link: "https://github.com/CodingByGopal",
      icon: <i className="  fa-brands fa-github"></i>,
    },
    {
      link: "https://codepen.io/CodingByGopal",
      icon: <i className="  fa-brands fa-codepen"></i>,
    },
  ];
  return (
    <div className=" max-w-screen-2xl mx-auto bg-gradient-to-t from-[#151515] to-[#999] ">
      <div className="  max-w-5xl mx-auto md:py-36 py-24 px-5  ">
        <div className="moveLeftAnimation rounded-xl overflow-hidden shadow-2xl shadow-black">
          <div className="   grid md:grid-cols-6 grid-cols-1  ">
            <div className=" md:col-start-1 md:col-end-3   bg-[#151515]">
              <div
                className={` ${
                  bgLoading ? "skeleton-box-full " : ""
                } bg-cover md:h-full h-auto bg-no-repeat bg-top md:pt-[160%] sm:pt-[85%] pt-[100%] `}
                style={{ backgroundImage: `url(${givenSource})` }}
              ></div>
            </div>

            <div className="text-white   bg-[#151515] md:col-start-3 md:col-end-7 md:p-10 p-5">
              <h1 className="moveBottomAnimation mb-5 md:text-7xl text-4xl font-semibold ">
                Hello
              </h1>

              <p className="text-gray-300  md:text-lg text-base md:mb-10 mb-5">
                My name is Gopal Ji. I'm a front-end web developer. I developed
                MovieNuggests to provide a platform for the latest movies,
                series, person details, trailers, and streaming platforms. It is
                free of cost to use. However, to watch the movie/series, you
                will be navigated to the TMDB website as that is the original
                source of data. MovieNuggest uses the{" "}
                <a
                  className=" text-blue-500 font-semibold hover:text-blue-600  hover:underline"
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://developers.themoviedb.org/3/getting-started/introduction"
                >
                  TMDb Api
                </a>{" "}
                as a source of data. If you have any queries or suggestions, you
                are more than welcome to share them with me. Get in touch with
                me on these social links.
              </p>
              <div className="  flex gap-7 pb-6 md:justify-start justify-evenly ">
                {socialData?.map((item, index) => {
                  return (
                    <a
                      key={index}
                      target="_blank"
                      rel="noreferrer noopener"
                      href={item?.link}
                    >
                      <div className=" hover:-translate-y-3 hover:text-slate-300  transition duration-300 md:text-4xl text-3xl">
                        {item?.icon}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
