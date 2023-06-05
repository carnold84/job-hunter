import { ChangeEvent, HTMLInputTypeAttribute } from "react";

import "./Input.css";

interface Props {
  id: string;
  label?: string;
  name?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string | null;
}

const Input = ({
  id,
  isReadOnly = true,
  label,
  name,
  onChange,
  type = "text",
  value,
}: Props) => {
  return (
    <div className="grid gap-0.5">
      {label && (
        <label className="text-sm text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className="input"
        id={id}
        name={name}
        onChange={onChange}
        readOnly={isReadOnly}
        type={type}
        value={value || ""}
      />
    </div>
  );
};

export default Input;
