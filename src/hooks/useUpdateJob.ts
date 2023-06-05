import { useContext, useState } from "react";

import api from "../api";
import { Actions, StoreContext } from "../store/StoreProvider";
import { JobUpdate } from "../types";

const useUpdateJob = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [, dispatch] = useContext(StoreContext);

  const updateJob = async (id: string, job: JobUpdate) => {
    setIsLoading(true);

    const response = await api.updateJob(id, job);

    if (response.status === "success") {
      dispatch({ job: response.data, type: Actions.UPDATE_JOB });
    } else {
      // TODO - handle errors
      console.log("There was an error");
      setIsError(true);
    }
    setIsLoading(false);

    return {
      job: response.data,
      status: response.status,
    };
  };

  return {
    isError,
    isLoading,
    updateJob,
  };
};

export default useUpdateJob;
