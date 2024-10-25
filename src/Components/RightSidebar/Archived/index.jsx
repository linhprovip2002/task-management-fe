import { Button, Slide, TextField } from "@mui/material";
import ItemList from "../../ItemList";
import HeadlessTippy from "@tippyjs/react/headless";
import { Close } from "@mui/icons-material";
import { useState } from "react";

function ArchivedItem() {
  const [popperDelete, setPopperDelete] = useState(false);
  const handleDeleteCard = () => {
    console.log("delete");
  };
  return (
    <div>
      <ItemList
        isAttachment
        isDescriptionIcon
        isArchived
        dataCard={{
          id: 1,
          title: "Card",
        }}
      />

      <div className="flex gap-3 font-semibold text-[var(--dark-slate-blue)]">
        <span className="hover:text-[var(--primary)] cursor-pointer hover:underline">Send to board</span>
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

export default function Archived() {
  return (
    <Slide in={true} direction="left">
      <div>
        <div className="flex items-center justify-between h-8">
          <div>
            <TextField
              sx={{
                height: "100%",
                "& .MuiInputBase-input": {
                  paddingY: "6px",
                  paddingLeft: "12px",
                  paddingRight: "18px",
                  fontSize: "14px",
                },
              }}
              placeholder="Search archive..."
            />
          </div>
          <Button
            variant="contained"
            sx={{
              fontSize: 14,
              textTransform: "none",
              bgcolor: "#091E420F",
              color: "var(--text-color)",
              height: 32,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#091E4224", // Màu nền khi hover
                boxShadow: "none",
              },
            }}
          >
            Switch to list
          </Button>
        </div>
        <div className="mt-3">
          <div className="py-6 px-3 text-sm flex items-center justify-center rounded-lg bg-[#091E420F]">
            <span>No result</span>
          </div>
        </div>
        <div className="flex flex-col">
          <ArchivedItem />
        </div>
      </div>
    </Slide>
  );
}
