"use client";

import React, { useReducer, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter dari Next.js
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center", // Menyesuaikan agar berada di tengah horizontal
    alignItems: "center", // Vertikal tengah
    height: "100vh", // Membuat tampilan full height
    backgroundColor: "#FFFFFF", // Warna background untuk kontras
  },
  formContainer: {
    maxWidth: 400, // Batas lebar card
    width: "100%", // Memastikan card mengambil seluruh lebar
  },
  loginBtn: {
    marginTop: 16, // Spasi atas tombol
  },
  header: {
    textAlign: "center",
    color: "#212121",
  },
  card: {
    padding: 20, // Padding di dalam card
  },
  logo: {
    display: "block",
    maxWidth: "200px",
    margin: "0 auto 20px", // Logo center dengan margin bawah
  },
});

// State Type dan Initial State
type State = {
  username: string;
  password: string;
  isButtonDisabled: boolean;
  helperText: string;
  isError: boolean;
  isLoggedIn: boolean; // Status login
};

const initialState: State = {
  username: "",
  password: "",
  isButtonDisabled: true,
  helperText: "",
  isError: false,
  isLoggedIn: false, // Inisialisasi status login ke false
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
      return { ...state, username: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setIsButtonDisabled":
      return { ...state, isButtonDisabled: action.payload };
    case "loginSuccess":
      return { ...state, helperText: action.payload, isError: false, isLoggedIn: true }; // Status login success
    case "loginFailed":
      return { ...state, helperText: action.payload, isError: true, isLoggedIn: false }; // Status gagal
    default:
      return state;
  }
};

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter(); // Router dari Next.js

  useEffect(() => {
    // Aktifkan tombol ketika username dan password terisi
    dispatch({
      type: "setIsButtonDisabled",
      payload: !(state.username.trim() && state.password.trim()),
    });
  }, [state.username, state.password]);

  const handleLogin = () => {
    if (state.username === "nandanalog@gmail.com" && state.password === "a7d1x3kw") {
      dispatch({ type: "loginSuccess", payload: "Login Berhasil" });
      router.push("/admin"); // Redirect ke halaman admin
    } else {
      dispatch({ type: "loginFailed", payload: "Username atau password salah" });
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.formContainer}>
        {/* Logo di atas form */}
        <img src="apeksi.png" alt="Logo APEKSI" className={classes.logo} />

        {/* Card Login */}
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Login Admin" />
          <CardContent>
            <TextField
              error={state.isError}
              fullWidth
              id="username"
              type="email"
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
              className={classes.loginBtn}
              onClick={handleLogin}
              disabled={state.isButtonDisabled}
              fullWidth
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
