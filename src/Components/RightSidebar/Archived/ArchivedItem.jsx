import { Button, CircularProgress } from "@mui/material";
import ItemList from "../../ItemList";
import HeadlessTippy from "@tippyjs/react/headless";
import { Close } from "@mui/icons-material";
import { memo, useState } from "react";
import { toast } from "react-toastify";
import { destroyCard, resendCard } from "../../../Services/API/ApiCard";
import { useListBoardContext } from "../../../Pages/ListBoard/ListBoardContext";
import { findColById } from "../../../Utils/dragDrop";
import { insertAtIndex } from "../../../Utils/array";
import { useParams } from "react-router-dom";

function ArchivedItem({ data, onDeleted, onResend }) {
  const [popperDelete, setPopperDelete] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { setDataList } = useListBoardContext();
  const { idBoard } = useParams();
  const handleDeleteCard = () => {
    setIsFetching(true);

    destroyCard(data.id)
      .then((res) => {
        toast.success("Delete card successfully");
        if (onDeleted) onDeleted(data.id);
      })
      .catch((err) => {
        toast.error("Delete card unsuccessfully");
      })
      .finally(() => {
        setIsFetching(false);
        setPopperDelete(false);
      });
  };

  const handleResend = () => {
    resendCard(data.id, idBoard)
      .then((res) => {
        setDataList((prev) => {
          const newState = [...prev];
          const colIndex = findColById(newState, data.listId);
          newState[colIndex].cards = insertAtIndex(newState[colIndex].cards, data.position, data);
          return newState;
        });
        if (onResend) onResend(data);
        toast.success("Resend to board successfully");
      })
      .catch((err) => {
        toast.error("Resend to board unsuccessfully");
      });
  };

  return (
    <div className="mb-3">
      <ItemList
        id={data.id}
        isAttachment
        isArchived
        dataCard={
          data || {
            id: 1,
            title: "Card",
          }
        }
      />

      <div className="flex gap-3 font-semibold text-[var(--dark-slate-blue)]">
        <span onClick={handleResend} className="hover:text-[var(--primary)] cursor-pointer hover:underline">
          Send to board
        </span>
        <HeadlessTippy
          onClickOutside={() => setPopperDelete(false)}
          visible={popperDelete}
          interactive
          placement="bottom"
          offset={[20, 0]}
          render={() => (
            <div style={{ boxShadow: "var(--ds-shadow-overlay)" }} className="w-[304px] bg-white rounded-md mt-2">
              <div className="flex items-center py-1 px-2 ">
                <h2 className="flex-1 text-center text-sm text-[#44546f] font-semibold">Delete card?</h2>
                <button
                  onClick={() => setPopperDelete(false)}
                  className="w-8 h-8 text-[#44546f] rounded-md hover:bg-[var(--hover-background)]"
                >
                  <Close />
                </button>
              </div>

              <div className="px-3 pb-3 flex flex-col">
                <div className="text-[#44546f] font-semibold text-xs">
                  All actions will be removed from the activity feed and you won’t be able to re-open the card. There is
                  no undo.
                </div>

                <Button
                  startIcon={isFetching && <CircularProgress size={20} color="#fff" />}
                  onClick={handleDeleteCard}
                  variant="contained"
                  color="error"
                  sx={{ textTransform: "none", marginTop: "8px" }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        >
          <span
            onClick={() => setPopperDelete(true)}
            className="hover:text-[var(--primary)] cursor-pointer hover:underline"
          >
            Delete
          </span>
        </HeadlessTippy>
      </div>
    </div>
  );
}

export default memo(ArchivedItem);
