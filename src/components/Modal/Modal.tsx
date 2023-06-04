import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
  show: boolean;
  showCloseButton?: boolean;
  title: string;
  width?: "sm" | "md" | "lg";
}

const Modal = ({
  children,
  onClose,
  show,
  showCloseButton = true,
  title,
  width = "lg",
}: Props) => {
  const widthClass =
    width === "sm" ? "max-w-lg" : width === "md" ? "max-w-xl" : "max-w-3xl";
  return (
    <Transition show={show} as={Fragment}>
      <Dialog className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white/75" aria-hidden="true" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={[
                "w-full border border-solid border-gray-200 bg-white shadow-xl",
                widthClass,
              ].join(" ")}
            >
              <div className="mb-3 flex items-center justify-between px-8 pt-6">
                <Dialog.Title className="text-2xl">{title}</Dialog.Title>
                {showCloseButton && (
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    onClick={onClose}
                  >
                    <svg
                      color="currentcolor"
                      fill="none"
                      height="20px"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
                        stroke="currentcolor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      ></path>
                    </svg>
                  </button>
                )}
              </div>
              <div>{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
