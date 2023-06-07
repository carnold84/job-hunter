import { ReactNode } from "react";

import "./ErrorScreen.css";

interface Props {
  children: ReactNode;
}

const ErrorScreen = ({ children }: Props) => {
  return (
    <div className="error_screen flex w-full grow items-center justify-center p-5">
      <div className="flex max-w-xl flex-col items-center gap-1">
        {children}
      </div>
    </div>
  );
};

export default ErrorScreen;
