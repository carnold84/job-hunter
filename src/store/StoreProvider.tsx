import { ReactNode, createContext, useEffect, useReducer } from "react";

import api from "../api";
import { Job, Toast } from "../types";

export enum Actions {
  ADD_TOAST = "ADD_TOAST",
  CREATE_JOB = "CREATE_JOB",
  DELETE_JOB = "DELETE_JOB",
  FETCH_ERROR = "FETCH_ERROR",
  FETCH_JOBS = "FETCH_JOBS",
  REMOVE_TOAST = "REMOVE_TOAST",
  SET_JOBS = "SET_JOBS",
  UPDATE_JOB = "UPDATE_JOB",
}

interface State {
  jobs: {
    error: string | null;
    isLoading: boolean;
    items: Job[];
  };
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

type FetchErrorAction = {
  type: typeof Actions.FETCH_ERROR;
};

type FetchJobsAction = {
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

type SetJobsAction = {
  jobs: Job[];
  type: typeof Actions.SET_JOBS;
};

type UpdateJobAction = {
  job: Job;
  type: typeof Actions.UPDATE_JOB;
};

type ActionTypes =
  | AddToastAction
  | CreateJobAction
  | DeleteJobAction
  | FetchErrorAction
  | FetchJobsAction
  | RemoveToastAction
  | SetJobsAction
  | UpdateJobAction;

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
        jobs: {
          ...state.jobs,
          items: [...state.jobs.items, action.job],
        },
      };

    case Actions.DELETE_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          items: state.jobs.items.filter((job) => job.id !== action.id),
        },
      };

    case Actions.FETCH_ERROR:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          error: "Oops! We couldn't load your jobs. Try refreshing?",
          isLoading: false,
        },
      };

    case Actions.FETCH_JOBS:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          isLoading: true,
        },
      };

    case Actions.SET_JOBS:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          isLoading: false,
          items: action.jobs,
        },
      };

    case Actions.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== action.id),
      };

    case Actions.UPDATE_JOB:
      return {
        ...state,
        jobs: {
          ...state.jobs,
          items: state.jobs.items.map((job) => {
            if (job.id === action.job.id) {
              return action.job;
            }
            return job;
          }),
        },
      };

    default:
      throw new Error();
  }
};

const initialState: State = {
  jobs: {
    error: null,
    isLoading: false,
    items: [],
  },
  toasts: [],
};

export const StoreContext = createContext<[State, React.Dispatch<ActionTypes>]>(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  [initialState, () => {}]
);

const StoreProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchJobs = async () => {
      dispatch({ type: Actions.FETCH_JOBS });

      const response = await api.getAll();

      if (response.status === "success") {
        dispatch({ jobs: response.data, type: Actions.SET_JOBS });
      } else {
        dispatch({ type: Actions.FETCH_ERROR });
      }
    };

    fetchJobs();
  }, [dispatch]);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
