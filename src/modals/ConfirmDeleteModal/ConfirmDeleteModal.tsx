import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modal";
import useDeleteJob from "../../hooks/useDeleteJob";
import { Job } from "../../types";

interface Props {
  job: Job | null;
  onCloseEnd?: () => void;
  show: boolean;
}

const ConfirmDeleteModal = ({ job, onCloseEnd, show }: Props) => {
  const navigate = useNavigate();
  const { deleteJob } = useDeleteJob();

  const onClose = () => {
    navigate(-1);
  };

  const onConfirm = async () => {
    if (job) {
      const response = await deleteJob(job.id);

      if (response.status === "success") {
        onClose();
      }
    }
  };

  return (
    <Modal
      onClose={onClose}
      onCloseEnd={onCloseEnd}
      show={show}
      title={`Delete ${job?.title}?`}
      width="sm"
    >
      <p className="px-8">Are you sure you want to delete {job?.title}?</p>
      <div className="flex justify-end gap-5 p-5">
        <button className="btn btn_text" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn_primary" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
