import { useEffect } from "react";
import PageHeader from "../components/LayoutComponents/PageHeader";

import bg from "../images/footerbg.jpg";

const Faq = ({ setProgress }) => {
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  }, [setProgress]);
  const qa = [
    {
      ques: "How can I contact MovieNuggest?",
      ans: "You can find contact link in Developer section",
    },
    {
      ques: "Do I have to have an account?",
      ans: "No, you do not have to create an account.",
    },
    {
      ques: "Does it cost to use the site?",
      ans: "No, our website is free to use .",
    },
    {
      ques: "Can I watch videos on MovieNuggest",
      ans: "Most of our movies and TV shows have trailers, clips and featurettes which can be viewed on our site. However, we do not stream or play any of the actual movies or TV shows.",
    },
    {
      ques: "Why can't I find what I am looking for?",
      ans: `There are two common scenarios. First, the media has not been added to our database yet. Second, it could be a misspelling, type or foreign language issue.

      Movies and TV shows support translated titles as well as what we call "Alternative Titles". A lot of times the issue is simply that the translated or alternative title hasn't been added.`,
    },
    {
      ques: "Where does your data come from?",
      ans: " We use TMDB API as movie database.",
    },
    {
      ques: "Do you have copyright of data?",
      ans: " No we do not have copyright of poster and other movie data. Data has been used from TMDB Api. MovieNuggest uses the TMDb Api as source of data but is not endorsed or certified by TMDB.",
    },
    {
      ques: "Do you provide purchase support for JustWatch or TMDB too?",
      ans: " This site is not providing any purchase support. Kindly get in touch TMDB support if you face any issue in purchase.",
    },
  ];
  return (
    <section className=" max-w-screen-2xl mx-auto ">
      <PageHeader headerImgProps={bg} headingCenter="Website FAQ" />
      <div className="reveal-right px-5 pt-5 lg:pb-40  pb-20">
        <div
          className="  max-w-5xl mx-auto  bg-[#151515] shadow-2xl shadow-black
      rounded-xl"
        >
          <div className=" md:p-16 p-8">
            {qa?.map((item, index) => {
              return (
                <div key={index} className=" mb-8">
                  <h1 className=" opacity-90 font-bold md:text-xl text-base mb-2 ">
                    {item?.ques}
                  </h1>
                  <span className=" block border-t opacity-20 mb-4"></span>
                  <p className=" md:text-sm text-xs opacity-80">{item?.ans}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
