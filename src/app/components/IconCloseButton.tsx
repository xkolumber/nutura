import React from "react";

const CloseButton = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //   className="w-12 h-12 -mr-2 -mt-4 md:mt-4 cursor-pointer scale-125 md:scale-100 "
      className="w-14 h-16"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M5 5L19 19M5 19L19 5"
          stroke="#000000"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default CloseButton;
