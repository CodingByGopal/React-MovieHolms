import React from "react";

const SocialLinks = ({ linkDataProps, homepageLinkProps }) => {
  return (
    <>
      <ul className=" flex gap-5  text-3xl mb-5 ">
        {linkDataProps?.facebook_id && (
          <li className=" cursor-pointer  hover:text-gray-50 transition-all duration-300">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.facebook.com/${linkDataProps?.facebook_id}`}
            >
              <i title="Visit Facebook" className="fa-brands fa-facebook"></i>
            </a>
          </li>
        )}
        {linkDataProps?.instagram_id && (
          <li className=" cursor-pointer  hover:text-gray-50 transition-all duration-300">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.instagram.com/${linkDataProps?.instagram_id}`}
            >
              <i title="Visit Instagram" className="fa-brands fa-instagram"></i>
            </a>
          </li>
        )}
        {linkDataProps?.twitter_id && (
          <li className=" cursor-pointer  hover:text-gray-50 transition-all duration-300">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={`https://twitter.com/${linkDataProps?.twitter_id}`}
            >
              <i title="Visit Twitter" className="fa-brands fa-twitter"></i>
            </a>
          </li>
        )}

        {homepageLinkProps && (
          <li className=" cursor-pointer  hover:text-gray-50 transition-all duration-300">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={homepageLinkProps}
            >
              <i title="Visit HomePage" className="fa-solid fa-link"></i>
            </a>
          </li>
        )}
      </ul>
    </>
  );
};

export default SocialLinks;
