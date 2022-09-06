const Heading = ({ headingText, className }) => {
  return (
    <h1
      className={`${className} mb-8 md:text-3xl text-2xl text-gray-50 font-bold`}
    >
      {headingText}
    </h1>
  );
};

export default Heading;
