import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface Props {
  id: string;
  label?: string;
  name?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  value?: string;
}

const Input = ({ id, label, name, onChange, type = "text", value }: Props) => {
  return (
    <div className="grid gap-0.5">
      {label && (
        <label className="text-sm text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`border border-gray-300 px-3 ${
          type === "date" ? "pb-1.5 pt-2" : "py-2"
        } text-sm focus:outline-none focus-visible:border-orange-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300`}
        id={id}
        name={name}
        onChange={onChange}
        type={type}
        value={value}
      />
    </div>
  );
};

export default Input;
