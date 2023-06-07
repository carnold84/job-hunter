import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose?: () => void;
}

const ModalHeader = ({ children, onClose }: Props) => {
  return (
    <div className="mb-3 flex items-center justify-between px-8 pt-6">
      <Dialog.Title className="text-2xl">{children}</Dialog.Title>
      {onClose && (
        <button className="btn_icon" onClick={onClose}>
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
  );
};

export default ModalHeader;
