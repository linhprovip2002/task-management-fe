import { Button, Slide, TextField } from "@mui/material";
import ItemList from "../../ItemList";

function ArchivedItem() {
  return (
    <div>
      <ItemList
        isArchived
        dataCard={{
          id: 1,
          title: "Card",
        }}
      />

      <div className="flex gap-3 font-semibold text-[var(--dark-slate-blue)]">
        <span className="hover:text-[var(--primary)] cursor-pointer hover:underline">Send to board</span>
        <span className="hover:text-[var(--primary)] cursor-pointer hover:underline">Delete</span>
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
