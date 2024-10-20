import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-200 bg-opacity-50 flex items-center justify-center">
      <CircularProgress />
    </div>
  );
}
