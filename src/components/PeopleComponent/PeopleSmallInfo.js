import React, { useState } from "react";
import { useEffect } from "react";

const PeopleSmallInfo = ({ dataProps }) => {
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (dataProps?.gender === 1) {
      setGender("Female");
    } else if (dataProps?.gender === 2) {
      setGender("Male");
    }
  }, [dataProps?.gender]);

  const dataList = [
    {
      heading: "Known For",
      value: dataProps?.known_for_department,
    },
    {
      heading: "Gender",
      value: gender,
    },
    {
      heading: "Birthday",
      value: dataProps?.birthday,
    },

    {
      heading: "Place Of Birth",
      value: dataProps?.place_of_birth,
    },
  ];
  return (
    <ul className="  flex md:flex-row flex-col  sm:gap-8   gap-4">
      {dataList?.map((item, index) => {
        return (
          <li key={index}>
            <h1 className=" text-base  font-medium">{item?.heading}</h1>
            <span className="opacity-80 text-xs">
              {item?.value ? item?.value : "-"}
            </span>
          </li>
        );
      })}

      {dataProps?.deathday && (
        <li>
          <h1 className=" text-base  font-medium">Day of Death</h1>
          <span className="opacity-80 text-xs">{dataProps?.deathday}</span>
        </li>
      )}
    </ul>
  );
};

export default PeopleSmallInfo;
