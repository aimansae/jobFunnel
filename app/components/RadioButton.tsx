import React from "react";
type InputType = {
  id: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: () => void;
};
const RadioButton = ({ id, value, checked, onChange, label }: InputType) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        name={id}
        value={value}
        className="mr-2"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="{name}" className="text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
