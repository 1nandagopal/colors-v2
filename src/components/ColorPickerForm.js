import React from "react";
import { Button, TextField } from "@mui/material";
import { ChromePicker } from "react-color";
import { Controller, useForm } from "react-hook-form";

const temp = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColour: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colourNameInput: {
    width: "100%",
    height: "70px",
  },
};

function ColorPickerForm({ isPaletteFull }) {
  const { register, handleSubmit, watch, control } = useForm();

  const addNewColor = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(addNewColor)}>
        <Controller
          name="currentColor"
          control={control}
          defaultValue="purple"
          render={({ field }) => (
            <ChromePicker
              color={field.value}
              onChange={(color) => field.onChange(color.hex)}
            />
          )}
        />
        <TextField {...register("currentColorName")} label="Enter color name" />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isPaletteFull}
          sx={{ bgcolor: watch("currentColor") }}
        >
          Add Color
        </Button>
      </form>
    </>
  );
}

export default ColorPickerForm;
