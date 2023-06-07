import { Link, useParams } from "react-router-dom";

import ErrorScreen from "../../components/ErrorScreen";
import LoadingScreen from "../../components/LoadingScreen";
import Select, { SelectOption } from "../../components/Select";
import useJob from "../../hooks/useJob";

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

const onStatusChange = (value: SelectOption) => {
  console.log(value);
};

const onApplicationStatusChange = (value: SelectOption) => {
  console.log(value);
};

const JobPage = () => {
  const { id } = useParams();
  const { error, isLoading, job } = useJob(id);

  return (
    <>
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen>{error}</ErrorScreen>}
      {!isLoading && job && (
        <div className="flex w-full justify-center">
          <div className="w-full max-w-3xl p-10">
            <header className="mb-10 flex items-center justify-between">
              <h2 className="text-4xl">{job.title}</h2>
              <Link className="btn" to={`?modals=job&id=${job.id}`}>
                Edit
              </Link>
            </header>
            <div className="grid grid-cols-12">
              <div className="col-span-7 flex flex-col gap-3">
                <h3 className="text-xl">Details</h3>
                <div className="flex gap-5">
                  <h4 className="w-20 text-gray-500">Poster</h4>
                  <h3 className="text-gray-800">{job.poster}</h3>
                </div>
                <div className="flex gap-5">
                  <h4 className="w-20 text-gray-500">Location</h4>
                  <h3 className="text-gray-800">{job.location}</h3>
                </div>
                <div className="flex items-center gap-5">
                  <h4 className="w-20 text-gray-500">Status</h4>
                  <Select
                    onChange={onStatusChange}
                    options={statusOptions}
                    value={statusOptions[0]}
                  />
                </div>
                <div className="flex gap-5">
                  <h4 className="w-20 text-gray-500">Url</h4>
                  <h3 className="text-gray-800">{job.url}</h3>
                </div>
                <div className="flex gap-5">
                  <h4 className="w-20 text-gray-500">Notes</h4>
                  <h3 className="text-gray-800">{job.notes}</h3>
                </div>
              </div>
              <div className="col-span-5 border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-5 text-xl">Application</h3>
                <div className="flex items-center gap-5">
                  <h4 className="w-20 text-gray-500">Status</h4>
                  <Select
                    onChange={onApplicationStatusChange}
                    options={applicationStatusOptions}
                    value={applicationStatusOptions[0]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobPage;
