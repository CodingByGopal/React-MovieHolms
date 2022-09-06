import React from "react";

const ProductionDetails = ({
  production_companies_Array,
  production_countries_Array,
}) => {
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1 md:mt-10 mt-5">
      <div className=" mb-8">
        <h3 className="text-gray-50 mb-4 md:text-2xl text-lg font-bold">
          Production Company / Companies
        </h3>
        {production_companies_Array && (
          <ul>
            {production_companies_Array?.map((item, index) => {
              return (
                <li className=" text-sm" key={index}>
                  {item?.name}
                </li>
              );
            })}
          </ul>
        )}
        {(!production_companies_Array ||
          production_companies_Array?.length === 0) && (
          <p>Details Not Available</p>
        )}
      </div>

      <div className=" mb-8">
        <h3 className=" text-gray-50 mb-4 md:text-2xl text-lg font-bold">
          Production Country / Countries
        </h3>
        {production_countries_Array && (
          <ul>
            {production_countries_Array?.map((item, index) => {
              return (
                <li className=" text-sm" key={index}>
                  {item?.name}
                </li>
              );
            })}
          </ul>
        )}

        {(!production_countries_Array ||
          production_countries_Array?.length === 0) && (
          <p className=" text-sm">Details Not Available</p>
        )}
      </div>
    </div>
  );
};

export default ProductionDetails;
