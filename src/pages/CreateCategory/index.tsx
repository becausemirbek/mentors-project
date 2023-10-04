import { Button, TextField } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const CreateCategory = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h3>Create category</h3>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
              label="Category name"
              {...field}
              type="text"
            />
          )}
        />
        <Button type="submit" variant="outlined">
          Create
        </Button>
      </form>
    </div>
  );
};

export default CreateCategory;
