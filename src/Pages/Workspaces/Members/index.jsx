import { BoardInformation } from "../../../Components/BoardInformation/BoardInformation";
import { Button, Divider } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

const WorkspaceMembers = () => {
  return (
    <div className="flex flex-col gap-4">
      <BoardInformation isMemberPage />
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="text-xl font-bold">
          Workspace members <span className="px-3 py-1 text-base rounded-full bg-slate-200">1/10</span>
        </div>
        <div>
          Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.
        </div>
        <Divider />
        <div className="flex items-center justify-between">
          <div className="w-2/3">
            <div className="mb-4 text-xl font-bold">Invite members to join you</div>
            <div>
              Anyone with an invite link can join this free Workspace. You can also disable and create a new invite link
              for this Workspace at any time. Pending invitations count toward the 10 collaborator limit.
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outlined" startIcon={<LinkIcon />}>
              Disable invite link
            </Button>
            <Button variant="contained" startIcon={<LinkIcon />}>
              Invite with link
            </Button>
          </div>
        </div>
        <Divider />
        <div></div>
      </div>
    </div>
  );
};

export default WorkspaceMembers;
