import { Avatar, Button, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStorage } from "../../../../Contexts";
import { useState } from "react";
import { RemoveMemberModal } from "../../../../Components/Modals/RemoveMemberModal";

export const MemberCard = ({ member }) => {
  const { userData } = useStorage();

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <div className="ml-8 flex flex-col gap-2">
        <div
          key={member.id}
          className="flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <Avatar
              src={member.avatarUrl}
              alt={member.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-bold">{member.name}</div>
              <div>{member.email}</div>
            </div>
          </div>
          <div className="w-24">
            {userData.id !== member.id && (
              <Button
                variant="outlined"
                size="small"
                fullWidth={true}
                onClick={() => setIsOpenModal(true)}
                startIcon={<CloseIcon />}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
        <Divider />
      </div>
      <RemoveMemberModal
        open={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        member={member}
      />
    </>
  );
};
