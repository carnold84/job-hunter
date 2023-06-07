import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";

import useJob from "../../hooks/useJob";
import ToastManager from "../../managers/ToastManager";
import ConfirmDeleteModal from "../../modals/ConfirmDeleteModal";
import EditJobModal from "../../modals/EditJobModal";

const Root = () => {
  const [searchParams] = useSearchParams();
  const modals = searchParams.get("modals");
  const showJobModal = modals?.includes("job") === true;
  const id = searchParams.get("id");
  const { job } = useJob(id ?? undefined);
  const [selectedJob, setSelectedJob] = useState(job);

  useEffect(() => {
    if (job !== null) {
      setSelectedJob(job);
    }
  }, [job]);

  const onCloseEnd = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-gray-100">
        <header className="fixed top-0 z-10 flex h-14 w-full items-center justify-between bg-white">
          <h1 className="ml-5 text-2xl">Job Hunter</h1>
        </header>
        <main className="relative flex grow flex-col pt-14">
          <Outlet />
        </main>
      </div>
      <EditJobModal
        job={selectedJob}
        onCloseEnd={onCloseEnd}
        show={showJobModal}
      />
      <ConfirmDeleteModal
        job={selectedJob}
        onCloseEnd={onCloseEnd}
        show={modals?.includes("delete") === true}
      />
      <ToastManager />
    </>
  );
};

export default Root;
