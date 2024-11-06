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
import { Autocomplete, Button, CircularProgress, TextField } from "@mui/material";
import HeadlessTippy from "@tippyjs/react/headless";
import UserItem from "../InviteWorkspace/UserItem";
import { useEffect, useState } from "react";
import { getAllMembersByIdBoard, removeMember } from "../../../Services/API/ApiBoard/apiBoard";
import { useDebounce } from "../../../Hooks";
import { userServices } from "../../../Services";
import { useStorage } from "../../../Contexts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const options = ["Member", "Admin"];

function MemberItem({ data, onDeleted, isAdmin = true, disabelRemove = false }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { idBoard } = useParams();

  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState("");

  const handleRemoveMember = () => {
    setIsDeleting(true);
    removeMember(data.id, idBoard)
      .then((res) => {
        toast.success("Removed member");
        if (onDeleted) return onDeleted(data.id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Remove member unsuccessfully");
        setConfirmDelete(false);
      })
      .finally(() => setIsDeleting(false));
  };

  return (
    <ListItem disableGutters>
      <ListItemButton>
        <>
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={data?.email} />
          {isAdmin && (
            <>
              {confirmDelete || (
                <Autocomplete
                  disableClearable
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  options={options}
                  sx={{
                    width: 150,
                    marginRight: 2,
                    "& .MuiAutocomplete": {
                      paddingY: 0,
                    },
                    "& .MuiOutlinedInput-root": {
                      paddingY: 0,
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              )}
              {!confirmDelete ? (
                <Button
                  disabled={disabelRemove}
                  onClick={() => setConfirmDelete(true)}
                  variant="contained"
                  color="error"
                  sx={{ textTransform: "none", paddingY: 0.5 }}
                >
                  Remove
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    onClick={() => setConfirmDelete(false)}
                    variant="outlined"
                    sx={{ textTransform: "none", paddingY: 0.5 }}
                  >
                    Cancle
                  </Button>
                  <Button
                    onClick={handleRemoveMember}
                    startIcon={isDeleting && <CircularProgress size={18} color="#fff" />}
                    variant="contained"
                    color="error"
                    sx={{ textTransform: "none", paddingY: 0.5 }}
                  >
                    Confirm
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      </ListItemButton>
    </ListItem>
  );
}

export default function BoardMemberModal({ open = false, onClose }) {
  const { idBoard } = useParams();
  const handleClose = () => {
    onClose();
  };

  const [searchValue, setSearchValue] = useState("");
  const [members, setMembers] = useState([]);

  const debounceValue = useDebounce(searchValue, 500);
  const [searchResult, setSearchResult] = useState([]);
  const { userData } = useStorage();

  const [isLoading, setIsLoading] = useState(false);

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
    setMembers((prev) => [...prev, newMember]);
  };

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setIsLoading(true);
      userServices
        .searchUser(debounceValue)
        .then((res) => res.data)
        .then((data) => {
          const users = data.data.map((user) => {
            user.isExisted = members.find((item) => item.id === user.id) ? true : false;
            return user;
          });
          setSearchResult(users);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchApi();
    // eslint-disable-next-line
  }, [debounceValue]);

  useEffect(() => {
    getAllMembersByIdBoard(idBoard)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        let members = data.map((item) => {
          item.user.role = item.role;
          return item.user;
        });
        // members = members.filter((member) => member.id !== userData?.id);
        setMembers(members);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
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
        {members.map((item, index) => {
          const disable = item.id === userData.id;

          return <MemberItem disabelRemove={disable} onDeleted={handleRemoveSuccess} key={index} data={item} />;
        })}

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
                    {searchResult.map((item, index) => (
                      <UserItem onAdded={handleAddSuccess} data={item} key={index} />
                    ))}
                  </div>
                </div>
              )}
            >
              <div>
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
              </div>
            </HeadlessTippy>
            {isLoading && (
              <div className="w-full flex justify-center mt-4">
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </List>
    </Dialog>
  );
}
