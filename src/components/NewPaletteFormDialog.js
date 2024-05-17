import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { Box, IconButton } from "@mui/material";
import { EmojiEmotions } from "@mui/icons-material";
import Picker from "@emoji-mart/react";
import { useDispatch, useSelector } from "react-redux";
import { addPalette } from "../store";
import { useNavigate } from "react-router-dom";

export default function NewPaletteFormDialog({
  newPaletteFormOpen,
  closeNewPaletteForm,
}) {
  const palettes = useSelector((state) => state.palettes);
  const customPalette = useSelector((state) => state.customPalette);
  const paletteNames = palettes.map((palette) => palette.paletteName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [pickerOpen, setPickerOpen] = useState(true);

  const openPicker = () => {
    setPickerOpen(true);
  };

  const closePicker = () => {
    setPickerOpen(false);
  };

  const addNewPalette = (data) => {
    const { newPaletteName, newPaletteEmoji } = data;
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      emoji: newPaletteEmoji,
      colors: customPalette,
    };
    dispatch(addPalette(newPalette));
    reset();
    closeNewPaletteForm();
    navigate("/");
  };

  return (
    <Dialog open={newPaletteFormOpen} onClose={closeNewPaletteForm}>
      <form onSubmit={handleSubmit(addNewPalette)} autoComplete="off">
        <DialogTitle variant="h5">Add Palette</DialogTitle>
        {pickerOpen ? (
          <DialogContent>
            <DialogContentText gutterBottom={true}>
              Select an emoji for your new custom palette:
            </DialogContentText>
            <Controller
              name="newPaletteEmoji"
              control={control}
              rules={{
                required: "Emoji is required",
              }}
              render={({ field }) => (
                <Picker
                  theme="light"
                  onEmojiSelect={(emoji) => {
                    closePicker();
                    field.onChange(emoji.native);
                  }}
                />
              )}
            />
          </DialogContent>
        ) : (
          <DialogContent>
            <DialogContentText gutterBottom={true}>
              Enter a name for your new custom palette:
            </DialogContentText>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <TextField
                {...register("newPaletteName", {
                  required: "Palette Name is Required",
                  validate: {
                    isNameUnique: (value) =>
                      paletteNames.every(
                        (paletteName) =>
                          paletteName.toLowerCase() !== value.toLowerCase()
                      ) || "Palette Name Must be Unique",
                  },
                })}
                autoFocus
                placeholder="Palette Name"
                margin="dense"
                variant="standard"
                fullWidth
                error={Boolean(errors.newPaletteName)}
                helperText={errors.newPaletteName?.message}
              />
              <IconButton onClick={openPicker}>
                {getValues("newPaletteEmoji") || <EmojiEmotions />}
              </IconButton>
            </Box>
          </DialogContent>
        )}
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button onClick={closeNewPaletteForm}>Cancel</Button>
          <Button type="submit" color="success" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
