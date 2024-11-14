import { RadioButtonType } from "@/types";
import React from "react";

const RadioButton = ({
  id,
  value,
  checked,
  onChange,
  label,
}: RadioButtonType) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-start">
        <input
          type="radio"
          id={id}
          name={id}
          value={value}
          className="mr-1 h-3 w-3 cursor-pointer appearance-none rounded border border-gray-400 checked:bg-blue-200"
          checked={checked}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className="text-ellipsis whitespace-nowrap text-xs text-gray-700"
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default RadioButton;
