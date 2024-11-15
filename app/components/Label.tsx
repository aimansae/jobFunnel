import { LabelType } from "@/types";
import React from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Label = ({ text, onClick, filterIsVisible }: LabelType) => {
  return (
    <div className="my-2 flex items-center justify-between">
      <label className="text-ellipsis whitespace-nowrap text-xs font-semibold text-gray-500 md:text-sm">
        {text}
      </label>
      <button onClick={onClick}>
        <MdOutlineKeyboardArrowDown
          size={18}
          className={`transform text-gray-500 transition duration-300 ${filterIsVisible ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
};

export default Label;
