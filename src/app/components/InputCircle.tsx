import React from "react";

interface Props {
  selected: string;
  paymentOption: string;
}

const InputCircle = ({ selected, paymentOption }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className="circle_input"
    >
      <circle
        cx="9"
        cy="9"
        r="8.5"
        fill={
          selected === paymentOption || paymentOption === "fill"
            ? "#FAF3EA"
            : "none"
        }
        stroke="#FAF3EA"
      />
    </svg>
  );
};

export default InputCircle;
