import {
  PersonAddAlt as PersonAddAltIcon,
  Person4Outlined as Person4OutlinedIcon,
  Label as LabelIcon,
  CheckBoxOutlined as CheckBoxOutlinedIcon,
  AccessTimeOutlined as AccessTimeOutlinedIcon,
  AttachmentOutlined as AttachmentOutlinedIcon,
  InsertPhoto as InsertPhotoIcon,
  BackupTableOutlined as BackupTableOutlinedIcon,
} from "@mui/icons-material";

export const listBtnCard = [
  {
    id: 1,
    nameBtn: "Join",
    Icon: <PersonAddAltIcon className="ml-1 mr-2" fontSize="small" />,
  },
  {
    id: 2,
    nameBtn: "Member",
    Icon: <Person4OutlinedIcon className="ml-1 mr-2" fontSize="small" />,
  },
  {
    id: 3,
    nameBtn: "Label",
    Icon: <LabelIcon className="ml-1 mr-2" fontSize="small" />,
  },
  {
    id: 4,
    nameBtn: "What to do",
    Icon: <CheckBoxOutlinedIcon className="ml-1 mr-2" fontSize="small" />,
  },
  {
    id: 5,
    nameBtn: "Day",
    Icon: <AccessTimeOutlinedIcon className="ml-1 mr-2" fontSize="small" />,
  },
  {
    id: 6,
    nameBtn: "Attached",
    Icon: <AttachmentOutlinedIcon className="ml-1 mr-2" fontSize="small" />,
  },
  {
    id: 7,
    nameBtn: "Cover photo",
    Icon: <InsertPhotoIcon className="ml-1 mr-2" fontSize="small" />,
  },
  {
    id: 12,
    nameBtn: "Archive",
    Icon: <BackupTableOutlinedIcon className="ml-1 mr-2" fontSize="small" />,
  },
];
export const listLabelAdd = [
  {
    id: 2,
    title: "Back End",
    color: "bg-yellow-300",
  },
  {
    id: 3,
    title: "Front End",
    color: "bg-orange-300",
  },
  {
    id: 4,
    title: "",
    color: "bg-red-300",
  },
];

export const itemChooseCopyCard = [
  {
    id: 0,
    title: "Information Board",
    isShow: false,
  },
  {
    id: 2,
    title: "List",
    isShow: false,
  },
  {
    id: 3,
    title: "Location",
    isShow: false,
  },
];
