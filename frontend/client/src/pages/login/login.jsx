import { Button, Checkbox, TextField } from "@mui/material";
import { useState } from "react";
import logo from "../../assets/hyper.svg";
import { Link } from "react-router-dom";

const label = { inputProps: { "aria-label": "rememberme" } };

const Login = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="flex justify-center mt-40">
      <div className="p-8 shadow-md border rounded-lg w-full lg:w-1/2">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <img src={logo} height={50} width={50} alt="hyper" className="mb-3" />
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium leading-6">
            Don't have an account?
            <Link
              to={"signOn"}
              className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
            >
              Create today!
            </Link>
          </span>
        </div>

        <div>
          <label htmlFor="email" className="block text-900 font-medium mb-2">
            Email
          </label>
          <TextField
            id="email"
            placeholder="Email address"
            variant="outlined"
            className="w-full mb-3"
            sx={{ mb: "12px", width: "100%" }}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <TextField
            type="password"
            placeholder="Password"
            variant="outlined"
            sx={{ mb: "12px", width: "100%" }}
          />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Checkbox onChange={handleChange} {...label} />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
              Forgot your password?
            </a>
          </div>

          <Button
            label="Sign In"
            variant="contained"
            icon="pi pi-user"
            className="w-full"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
