import React from "react";
import { Button, TextField } from "@mui/material";
import { ChromePicker } from "react-color";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const colors = useSelector((state) => state.customPalette);

  const addNewColor = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(addNewColor)} noValidate>
        <Controller
          name="currentColor"
          control={control}
          defaultValue="#9C27B0"
          rules={{
            validate: {
              isColorUnique: (value) =>
                colors.every(
                  (color) => color.color.toLowerCase() !== value.toLowerCase()
                ) || "Color Not Unique",
            },
          }}
          render={({ field }) => (
            <ChromePicker
              color={field.value}
              onChange={(color) => field.onChange(color.hex)}
            />
          )}
        />
        <TextField
          {...register("currentColorName", {
            required: "Color Name is Required",
            validate: {
              isColorNameUnique: (value) =>
                colors.every(
                  (color) => color.name.toLowerCase() !== value.toLowerCase()
                ) || "Color Not Name Unique",
            },
          })}
          variant="filled"
          label="Enter color name"
          error={
            Boolean(errors.currentColor) || Boolean(errors.currentColorName)
          }
          helperText={
            errors.currentColor?.message || errors.currentColorName?.message
          }
        />
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
