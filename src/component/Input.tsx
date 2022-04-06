import React from "react";
import "./Input.css";

interface props {
  label: string;
  maxLength: number;
  type?: string;
  minLength: number;
  name: string;
  value: string | number;
  onChange: (e: any) => void;
  error: string;
  onkeydown?: () => void;
  rtl?: boolean;
}
const Input = ({
  label,
  maxLength,
  minLength,
  type = "text",
  name,
  value,
  onChange,
  error,
  onkeydown,
  rtl,
}: props) => {
  return (
    <div className="Input">
      <label>{label}</label>
      <input
        value={value}
        onChange={onChange}
        name={name}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        onKeyDown={onkeydown}
        className={rtl ? "rtl" : ""}
      />
      <p className="bold text-right text-red-500 pt-2 pr-1 text-xs">{error}</p>
    </div>
  );
};

export default Input;
