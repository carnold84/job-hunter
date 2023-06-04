import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Modal from "../../components/Modal";
import useDeleteJob from "../../hooks/useDeleteJob";
import useJob from "../../hooks/useJob";

const ConfirmDeleteModal = () => {
  const [searchParams] = useSearchParams();
  const modals = searchParams.get("modals");
  const [id, setId] = useState(searchParams.get("id"));
  const navigate = useNavigate();
  const job = useJob(id);
  const { deleteJob } = useDeleteJob();

  useEffect(() => {
    const nextId = searchParams.get("id");

    if (nextId !== null) {
      setId(nextId);
    }
  }, [searchParams]);

  const onClose = () => {
    navigate(-1);
  };

  const onConfirm = async () => {
    if (id) {
      const response = await deleteJob(id);

      if (response.status === "success") {
        onClose();
      }
    }
  };

  return (
    <Modal
      onClose={onClose}
      show={modals?.includes("delete") === true}
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
