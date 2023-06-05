import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import emptyImage from "../../assets/empty.svg";
import LoadingScreen from "../../components/LoadingScreen";
import useJob from "../../hooks/useJob";
import useJobs from "../../hooks/useJobs";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal";
import JobModal from "../../modals/JobModal";
import formatDate from "../../utils/formatDate";
import toSentenceCase from "../../utils/toSentenceCase";

const JobPage = () => {
  const [searchParams] = useSearchParams();
  const modals = searchParams.get("modals");
  const id = searchParams.get("id");
  const { isError, isLoading, jobs } = useJobs();
  const job = useJob(id);
  const [selectedJob, setSelectedJob] = useState(job);
  const showJobModal = modals?.includes("job") === true;
  const [jobModalAction, setJobModalAction] = useState<string | null>(null);

  useEffect(() => {
    if (job !== null) {
      setSelectedJob(job);
    }
  }, [job]);

  useEffect(() => {
    if (searchParams.get("action")) {
      setJobModalAction(searchParams.get("action"));
    }
  }, [searchParams]);

  const onCloseEnd = () => {
    setSelectedJob(null);
    setJobModalAction(null);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isError && (
        <div className="absolute top-0 flex h-full w-full items-center justify-center p-5">
          <p className="mb-5">
            Oops! We couldn't load your jobs. Try refreshing?
          </p>
        </div>
      )}
      {!isLoading && jobs && (
        <>
          {jobs.length === 0 ? (
            <div className="absolute top-0 flex h-full w-full grow flex-col items-center justify-center gap-5 p-5 pt-14">
              <img alt="" src={emptyImage} />
              <h2 className="text-xl">You haven't added any jobs yet</h2>
              <Link className="btn btn_primary" to="?modals=job&action=new">
                Add one!
              </Link>
            </div>
          ) : (
            <>
              {jobs.length === 0 ? (
                <div className="absolute flex h-full w-full grow flex-col items-center justify-center p-5">
                  <img alt="" src={emptyImage} />
                  <h2>You haven't added any jobs yet</h2>
                  <Link to="?modals=job&action=new">Add one!</Link>
                </div>
              ) : (
                <div className="grid w-full gap-2 p-10">
                  {jobs.map(
                    ({ createdAt, id, location, poster, status, title }) => {
                      return (
                        <div
                          className="grid grid-cols-12 items-center border border-gray-200 hover:bg-gray-50"
                          key={id}
                        >
                          <Link
                            className="col-span-11 grid grid-cols-11 items-center p-5"
                            to={`?modals=job&action=view&id=${id}`}
                          >
                            <div className="col-span-5 grid gap-0.5">
                              <h3 className="font-semibold text-gray-700">
                                {title}
                              </h3>
                              <p className="text-gray-500">{poster}</p>
                            </div>
                            <div className="col-span-2">
                              <p>{location}</p>
                            </div>
                            <div className="col-span-2">
                              {toSentenceCase(status)}
                            </div>
                            <div className="col-span-2">
                              {formatDate(createdAt)}
                            </div>
                          </Link>
                          <div className="col-span-1 flex gap-3">
                            <Link
                              className="text-gray-500 hover:text-orange-600"
                              to={`?modals=job&action=edit&id=${id}`}
                            >
                              <svg
                                color="currentcolor"
                                fill="none"
                                height="20px"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242"
                                  stroke="currentcolor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                ></path>
                              </svg>
                            </Link>
                            <Link
                              className="text-gray-500 hover:text-orange-600"
                              to={`?modals=delete&id=${id}`}
                            >
                              <svg
                                color="currentcolor"
                                fill="none"
                                height="20px"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.992 13h6"
                                  stroke="currentcolor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                ></path>
                                <path
                                  d="M3.04 4.294a.496.496 0 01.191-.479C3.927 3.32 6.314 2 12 2s8.073 1.32 8.769 1.815a.496.496 0 01.192.479l-1.7 12.744a4 4 0 01-1.98 2.944l-.32.183a10 10 0 01-9.922 0l-.32-.183a4 4 0 01-1.98-2.944l-1.7-12.744zM3 5c2.571 2.667 15.429 2.667 18 0"
                                  stroke="currentcolor"
                                  strokeWidth="2.5"
                                ></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
      <JobModal
        action={jobModalAction}
        job={selectedJob}
        onCloseEnd={onCloseEnd}
        show={showJobModal}
      />
      <ConfirmDeleteModal
        job={selectedJob}
        onCloseEnd={onCloseEnd}
        show={modals?.includes("delete") === true}
      />
    </>
  );
};

export default JobPage;
