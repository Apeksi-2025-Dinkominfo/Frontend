"use client";

import React, { useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { loginUser } from "../utils/login";
import { setCookie } from 'nookies';

type State = {
  name: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
  isLoggedIn: boolean;
};

const initialState: State = {
  name: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
  isLoggedIn: false,
};

type Action =
  | { type: "setUsername"; payload: string }
  | { type: "setPassword"; payload: string }
  | { type: "setIsButtonDisabled"; payload: boolean }
  | { type: "loginSuccess"; payload: string }
  | { type: "loginFailed"; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "setUsername":
      return { ...state, name: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setIsButtonDisabled":
      return { ...state, isButtonDisabled: action.payload };
    case "loginSuccess":
      return { ...state, helperText: action.payload, isError: false, isLoggedIn: true };
    case "loginFailed":
      return { ...state, helperText: action.payload, isError: true, isLoggedIn: false };
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: "setIsButtonDisabled",
      payload: !(state.name.trim() && state.password.trim()),
    });
  }, [state.name, state.password]);

  const handleLogin = async () => {
    try {
      const response = await loginUser(state.name, state.password);
      
      // Set the token in cookies
      setCookie(null, 'token', response.token, {
        maxAge: 5 * 60,
        path: '/',
      });
      
      dispatch({ type: "loginSuccess", payload: "Login Berhasil" });
      router.push("/admin"); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        // Handle the error correctly by accessing the message
        dispatch({ type: "loginFailed", payload: error.message });
      } else {
        // Handle unexpected error types
        dispatch({ type: "loginFailed", payload: "An unknown error occurred." });
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Box className="max-w-md w-full">
        <img src="apeksi.png" alt="Logo APEKSI" className="block mx-auto mb-5 max-w-[200px]" />

        <Card className="p-5">
          <CardHeader className="text-center text-gray-800" title="Login Admin" />
          <CardContent>
            <TextField
              error={state.isError}
              fullWidth
              id="name"
              type="name"
              label="Username"
              margin="normal"
              onChange={(e) => dispatch({ type: "setUsername", payload: e.target.value })}
            />
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={(e) => dispatch({ type: "setPassword", payload: e.target.value })}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="primary"
              className="mt-4 w-full"
              onClick={handleLogin}
              disabled={state.isButtonDisabled}
            >
              Login
            </Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
