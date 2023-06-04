import { useContext, useEffect, useState } from "react";

import api from "../api";
import { Actions, StoreContext } from "../store/StoreProvider";

const useJobs = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useContext(StoreContext);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);

      const response = await api.getAll();

      if (response.status === "success") {
        dispatch({ jobs: response.data, type: Actions.FETCH_JOBS });
      } else {
        // TODO - handle errors
        console.log("There was an error");
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchJobs();
  }, [dispatch]);

  return {
    isError,
    isLoading,
    jobs: state.jobs,
  };
};

export default useJobs;
