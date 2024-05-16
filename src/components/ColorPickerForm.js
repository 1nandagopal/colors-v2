import React from "react";
import { Button, TextField } from "@mui/material";
import { ChromePicker } from "react-color";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledChromePicker = styled(ChromePicker)({
  width: "100% !important",
  marginTop: "2rem",
  marginBottom: "1rem",
});

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
            <StyledChromePicker
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
          fullWidth
          sx={{ height: "85px" }}
        />
        <Button
          variant="contained"
          color="success"
          type="submit"
          disabled={isPaletteFull}
          size="large"
          fullWidth
          sx={{
            background: watch("currentColor") || "#9C27B0",
          }}
        >
          Add Color
        </Button>
      </form>
    </>
  );
}

export default ColorPickerForm;
