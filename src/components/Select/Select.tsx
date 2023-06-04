import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Option {
  id: string;
  name: string;
}

interface Props {
  label?: string;
  onChange: (value: Option) => void;
  options: Option[];
  value?: Option;
}

const Select = ({ label, onChange, options, value }: Props) => {
  return (
    <div className="grid gap-0.5">
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default border border-gray-300 py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-orange-600 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {value?.name ?? "Choose an option..."}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                width="20px"
                height="20px"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-sm text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-orange-50" : ""
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <svg
                            width="18px"
                            height="18px"
                            stroke-width="2.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="#000000"
                          >
                            <path
                              d="M5 13l4 4L19 7"
                              stroke="#000000"
                              stroke-width="2.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
