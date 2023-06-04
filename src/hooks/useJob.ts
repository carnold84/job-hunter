import { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";

const useJob = (id: string | null) => {
  const [state] = useContext(StoreContext);

  return id === null ? id : state.jobs.filter((job) => job.id === id)[0];
};

export default useJob;
