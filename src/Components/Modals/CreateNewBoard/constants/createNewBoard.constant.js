export const customStyleNewBoard =
  "w-10 h-8 border rounded-md flex items-center justify-center gap-x-1 hover:ring-2 cursor-pointer";

export const customBgImg =
  "w-16 h-12 border rounded-md flex items-center justify-center gap-x-1 hover:ring-2 cursor-pointer";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper"
};

// export const colorData = ['yellow', 'orange', 'pink', 'purple', 'green', 'gray'];

export const colorData = [
  { name: "red", class: "bg-red-500" },
  { name: "blue", class: "bg-blue-500" },
  { name: "green", class: "bg-green-500" },
  { name: "yellow", class: "bg-yellow-500" },
  { name: "purple", class: "bg-purple-500" },
  { name: "gray", class: "bg-gray-500" }
];

export const listBgImage = [
  {
    name: "anh1",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-22.jpg"
  },
  {
    name: "anh2",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-23.jpg"
  },
  {
    name: "anh3",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-24.jpg"
  },
  {
    name: "anh4",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-25.jpg"
  },
  {
    name: "anh5",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-26.jpg"
  },
  {
    name: "anh6",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-35.jpg"
  },
  {
    name: "anh7",
    image:
      "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/07/anh-thien-nhien-dep-3d-36.jpg"
  }
];

export const listRuleOptions = [
  { label: "Private", value: "isPrivate" },
  { label: "Favorite", value: "isFavorite" },
  { label: "Archived", value: "isArchived" }
];

export const defaultBoardValues = {
  title: "",
  workspaceId: null,
  visibility: "",
  backgroundColor: "",
  coverUrl: "",
  isPrivate: false,
  isFavorite: false,
  isArchived: false
};
