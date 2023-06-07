import { Link } from "react-router-dom";

import emptyImage from "../../assets/empty.svg";
import ErrorScreen from "../../components/ErrorScreen";
import LoadingScreen from "../../components/LoadingScreen";
import useJobs from "../../hooks/useJobs";
import formatDate from "../../utils/formatDate";
import toSentenceCase from "../../utils/toSentenceCase";

const HomePage = () => {
  const { error, isLoading, jobs } = useJobs();

  return (
    <>
      {isLoading && <LoadingScreen />}
      {error && <ErrorScreen>{error}</ErrorScreen>}
      {!isLoading && !error && jobs && (
        <div className="flex grow flex-col p-10">
          <header className="flex items-center justify-between">
            <h2 className="text-3xl font-normal">Jobs</h2>
            <Link className="btn btn_primary" to={"?modals=job&action=create"}>
              Add a job
            </Link>
          </header>
          {jobs.length === 0 ? (
            <div className="flex w-full grow flex-col items-center justify-center gap-5">
              <img alt="" src={emptyImage} />
              <h2 className="text-xl">You haven't added any jobs yet</h2>
              <Link className="btn btn_primary" to="?modals=job&action=new">
                Add one!
              </Link>
            </div>
          ) : (
            <div className="grid w-full gap-2 p-10">
              {jobs.map(
                ({ createdAt, id, location, poster, status, title }) => {
                  return (
                    <div
                      className="grid grid-cols-12 items-center border border-gray-200 bg-gray-50 hover:bg-white"
                      key={id}
                    >
                      <Link
                        className="col-span-11 grid grid-cols-11 items-center p-5"
                        to={`/jobs/${id}`}
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
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
