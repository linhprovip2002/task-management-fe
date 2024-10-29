import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import { blue } from "@mui/material/colors";
import { TextField } from "@mui/material";
import HeadlessTippy from "@tippyjs/react/headless";
import UserItem from "../InviteWorkspace/UserItem";
import { useEffect, useState } from "react";
import { getAllMembersByIdBoard } from "../../../Services/API/ApiBoard/apiBoard";
import { useDebounce } from "../../../Hooks";
import { userServices } from "../../../Services";

export default function BoardMemberModal({ open = false, onClose }) {
  const handleClose = () => {
    onClose();
  };

  const [searchValue, setSearchValue] = useState("");
  const [members, setMembers] = useState([]);

  const debounceValue = useDebounce(searchValue, 500);
  const [searchResult, setSearchResult] = useState([]);

  const handleAddUser = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      // setloading(true);
      userServices
        .searchUser(debounceValue)
        .then((res) => res.data)
        .then((data) => {
          setSearchResult(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // setloading(false);
    };
    fetchApi();
  }, [debounceValue]);

  useEffect(() => {
    getAllMembersByIdBoard(151)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        const members = data.map((item) => item.user);
        setMembers(members);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          height: "100%",
        },
      }}
    >
      <DialogTitle width={"600px"}>Members on board</DialogTitle>
      <List sx={{ pt: 0 }}>
        {members.map((item, index) => (
          <ListItem disableGutters key={index}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.email} />
              <div>Delete</div>
            </ListItemButton>
          </ListItem>
        ))}

        <div className="px-3">
          <div className="mb-2 ">
            <HeadlessTippy
              zIndex={999}
              placement="bottom"
              offset={[0, 0]}
              visible={searchResult.length > 0}
              interactive
              render={(props) => (
                <div className="bg-white w-[600px] p-5">
                  <div className="shadow-lg border border-solid border-slate-200 rounded-md p-5">
                    {searchResult.map((item) => (
                      <UserItem onClick={handleAddUser} data={item} key={item?.id} />
                    ))}
                  </div>
                </div>
              )}
            >
              <TextField
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Email address or name"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    paddingY: "8px",
                    paddingX: "12px",
                    fontSize: "14px",
                    fontWeight: 400,
                  },
                }}
              />
            </HeadlessTippy>
          </div>
        </div>
      </List>
    </Dialog>
  );
}
