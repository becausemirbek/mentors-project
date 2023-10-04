import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { productsContext } from "../../context/productsContext";

interface ProductI {
  title: string;
  description: string;
  price: string;
  category: number;
}

const CreateProduct = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductI>();

  const { getCategories } = useContext(productsContext);

  const onSubmit = (data: ProductI) => {
    console.log(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h3>Create Product</h3>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
        <Controller
          control={control}
          name="description"
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.description}
              helperText={errors.description?.message?.toString()}
              label="Description"
              {...field}
              type="text"
            />
          )}
        />
        <FormControl>
          <InputLabel id="demo-select-small-label">Age</InputLabel>
          <Controller
            control={control}
            name="price"
            rules={{ required: "Price is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={"12"}
                label="Age"
                onChange={(e) => console.log(e)}
                error={!!errors.price}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <Controller
          control={control}
          name="price"
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.price}
              helperText={errors.price?.message?.toString()}
              label="Price"
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

export default CreateProduct;
