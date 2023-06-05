import { ReactNode, createContext, useReducer } from "react";

import { Job, Toast } from "../types";

export enum Actions {
  ADD_TOAST = "ADD_TOAST",
  CREATE_JOB = "CREATE_JOB",
  DELETE_JOB = "DELETE_JOB",
  FETCH_JOBS = "FETCH_JOBS",
  REMOVE_TOAST = "REMOVE_TOAST",
}

interface State {
  jobs: Job[];
  toasts: Toast[];
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

type AddToastAction = {
  toast: Toast;
  type: typeof Actions.ADD_TOAST;
};

type RemoveToastAction = {
  id: string;
  type: typeof Actions.REMOVE_TOAST;
};

type ActionTypes =
  | AddToastAction
  | CreateJobAction
  | DeleteJobAction
  | FetchJobsAction
  | RemoveToastAction;

interface Props {
  children: ReactNode;
}

const reducer = (state: State, action: ActionTypes) => {
  switch (action.type) {
    case Actions.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.toast],
      };

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

    case Actions.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };

    default:
      throw new Error();
  }
};

const initialState: State = {
  jobs: [],
  toasts: [],
};

export const StoreContext = createContext<[State, React.Dispatch<ActionTypes>]>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [{ jobs: [], toasts: [] }, () => {}]
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
