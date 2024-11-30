import { useQuery } from "@tanstack/react-query";
import { EQueryKeys } from "../constants";
import {
  getBoardPermission,
  getBoardRole,
} from "../Services/API/apiBoardPermission";
import { useListBoardContext } from "../Pages/ListBoard/ListBoardContext";
import { useParams } from "react-router-dom";

export const useGetBoardPermission = () => {
  const { isOwner } = useListBoardContext();
  const { idBoard } = useParams();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_BOARD_PERMISSION, idBoard],
    queryFn: () => getBoardPermission(idBoard),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!idBoard,
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
    const moduleName = "card";
    return data?.find(
      (el) => el.moduleName === moduleName && el.actionName === item,
    )?.isGranted;
  };

  const getCommentPermissionByUser = (item) => {
    if (isOwner) return true;
    const moduleName = "comment";
    return data?.find(
      (el) => el.moduleName === moduleName && el.actionName === item,
    )?.isGranted;
  };

  const getTagPermissionByUser = (item) => {
    if (isOwner) return true;
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
