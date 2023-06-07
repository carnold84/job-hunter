import { useContext } from "react";
import { Link } from "react-router-dom";

import { StoreContext } from "../store/StoreProvider";

const useJob = (id?: string) => {
  const [state] = useContext(StoreContext);

  const isLoading = state.jobs.isLoading;
  const job = id ? state.jobs.items.filter((job) => job.id === id)[0] : null;

  console.log(job);

  return {
    error:
      state.jobs.error || (isLoading === false && !job) ? (
        <>
          <h2 className="">Hmmm, we couldn't find this job.</h2>
          <p>
            Try finding it <Link to="/">here</Link>.
          </p>
        </>
      ) : null,
    isLoading,
    job,
  };
};

export default useJob;
