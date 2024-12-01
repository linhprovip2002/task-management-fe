import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { CircularProgress, TextField } from "@mui/material";
import HeadlessTippy from "@tippyjs/react/headless";
import UserItem from "../InviteWorkspace/UserItem";
import { memo, useEffect, useState } from "react";
import { useDebounce, useGetMembersByBoard, useGetUser } from "../../../Hooks";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import { useQueryClient } from "@tanstack/react-query";

import MemberItem from "./MemberItem";
import { EQueryKeys } from "../../../constants";

function BoardMemberModal({ open = false, onClose }) {
  const queryClient = useQueryClient();
  const { idBoard } = useParams();
  const handleClose = () => {
    onClose();
  };

  const [searchValue, setSearchValue] = useState("");
  const [members, setMembers] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const debounceValue = useDebounce(searchValue, 500);

  const handleRemoveSuccess = (idUser) => {
    setMembers((prev) => {
      let newState = [...prev];
      newState = newState.filter((user) => user.id !== idUser);
      return newState;
    });
  };

  const handleAddSuccess = (userData) => {
    let newMember = { ...userData };
    delete newMember.isExisted;
    newMember.role = {
      id: 3,
      name: "member",
    };
    queryClient.invalidateQueries({
      queryKey: [EQueryKeys.GET_MEMBER_BY_BOARD],
    });
    setSearchValue("");
    setSearchResult([]);
    setMembers((prev) => [...prev, newMember]);
  };

  const { userList, isLoading: isLoadingUsers } = useGetUser({
    search: debounceValue,
    limit: 20,
    page: 1,
  });

  useEffect(() => {
    if (!userList || !debounceValue) return;
    const users = userList.data.map((user) => {
      user.isExisted = members.find((item) => item.id === user.id) ? true : false;
      return user;
    });
    setSearchResult(users);
    // eslint-disable-next-line
  }, [userList, debounceValue]);
  useEffect(() => {
    if (!debounceValue.trim()) setSearchResult([]);
    // eslint-disable-next-line
  }, [debounceValue]);

  const { data: boardMembers, isLoading: isLoadingBoardMembers } = useGetMembersByBoard(idBoard);

  useEffect(() => {
    const members = boardMembers
      .filter((item) => item.user !== null)
      .map((item) => {
        item.user.role = item.role;
        return item.user;
      });
    setMembers(members);
    // eslint-disable-next-line
  }, [boardMembers]);
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          height: "100%",
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle width={"600px"} sx={{ textAlign: "center", color: "#172b4d" }}>
        Members on board
        <button
          onClick={handleClose}
          className="float-right rounded-full w-9 h-9 flex items-center justify-center hover:bg-slate-100"
        >
          <CloseIcon />
        </button>
      </DialogTitle>
      <div className="flex flex-col relative">
        <div className="mb-2 px-3 h-full">
          <HeadlessTippy
            zIndex={999}
            placement="bottom"
            offset={[0, 0]}
            visible={!!searchResult.length}
            interactive
            render={() => (
              <div className="shadow-lg border border-solid border-slate-200 rounded-md bg-white w-[580px] p-2 mt-2 z-10 h-fit">
                {searchResult.map((item) => (
                  <UserItem onAdded={handleAddSuccess} data={item} key={item.id} />
                ))}
                {!searchResult.length && <div className="text-black">No Result</div>}
              </div>
            )}
          >
            <TextField
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Email address or name"
              size="small"
              className="w-full"
            />
          </HeadlessTippy>
          {(isLoadingUsers || isLoadingBoardMembers) && searchResult.length ? (
            <div className="flex justify-center mt-4 h-[800px]">
              <CircularProgress />
            </div>
          ) : null}
        </div>
        <div className="absolute w-full top-10 px-2">
          {members.map((item, index) => (
            <MemberItem onDeleted={handleRemoveSuccess} key={index} data={item} />
          ))}
        </div>
      </div>
    </Dialog>
  );
}

BoardMemberModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(BoardMemberModal);
