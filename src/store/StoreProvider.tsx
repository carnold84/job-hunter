import { ReactNode, createContext, useReducer } from "react";

import { Job } from "../types";

export enum Actions {
  CREATE_JOB = "CREATE_JOB",
  DELETE_JOB = "DELETE_JOB",
  FETCH_JOBS = "FETCH_JOBS",
}

interface State {
  jobs: Job[];
}

type CreateJobAction = {
  job: Job;
  type: typeof Actions.CREATE_JOB;
};

type DeleteJobAction = {
  id: string;
  type: typeof Actions.DELETE_JOB;
};

type FetchJobsAction = {
  jobs: Job[];
  type: typeof Actions.FETCH_JOBS;
};

type ActionTypes = CreateJobAction | DeleteJobAction | FetchJobsAction;

interface Props {
  children: ReactNode;
}

const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case Actions.CREATE_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.job],
      };

    case Actions.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.id),
      };

    case Actions.FETCH_JOBS:
      return {
        ...state,
        jobs: action.jobs,
      };

    default:
      throw new Error();
  }
};

const initialState: State = {
  jobs: [],
};

export const StoreContext = createContext<[State, React.Dispatch<ActionTypes>]>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [{ jobs: [] }, () => {}]
);

const StoreProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
