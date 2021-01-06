import React from "react";
import './InputStyle.css';

interface Props {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  type?: string;
  defaultValue?: any;
  value?: any;
  label?: any;
  checked?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange, style, placeholder, name, disabled, type, defaultValue, value, label, checked }, ref?) => (
    <div >
      <label htmlFor={name} style={{display: 'block'}}>{label}</label>
      <input
        className="input"
        onChange={onChange}
        style={{...style, display: 'block'}}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        type={type || "text"}
        ref={ref}
        defaultValue={defaultValue}
        value={value}
        defaultChecked={checked}
      />
    </div>
  )
);

export default Input;
