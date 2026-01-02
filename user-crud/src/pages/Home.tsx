import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!user.name || !user.username || !user.email) {
      alert("All fields required");
      return;
    }

    // fake API call
    const res = await axios.post(API_URL, user);

    // localStorage users
    const storedUsers: User[] =
      JSON.parse(localStorage.getItem("addedUsers") || "[]");

    const newUser: User = {
      id: Date.now(), // unique id
      ...res.data
    };

    localStorage.setItem(
      "addedUsers",
      JSON.stringify([...storedUsers, newUser])
    );

    navigate("/users"); // 👉 direct users page
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Add User
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 500 }}>
        <Stack spacing={2}>
          <TextField
            name="name"
            label="Name"
            value={user.name}
            onChange={handleChange}
          />
          <TextField
            name="username"
            label="Username"
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            name="email"
            label="Email"
            value={user.email}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Add User
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
