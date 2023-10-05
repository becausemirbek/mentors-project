import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { productsContext } from "../../context/productsContext";
import "./style.css";
import { useNavigate } from "react-router-dom";

export interface ProductI {
  title: string;
  description: string;
  price: string;
  category: number;
  image: any;
}

const CreateProduct = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductI>();

  const { getCategories, categories, createProduct } =
    useContext(productsContext);
  const navigate = useNavigate();

  const onSubmit = (data: ProductI) => {
    const formData = new FormData();
    formData.append("files", data.image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category.toString());

    createProduct(formData, navigate);
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
              label="Title"
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
          <InputLabel id="demo-select-small-label">Category</InputLabel>
          <Controller
            control={control}
            name="category"
            rules={{ required: "Price is required" }}
            render={({ field }) => (
              <Select
                {...field}
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={field.value}
                label="Category"
                error={!!errors.category}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories &&
                  categories.map(
                    ({ title, id }: { title: string; id: number }) => (
                      <MenuItem key={id} value={id}>
                        {title}
                      </MenuItem>
                    )
                  )}
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
              onChange={({ target: { value } }) =>
                !isNaN(Number(value)) && field.onChange(value)
              }
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="image"
          rules={{ required: "Image is required" }}
          render={({ field: { value, onChange, ...field } }) => (
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <Input
                {...field}
                className="uploadFile"
                type="file"
                value={value?.fileName}
                onChange={({ target }: any) => onChange(target.files[0])}
              />
            </Button>
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
