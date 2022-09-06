import React from "react";

const StatusBudgetDetails = ({
  status,
  original_language,
  budget,
  revenue,
}) => {
  return (
    <ul className=" flex md:gap-10 gap-6 md:flex-row flex-col">
      <li>
        <h3 className=" font-semibold text-gray-50">Spoken Language</h3>{" "}
        {original_language && original_language?.length > 0 ? (
          <ul>
            {original_language?.slice(0, 6)?.map((item, index) => {
              return (
                <li key={index} className="  text-sm text-gray-300">
                  {item?.english_name || item?.name}
                </li>
              );
            })}
          </ul>
        ) : (
          "-"
        )}
      </li>
      <li>
        <h3 className=" font-semibold text-gray-50">Status</h3>{" "}
        {status ? <p className=" text-sm text-gray-300">{status}</p> : "-"}
      </li>

      <li>
        <h3 className=" font-semibold text-gray-50">Budget</h3>{" "}
        {budget ? (
          <p className=" text-sm text-gray-300">{`$${budget}`}</p>
        ) : (
          "-"
        )}
      </li>
      <li>
        <h3 className=" font-semibold text-gray-50">Revenue</h3>{" "}
        {revenue ? (
          <p className=" text-sm text-gray-300">{`$${revenue}`}</p>
        ) : (
          "-"
        )}
      </li>
    </ul>
  );
};

export default StatusBudgetDetails;
