import { useContext, useState } from "react";

import api from "../api";
import { Actions, StoreContext } from "../store/StoreProvider";
import { Job } from "../types";

const useCreateJob = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(StoreContext);

  const createJob = async (job: Partial<Job>) => {
    setIsLoading(true);

    const response = await api.createJob(job);

    if (response.status === "success") {
      dispatch({ job: response.data, type: Actions.CREATE_JOB });
    } else {
      // TODO - handle errors
      console.log("There was an error");
      setIsError(true);
    }
    setIsLoading(false);

    return response;
  };

  return {
    createJob,
    isError,
    isLoading,
  };
};

export default useCreateJob;
