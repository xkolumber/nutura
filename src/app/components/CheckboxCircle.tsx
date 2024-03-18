import React from "react";

interface Props {
  isChecked: boolean;
}

const CheckboxCircle = ({ isChecked }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      className="checkbox_circle"
    >
      <circle
        cx="9"
        cy="9"
        r="8.5"
        stroke="#FAF3EA"
        fill={isChecked ? "white" : "#174218"}
      />
    </svg>
  );
};

export default CheckboxCircle;
