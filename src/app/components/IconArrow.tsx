"use client";
import React, { useEffect, useState } from "react";

interface Props {
  whatIsClicked: string;
}

const IconArrow = ({ whatIsClicked }: Props) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (whatIsClicked !== "") {
      setRotation(-90);
    } else {
      setRotation(0);
    }
  }, [whatIsClicked]);

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.2s ease",
      }}
    >
      <path
        d="M21 12L15 18L9 12"
        stroke="#174218"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="15"
        cy="15"
        r="14.5"
        transform="rotate(-90 15 15)"
        stroke="#174218"
      />
    </svg>
  );
};

export default IconArrow;
