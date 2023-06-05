interface Props {
  onClose?: () => void;
  text?: string;
  title: string;
  type?: "error" | "info" | "success" | "warning";
}

const Toast = ({ onClose, text, title, type = "info" }: Props) => {
  return (
    <div className="flex items-center gap-3 border border-gray-200 bg-white py-3 pl-5 pr-3 shadow-md">
      <div className="grid">
        {type == "error" && (
          <svg
            className="text-red-700"
            fill="none"
            height="20px"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 7v6M12 17.01l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {type == "info" && (
          <svg
            className="text-orange-600"
            fill="none"
            height="20px"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 11.5v5M12 7.51l.01-.011M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {type == "success" && (
          <svg
            className="text-lime-600"
            fill="none"
            height="20px"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 12.5l3 3 7-7"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {type == "warning" && (
          <svg
            className="text-yellow-500"
            fill="none"
            height="20px"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            width="20px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21zM12 9v4"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M12 17.01l.01-.011"
              stroke="currentcolor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="grid grow">
        <h2 className="text-base text-gray-800">{title}</h2>
        {text && <p className="text-sm text-gray-600">{text}</p>}
      </div>
      <div>
        {onClose && (
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
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toast;
