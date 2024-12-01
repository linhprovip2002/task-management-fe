import { useQuery } from "@tanstack/react-query";
import { EQueryKeys } from "../constants";
import {
  getBoardPermission,
  getBoardRole,
} from "../Services/API/apiBoardPermission";
import { useListBoardContext } from "../Pages/ListBoard/ListBoardContext";
import { useParams } from "react-router-dom";

export const useGetBoardPermission = (boardRoleId) => {
  const boardContext = useListBoardContext();
  const isOwner = boardContext?.isOwner || false;
  const roleId = boardRoleId || boardContext?.dataBoard?.role.roleId;

  const { idBoard } = useParams();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_BOARD_PERMISSION, idBoard, roleId],
    queryFn: () => getBoardPermission(idBoard, roleId),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!idBoard && !!roleId,
    },
  });

  const getBoardPermissionByUser = (item) => {
    if (isOwner) return true;
    const moduleName = "board";
    return data?.find(
      (el) => el.moduleName === moduleName && el.actionName === item,
    );
  };

  const getCardPermissionByUser = (item) => {
    if (isOwner) return true;
    if (!getBoardPermissionByUser("update")) return false;
    const moduleName = "card";
    return data?.find(
      (el) => el.moduleName === moduleName && el.actionName === item,
    )?.isGranted;
  };

  const getCommentPermissionByUser = (item) => {
    if (isOwner) return true;
    if (!getBoardPermissionByUser("update")) return false;

    const moduleName = "comment";
    return data?.find(
      (el) => el.moduleName === moduleName && el.actionName === item,
    )?.isGranted;
  };

  const getTagPermissionByUser = (item) => {
    if (isOwner) return true;
    if (!getBoardPermissionByUser("update")) return false;
    const moduleName = "tag";
    return data?.find(
      (el) => el.moduleName === moduleName && el.actionName === item,
    )?.isGranted;
  };

  return {
    dataBoardPermission: data,
    isLoading,
    isError,
    refetch,
    getBoardPermissionByUser,
    getCardPermissionByUser,
    getCommentPermissionByUser,
    getTagPermissionByUser,
    isOwner,
  };
};

export const useGetBoardRole = (boardId) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_BOARD_ROLE, boardId],
    queryFn: () => getBoardRole(boardId),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!boardId,
    },
  });

  return { dataBoardRole: data, isLoading, isError, refetch };
};
