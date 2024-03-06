import { Box, Button, TextField } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
const Login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-50">
      <form className="mb-40 w-[30rem] py-16 px-24 shadow-xl flex flex-col items-center justify-center rounded-lg">
        <p className="w-full text-xl flex justify-center font-semibold text-gray-800 mb-4">
          Optimus Admin Panel
          <i className="pi pi-prime ml-2 text-3xl"></i>
        </p>

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <PersonIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="User name"
            variant="standard"
            className="w-full"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            marginY: "8px",
            width: "100%",
          }}
        >
          <KeyIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Password"
            variant="standard"
            className="w-full"
          />
        </Box>
        <Button variant="contained" sx={{ marginY: "8px" }} className="w-full">
          Login
        </Button>
        <p className="text-xs">
          Did you forget your password? Contact with your admin
        </p>
      </form>
    </div>
  );
};

export default Login;
