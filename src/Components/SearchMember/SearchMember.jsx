import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDebounce, useGetUser } from "../../Hooks";
import { useEffect } from "react";
import Loading from "../Loading";

export const SearchMember = (
  { isShowDescription, register, onChange, multiple } = {
    isShowDescription: true,
    multiple: true,
  },
) => {
  const [searchMember, setSearchMember] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  const debounceSearchMember = useDebounce(searchMember, 500);

  const { userInfo, isLoading } = useGetUser({
    name: debounceSearchMember,
  });

  useEffect(() => {
    if (userInfo?.data) setSearchOptions(userInfo.data);
    // eslint-disable-next-line
  }, [JSON.stringify(userInfo)]);

  if (!searchOptions.length && isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="font-bold">Workspace members</div>
      <Autocomplete
        {...register}
        onChange={onChange}
        multiple={multiple}
        options={searchOptions}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        filterSelectedOptions
        onInputChange={(_, newInputValue) => {
          setSearchMember(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} placeholder="Find members" />}
      />
      {isShowDescription && <div>Add members to your Workspace so they can collaborate on boards.</div>}
    </div>
  );
};
