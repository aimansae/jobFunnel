"use client";

import CountryFlag from "./CountryFlag";

type CheckboxType = {
  id: string;
  value: string;
  checked: boolean;
  label?: string;
  onChange: () => void;
  flag?: string;
  className?: string;
};

const Checkbox = ({
  id,
  value,
  checked,
  onChange,
  label,
  flag,
}: CheckboxType) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={id}
          name={id}
          value={value}
          className="h-4 w-4 cursor-pointer border border-gray-700 bg-white accent-[#4d40ab]"
          checked={checked}
          onChange={onChange}
        />
        {flag && (
          <div className="flex flex-shrink-0">
            <CountryFlag country={flag} className="" />
          </div>
        )}
        <label
          htmlFor={id}
          className={`text-ellipsis whitespace-nowrap text-xs md:text-sm ${flag ? "ml-2 text-xs" : "text-sm"} text-gray-700`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
