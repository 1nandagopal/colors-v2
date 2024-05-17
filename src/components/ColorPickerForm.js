import React from "react";
import { Button, TextField } from "@mui/material";
import { ChromePicker } from "react-color";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addColor } from "../store";

const StyledChromePicker = styled(ChromePicker)({
  width: "100% !important",
  marginTop: "1.5rem",
  marginBottom: "1rem",
});

function ColorPickerForm({ isPaletteFull }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm();

  const colors = useSelector((state) => state.customPalette);
  const dispatch = useDispatch();

  const addNewColor = (data) => {
    dispatch(
      addColor({ name: data.currentColorName, color: data.currentColor })
    );
    reset({ currentColorName: "", currentColor: "#9C27B0" });
  };
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
                colors.every((color) => color.color !== value) ||
                "Color Must be Unique",
            },
          }}
          render={({ field }) => (
            <StyledChromePicker
              color={field.value}
              onChange={(color) => field.onChange(color.hex.toUpperCase())}
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
                ) || "Color Name Must be Unique",
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
