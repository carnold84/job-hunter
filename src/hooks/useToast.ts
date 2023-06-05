import { useContext } from "react";

import { Actions, StoreContext } from "../store/StoreProvider";
import { Toast } from "../types";

const useToast = () => {
  const [, dispatch] = useContext(StoreContext);

  const addToast = (toast: Omit<Toast, "id">) => {
    const nextToast = {
      ...toast,
      id: new Date().getTime().toString(),
    };

    dispatch({ toast: nextToast, type: Actions.ADD_TOAST });

    return nextToast;
  };

  const removeToast = (id: string) => {
    dispatch({ id, type: Actions.REMOVE_TOAST });
  };

  return {
    addToast,
    removeToast,
  };
};

export default useToast;
