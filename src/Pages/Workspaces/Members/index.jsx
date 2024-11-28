import { BoardInformation } from "../../../Components/BoardInformation/BoardInformation";
import { Divider } from "@mui/material";
import { useGetWorkspaceById, useGetWorkspaceMember } from "../../../Hooks";
import { useParams } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { MemberCard } from "./components/MemberCard";
import { useEffect } from "react";

const WorkspaceMembers = () => {
  const { id } = useParams();
  const { workspaceMembers, isLoading, isRefetching } = useGetWorkspaceMember(id);
  const { workspaceDetails } = useGetWorkspaceById(id);
  useEffect(() => {
    document.title = "Members | Kanban";
    return () => {
      document.title = "Kanban";
    };
  }, []);

  if (isLoading || isRefetching || !workspaceMembers) return <Loading />;
  const isOwner = workspaceDetails.isOwner;

  return (
    <div className="flex flex-col gap-4">
      <BoardInformation isMemberPage />
      <Divider />
      <div className="flex flex-col gap-4">
        <div className="text-xl font-bold">Workspace members ({workspaceMembers?.length})</div>
        <div>
          Workspace members can view and join all Workspace visible boards and create new boards in the Workspace.
        </div>
        <Divider />
        <div>
          <div className="flex flex-col gap-4">
            {workspaceMembers?.map((member) => (
              <MemberCard key={member.id} member={member} canRemove={isOwner} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceMembers;
