import { Modal } from "@mui/material";
import { CenterModel } from "../styles";

export const CreateNewRoleModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
      }}
    >
      <form className={`w-1/2 flex p-4 rounded-md bg-white ${CenterModel}`}>
        <div>Create new role</div>
      </form>
    </Modal>
  );
};
