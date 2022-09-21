import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonFilled from "../components/LayoutComponents/ButtonFilled";
import LazyImg from "../components/LoadingPlaceHolders/LazyImg";
import errorImg from "../images/error.gif";
import errorPlc from "../images/errorPlc.png";
const ErrorPage = ({ setProgress }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  }, [setProgress]);
  return (
    <section className=" md:pt-28 pt-32 ">
      <div className="  flex justify-center ">
        <LazyImg
          alt="Page not found"
          placeholderSrc={errorPlc}
          src={errorImg}
          errorImg={errorPlc}
        />
      </div>
      <p className=" text-center mb-10">
        Sorry we couldn't find the page you're looking for
      </p>
      <div className="  flex justify-center mb-20">
        <ButtonFilled
          name="Back To Homepage"
          btnOnClickAction={() => navigate("/")}
        />
      </div>
    </section>
  );
};

export default ErrorPage;
