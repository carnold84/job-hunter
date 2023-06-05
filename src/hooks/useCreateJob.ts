import { useContext, useState } from "react";

import api from "../api";
import { Actions, StoreContext } from "../store/StoreProvider";
import { JobCreate } from "../types";

const useCreateJob = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(StoreContext);

  const createJob = async (job: JobCreate) => {
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

    return {
      job: response.data,
      status: response.status,
    };
  };

  return {
    createJob,
    isError,
    isLoading,
  };
};

export default useCreateJob;
