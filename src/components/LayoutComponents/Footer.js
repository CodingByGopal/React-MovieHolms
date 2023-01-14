import footerBg from "../../images/footerbg.jpg";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
const Footer = () => {
  const footerImg = footerBg;
  const fullYear = new Date().getFullYear();
  const firstCol = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Contact us",
      path: "/developer",
    },
    {
      name: "FAQ",
      path: "/FAQ",
    },
  ];

  const secondCol = [
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Series",
      path: "/series",
    },
    {
      name: "People",
      path: "/people",
    },
  ];

  const thirdCol = [
    {
      name: "API",
      path: "https://developers.themoviedb.org/3/getting-started/introduction",
    },
    {
      name: "API terms of use",
      path: "https://www.themoviedb.org/documentation/api/terms-of-use",
    },
  ];

  return (
    <div
      className=" max-w-screen-2xl mx-auto  bg-cover  bg-bottom bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6),#121212),url(${footerImg})`,
      }}
    >
      <div className=" md:text-base text-sm px-5  md:pb-16 pb-10  md:pt-14 pt-10  flex justify-center items-center flex-col ">
        <Link to="/">
          {/* <img src={logo} alt="logo" className=" md:w-52  w-44  mb-10 " /> */}
          <div className=" flex items-center gap-2 mb-10">
            <img src={logo} alt="logo" className=" lg:h-14 h-10 " />
            <span className=" md:text-xl  text-base   font-medium  tracking-[0.2rem] md:tracking-[0.3rem]">
              MovieHolms
            </span>
          </div>
        </Link>

        <div className="  grid-cols-3 grid md:gap-40 gap-5  mb-8 font-semibold">
          <ul className=" flex flex-col gap-1">
            {firstCol?.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className="border-b-2 border-transparent hover:border-red-600"
                    to={item?.path}
                  >
                    {item?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className=" flex flex-col gap-1 ">
            {secondCol?.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    className="border-b-2 border-transparent hover:border-red-600"
                    to={item?.path}
                  >
                    {item?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className=" flex flex-col gap-1">
            {thirdCol?.map((item, index) => {
              return (
                <li key={index}>
                  <a
                    className="border-b-2 border-transparent hover:border-red-600"
                    target="_blank"
                    rel="noreferrer"
                    href={item?.path}
                  >
                    {item?.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <p className=" text-center text-xs py-5    ">
        &copy; {fullYear} MovieHolms By{" "}
        <Link to={"/developer"}>
          <span className=" font-bold  border-b-2 border-transparent hover:border-red-600 text-slate-200 ">
            Gopal Ji
          </span>
        </Link>
      </p>
    </div>
  );
};

export default Footer;
