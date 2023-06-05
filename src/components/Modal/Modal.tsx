import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose: () => void;
  onCloseEnd?: () => void;
  show: boolean;
  showCloseButton?: boolean;
  width?: "sm" | "md" | "lg" | "xl";
}

const getWidthClass = (width: "sm" | "md" | "lg" | "xl") => {
  if (width === "sm") {
    return "max-w-lg";
  } else if (width === "md") {
    return "max-w-xl";
  } else if (width === "lg") {
    return "max-w-3xl";
  } else {
    return "max-w-4xl";
  }
};

const Modal = ({
  children,
  onClose,
  onCloseEnd,
  show,
  width = "lg",
}: Props) => {
  const widthClass = getWidthClass(width);

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
            afterLeave={onCloseEnd}
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
              <div className="relative">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
