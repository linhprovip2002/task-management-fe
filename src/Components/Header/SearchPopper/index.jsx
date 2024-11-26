import React from "react";
import SearchItem from "./SearchItem";
import "./SearchPopper.css";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

export default function SearchPopper({ loading = false, searchResult }) {
  return (
    <div className="w-[780px] pt-2 searchPopper_wrapper flex flex-col">
      <h2 className="uppercase text-[11px] mb-2 px-4 text-[var(--light-gray)] font-semibold">Recent boards</h2>
      {loading && (
        <div className="flex justify-center mb-2">
          <CircularProgress size={20} />
        </div>
      )}
      <div className="flex flex-col pb-2">
        {searchResult.boards?.map((item, index) => (
          <SearchItem key={index} title={item.title} desc={item.workspace.title} coverUrl={item.coverUrl} />
        ))}
      </div>
      <div className="py-1 flex justify-center h-10 items-center bg-[#091E420F]">
        <div className="text-sm hover:underline text-[var(--dark-slate-blue)] cursor-pointer font-semibold">
          Help us improve your search results!
        </div>
      </div>
    </div>
  );
}

SearchPopper.propTypes = {
  loading: PropTypes.bool,
  searchResult: PropTypes.object.isRequired,
};
