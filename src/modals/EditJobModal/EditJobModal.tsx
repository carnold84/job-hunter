import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import LoadingScreen from "../../components/LoadingScreen";
import Modal from "../../components/Modal";
import Select from "../../components/Select";
import useCreateJob from "../../hooks/useCreateJob";
import useToast from "../../hooks/useToast";
import useUpdateJob from "../../hooks/useUpdateJob";
import { ApplicationStatus, Job, JobCreate, JobUpdate } from "../../types";

type DefaultValues = Omit<Job, "createdAt" | "id" | "updatedAt">;

const defaultValues: DefaultValues = {
  application: {
    appliedAt: null,
    status: null,
    method: null,
  },
  location: null,
  notes: null,
  poster: null,
  status: "active",
  title: null,
  url: null,
};

const statusOptions = [
  {
    id: "active",
    name: "Active",
  },
  {
    id: "expired",
    name: "Expired",
  },
];

const applicationStatusOptions = [
  {
    id: "pending",
    name: "Pending",
  },
  {
    id: "failed",
    name: "Failed",
  },
  {
    id: "success",
    name: "Success",
  },
];

interface Props {
  job: Job | null;
  onCloseEnd?: () => void;
  show: boolean;
}

const EditJobModal = ({ job, onCloseEnd: onCloseEndProp, show }: Props) => {
  const [formValues, setFormValues] = useState<DefaultValues>(defaultValues);
  const navigate = useNavigate();
  const { createJob, isLoading } = useCreateJob();
  const { updateJob } = useUpdateJob();
  const { addToast } = useToast();

  useEffect(() => {
    if (job) {
      setFormValues({
        ...job,
        application: {
          ...job.application,
        },
      });
    }
  }, [job]);

  const onChange = (key: string, value: string) => {
    setFormValues((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const onClose = () => {
    navigate(-1);
  };

  const onCloseEnd = () => {
    setFormValues(defaultValues);

    if (onCloseEndProp) {
      onCloseEndProp();
    }
  };

  const onSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (formValues.title) {
      if (job) {
        const nextJob: JobUpdate = {
          ...formValues,
        };

        const response = await updateJob(job.id, nextJob);

        if (response.status === "success") {
          addToast({
            text: "Job updated",
            timeoutMS: 3000,
            title: `${response.job.title} was successfully updated.`,
            type: "success",
          });

          onClose();
        }
      } else {
        const nextJob: JobCreate = {
          ...formValues,
        };

        const response = await createJob(nextJob);

        if (response.status === "success") {
          addToast({
            text: "Job added",
            timeoutMS: 3000,
            title: `${response.job.title} was successfully added.`,
            type: "success",
          });

          onClose();
        }
      }
    }
  };

  return (
    <Modal onClose={onClose} onCloseEnd={onCloseEnd} show={show} width="xl">
      {isLoading && <LoadingScreen />}
      <Modal.Header onClose={onClose}>
        {job ? job.title : "New Job"}
      </Modal.Header>
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-5 gap-5 px-8 pb-8">
          <div className="col-span-3 grid content-start items-start gap-3">
            <h3 className="text-lg">Details</h3>
            <Input
              id="title"
              label="Title"
              name="title"
              onChange={(evt) => onChange("title", evt.target.value)}
              value={formValues.title}
            />
            <Input
              id="poster"
              label="Company/Agency"
              name="poster"
              onChange={(evt) => onChange("poster", evt.target.value)}
              value={formValues.poster}
            />
            <Input
              id="location"
              label="Location"
              name="location"
              onChange={(evt) => onChange("location", evt.target.value)}
              value={formValues.location}
            />
            <Select
              label="Status"
              onChange={(option) => onChange("status", option.id)}
              options={statusOptions}
              value={
                statusOptions.filter(({ id }) => formValues.status === id)[0]
              }
            />
          </div>
          <div className="col-span-2 grid content-start items-start gap-3 border border-gray-200 bg-gray-50 p-5">
            <h3 className="text-lg">Application</h3>
            <Select
              label="Status"
              onChange={(option) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    application: {
                      ...prev.application,
                      status: option.id as ApplicationStatus,
                    },
                  };
                });
              }}
              options={applicationStatusOptions}
              value={
                applicationStatusOptions.filter(
                  ({ id }) => formValues.application?.status === id
                )[0]
              }
            />
            <Input
              id="appliedAt"
              label="Applied Date"
              name="appliedAt"
              onChange={(evt) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    application: {
                      ...prev.application,
                      appliedAt: evt.target.value,
                    },
                  };
                });
              }}
              type="date"
              value={formValues.application?.appliedAt}
            />
            <Input
              id="method"
              label="Method"
              name="method"
              onChange={(evt) => {
                setFormValues((prev) => {
                  return {
                    ...prev,
                    application: {
                      ...prev.application,
                      method: evt.target.value,
                    },
                  };
                });
              }}
              value={formValues.application?.method}
            />
          </div>
        </div>
        <div className="flex justify-end gap-5 px-5 pb-5">
          <button className="btn btn_text" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn_primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditJobModal;
