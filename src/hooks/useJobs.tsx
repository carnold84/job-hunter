import { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";

const useJobs = () => {
  const [state] = useContext(StoreContext);

  return {
    error: state.jobs.error && (
      <>
        <h2 className="">{state.jobs.error}</h2>
        <button
          className="btn btn_primary"
          onClick={() => window.location.reload()}
        >
          Try again
        </button>
      </>
    ),
    isLoading: state.jobs.isLoading,
    jobs: state.jobs.items,
  };
};

export default useJobs;
