import localforage from "localforage";

import { Job, JobCreate, JobUpdate } from "../types";

const store = localforage.createInstance({
  name: "job-hunter",
});

interface GetAllResponse {
  data: Job[];
  status: "error" | "success";
}

interface Response {
  data: Job;
  status: "error" | "success";
}

export const getAll = async (): Promise<GetAllResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store
        .getItem("jobs")
        .then((jobs) => {
          if (jobs === null) {
            store.setItem("jobs", []).then(() => {
              resolve({
                data: [],
                status: "success",
              });
            });
          } else {
            resolve({
              data: (jobs as Job[]) || [],
              status: "success",
            });
          }
        })
        .catch((err) => {
          reject(err);
        });
    }, 500);
  });
};

export const getById = async (jobId: string): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store
        .getItem("jobs")
        .then((response) => {
          const jobs = response as Job[];
          const job = jobs.filter(({ id }) => id === jobId)[0];

          resolve({
            data: job,
            status: "success",
          });
        })
        .catch((err) => {
          reject(err);
        });
    }, 500);
  });
};

export const deleteJob = async (jobId: string): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store
        .getItem("jobs")
        .then((response) => {
          const jobs = response as Job[];
          const deletedJob = jobs.filter(({ id }) => id === jobId)[0];
          const nextJobs = jobs.filter(({ id }) => id !== deletedJob.id);

          store
            .setItem("jobs", nextJobs)
            .then(() => {
              resolve({
                data: deletedJob,
                status: "success",
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    }, 500);
  });
};

export const createJob = async (job: JobCreate): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store
        .getItem("jobs")
        .then((response) => {
          const jobs = response as Job[];
          const date = new Date();
          const newJob: Job = {
            ...job,
            createdAt: date.toISOString(),
            id: date.getTime().toString(),
            updatedAt: date.toISOString(),
          };
          const nextJobs = [...jobs, newJob];

          store
            .setItem("jobs", nextJobs)
            .then(() => {
              resolve({
                data: newJob,
                status: "success",
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    }, 500);
  });
};

export const updateJob = async (
  id: string,
  job: JobUpdate
): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      store
        .getItem("jobs")
        .then((response) => {
          const jobs = response as Job[];

          let updatedJob: Job;
          const nextJobs = jobs.map((existingJob) => {
            if (id === existingJob.id) {
              updatedJob = {
                ...existingJob,
                ...job,
                updatedAt: new Date().toISOString(),
              };
            }

            return existingJob;
          });

          console.log(jobs);

          store
            .setItem("jobs", nextJobs)
            .then(() => {
              resolve({
                data: updatedJob,
                status: "success",
              });
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    }, 500);
  });
};
