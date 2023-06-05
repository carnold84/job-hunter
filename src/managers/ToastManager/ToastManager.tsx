import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Toast from "../../components/Toast";
import useToast from "../../hooks/useToast";
import useToasts from "../../hooks/useToasts";

interface Timeouts {
  [id: string]: number;
}

const ToastManager = () => {
  const toasts = useToasts();
  const { removeToast } = useToast();
  const [timeouts, setTimeouts] = useState<Timeouts>({});

  useEffect(() => {
    toasts.forEach(({ id, timeoutMS }) => {
      if (timeoutMS && !timeouts[id]) {
        const timeoutId = setTimeout(() => {
          removeToast(id);
        }, timeoutMS);

        setTimeouts((prev) => {
          return {
            ...prev,
            [id]: timeoutId,
          };
        });
      }
    });
  }, [removeToast, timeouts, toasts]);

  return createPortal(
    <div
      id="toastmanager-portal-root"
      className="absolute bottom-5 right-5"
      style={{ zIndex: 100 }}
    >
      {toasts.map(({ canClose, id, text, title, type }) => {
        return (
          <Toast
            key={id}
            onClose={canClose ? () => removeToast(id) : undefined}
            text={text}
            title={title}
            type={type}
          />
        );
      })}
    </div>,
    document.body
  );
};

export default ToastManager;
