import React, { useCallback, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import { useListBoardContext } from "../../Pages/ListBoard/ListBoardContext";
import ItemMember from "./ItemMember";
import { RemoveUserToCard } from "../../Services/API/ApiCard";
import ClickAway from "../BoardCard/ClickAway";
import { useGetCardById } from "../../Hooks";

const MemberMenu = ({ onAddMember, membersInCard, setMembersInCard, handleCloseShowMenuBtnCard }) => {
  const { position, membersBoard } = useListBoardContext();
  const [inputTitle, setInputTitle] = useState("");
  const [filteredMembersBoard, setFilteredMembersBoard] = useState([]);

  const cardId = localStorage.getItem("cardId");
  const { data: dataCard } = useGetCardById(cardId);

  const HandleAddMemberInCard = (item) => {
    if (handleCloseShowMenuBtnCard) {
      handleCloseShowMenuBtnCard();
      onAddMember(item);
    }
  };
  const handleChange = (e) => {
    setInputTitle(e.target.value);
  };

  const HandleRemoveMember = useCallback(
    async (member) => {
      try {
        const res = await RemoveUserToCard(dataCard?.id, member?.user.id);
        res && setMembersInCard((prev) => prev.filter((p) => p?.user?.id !== member?.user?.id));
      } catch (error) {
        console.error("error handle remove member in card", error);
      }
    },
    //eslint-disable-next-line
    [dataCard, membersInCard, setMembersInCard],
  );

  useEffect(() => {
    const membersOutCard = membersBoard.filter((boardMember) => {
      return !membersInCard.some((cardMember) => cardMember?.user?.id === boardMember?.user?.id);
    });

    const filtered = membersOutCard.filter((member) => {
      return member?.user?.name && member?.user?.name.includes(inputTitle);
    });
    setFilteredMembersBoard(filtered);
  }, [inputTitle, membersBoard, membersInCard]);

  const handleClickAway = () => {
    console.log("close btn card");
    handleCloseShowMenuBtnCard();
  };

  return (
    <ClickAway onClickAway={handleClickAway}>
      <div
        style={{ top: position?.top - 200, left: position?.left }}
        className="absolute w-[250px] bg-white rounded-[8px] py-2 font-medium text-[12px] z-[300] shadow-[0_3px_10px_rgba(0,0,0,0.3)]"
      >
        <div className="text-center p-2 mx-8">Member</div>
        <div
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#fff6 #00000026",
            overflowY: "auto",
            maxHeight: "400px",
          }}
          className="px-2"
        >
          <div className="mx-1 border-2 border-gray-500 rounded-lg">
            <input
              type="text"
              value={inputTitle}
              onChange={handleChange}
              placeholder="Search for members"
              className="w-full bg-white rounded-lg text-base font-[200] px-2 py-1 cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mt-2">
            {membersInCard?.length === 0 || (
              <>
                <div className="py-2 bg-white">Member of the card</div>
                {membersInCard?.map((item, index) => (
                  <ItemMember key={index} item={item} isClose={true} onClose={HandleRemoveMember} />
                ))}
              </>
            )}
          </div>
          <div className="mt-2">
            {filteredMembersBoard?.length === 0 ? (
              <div className="py-2 bg-white">No members found in the board</div>
            ) : (
              <>
                <div className="py-2 bg-white">Members of the board</div>
                {filteredMembersBoard?.map((item, index) => (
                  <ItemMember key={index} item={item} onHandleAddMember={HandleAddMemberInCard} />
                ))}
              </>
            )}
          </div>
          <CloseIcon
            onClick={handleCloseShowMenuBtnCard}
            className="cursor-pointer absolute right-3 top-3 p-1 rounded-[4px] hover:bg-gray-100 "
          />
        </div>
      </div>
    </ClickAway>
  );
};

export default MemberMenu;
