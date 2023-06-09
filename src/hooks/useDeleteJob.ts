import { useContext, useState } from "react";

import api from "../api";
import { Actions, StoreContext } from "../store/StoreProvider";

const useDeleteJob = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, dispatch] = useContext(StoreContext);

  const deleteJob = async (id: string) => {
    setIsLoading(true);

    const response = await api.deleteJob(id);

    if (response.status === "success") {
      dispatch({ id: response.data.id, type: Actions.DELETE_JOB });
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
    deleteJob,
    isError,
    isLoading,
  };
};

export default useDeleteJob;
