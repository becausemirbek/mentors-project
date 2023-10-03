import { Button, OutlinedInput } from "@mui/material";
import React from "react";

const SignIn = () => {
  return (
    <div>
      <h2>Sign in</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <OutlinedInput type="text" />
        <OutlinedInput type="password" />
        <Button variant="outlined">Submit</Button>
      </div>
    </div>
  );
};

export default SignIn;
