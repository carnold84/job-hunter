import { Switch as Toggle } from "@headlessui/react";

interface Props {
  label?: string;
  onChange: (value: boolean) => void;
  value: boolean;
}

const Switch = ({ label, onChange, value }: Props) => {
  return (
    <Toggle.Group>
      <div className="flex items-center">
        <Toggle
          checked={value}
          onChange={onChange}
          className={`${value ? "bg-teal-900" : "bg-teal-700"}
          relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${value ? "translate-x-6" : "translate-x-0"}
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Toggle>
        {label && <Toggle.Label className="ml-2">{label}</Toggle.Label>}
      </div>
    </Toggle.Group>
  );
};

export default Switch;
