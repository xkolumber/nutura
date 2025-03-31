import React from "react";

const IconLeftArrow = () => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="group"
    >
      <circle
        cx="15"
        cy="15"
        r="14.5"
        stroke="#174218"
        className="group-hover:fill-[#caccc6] transition ease-in duration-200"
      />

      <path
        d="M18 21L12 15L18 9"
        stroke="#174218"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:stroke-[#174218]"
      />
    </svg>
  );
};

export default IconLeftArrow;
