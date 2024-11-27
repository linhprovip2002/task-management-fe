import { useQuery } from "@tanstack/react-query";
import { EQueryKeys } from "../constants";
import { getComment } from "../Services/API/ApiComment";
import { getCardById } from "../Services/API/ApiCard";

export const useGetCardComments = (boardId, cardId) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_CARD_COMMENT, boardId, cardId],
    queryFn: () => getComment(boardId, cardId),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!boardId && !!cardId,
    },
  });

  return { cardComments: data?.data, isLoading, isError, refetch };
};
export const useGetCardById = (boardId, cardId) => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [EQueryKeys.GET_CARD_BY_ID, cardId],
    queryFn: () => getCardById(boardId, cardId),
    ...{
      refetchOnWindowFocus: false,
      enabled: !!boardId && !!cardId,
    },
  });

  return { data: data?.data, isLoading, isError, refetch };
};
