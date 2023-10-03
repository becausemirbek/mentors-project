import React, { useContext } from "react";
import { Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

interface SignInI {
  email: string;
  password: string;
}

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm();
  const navigate = useNavigate();

  const { handleSignIn } = useContext(authContext);

  const onSubmit = (data: any) => {
    handleSignIn(data, navigate);
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      <h2>Sign in</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Controller
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message?.toString()}
              label="Email"
              {...register("email", {
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Entered value does not match email format",
                },
              })}
              {...field}
              // sx={{ height: "40px" }}
              type="text"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
              label="Password"
              {...field}
              // sx={{ height: "40px" }}
              type="text"
            />
          )}
        />

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
