import { useContext } from "react";

import { Actions, StoreContext } from "../store/StoreProvider";
import { ToastCreate } from "../types";

const useToast = () => {
  const [, dispatch] = useContext(StoreContext);

  const addToast = (toast: ToastCreate) => {
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
