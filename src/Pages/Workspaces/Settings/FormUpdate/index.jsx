import { joiResolver } from "@hookform/resolvers/joi";
import { Button, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import validation from "./validation";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { updateWorkspace } from "../../../../Services/API/ApiWorkSpace/apiWorkSpace";

function FormUpdate({ data = {}, onClose, onUpdateSuccess }) {
  const handleClose = (e) => {
    if (onClose) return onClose(e);
  };

  const form = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
    resolver: joiResolver(validation),
    mode: "onSubmit",
  });

  const handleSubmit = (values) => {
    const { title, description } = values;

    updateWorkspace({ id: data.id, title, description })
      .then((res) => {
        toast.success("Update workspace sucessfully");
        return onUpdateSuccess(res);
      })
      .catch((err) => {
        toast.error("Update workspace unsucessfully");
        console.error(err);
      });
  };

  return (
    <div className="w-[250px]">
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-[var(--dark-slate-blue)] text-sm mb-2 flex flex-col gap-3"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Name</label>
          <Controller
            control={form.control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <TextField
                error={Boolean(error)}
                helperText={error ? error.message : ""}
                {...field}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    paddingY: "8px",
                    paddingX: "12px",
                  },
                }}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <TextField
                error={Boolean(error)}
                {...field}
                helperText={error ? error.message : ""}
                sx={{
                  "& .MuiOutlinedInput-input": {
                    paddingY: "8px",
                    paddingX: "12px",
                  },
                }}
              />
            )}
          />
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            sx={{
              paddingX: "12px",
              paddingY: "4px",
              textTransform: "none",
            }}
            variant="contained"
          >
            Save
          </Button>
          <Button
            sx={{
              paddingX: "12px",
              paddingY: "4px",
              textTransform: "none",
            }}
            onClick={handleClose}
            variant="outlined"
          >
            Cancle
          </Button>
        </div>
      </form>
    </div>
  );
}
FormUpdate.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateSuccess: PropTypes.func,
};

export default React.memo(FormUpdate);
