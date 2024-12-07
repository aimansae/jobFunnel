import { LabelType } from "../../types";
import React from "react";

const Label = ({ text }: LabelType) => {
  return (
    <div className="my-2 flex w-full items-center justify-between">
      <label className="text-ellipsis whitespace-nowrap text-xs font-semibold text-gray-500 md:text-sm">
        {text}
      </label>
    </div>
  );
};

export default Label;
