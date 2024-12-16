import React, { ReactNode } from "react";

type LabelType = {
  text: string;
  children?: ReactNode;
  onClick: () => void;
  filterIsVisible: boolean;
};

const Label = ({ text, onClick, filterIsVisible }: LabelType) => {
  return (
    <div
      className="my-2 flex w-full items-center justify-between"
      onClick={onClick}
      data-visible={filterIsVisible}
    >
      <label className="text-ellipsis whitespace-nowrap text-xs font-semibold text-gray-500 md:text-sm">
        {text}
      </label>
    </div>
  );
};

export default Label;
