import { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";

const useToasts = () => {
  const [state] = useContext(StoreContext);

  return state.toasts;
};

export default useToasts;
