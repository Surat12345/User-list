import { TextField, Button, Stack } from "@mui/material";
import type { User } from "../models/User";
import { useState } from "react";

interface Props {
  initialData?: User;
  onSubmit: (user: User) => void;
}

export default function UserForm({ initialData, onSubmit }: Props) {
  const [user, setUser] = useState<User>(
    initialData || { name: "", username: "", email: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Stack spacing={2}>
      <TextField name="name" label="Name" value={user.name} onChange={handleChange} />
      <TextField name="username" label="Username" value={user.username} onChange={handleChange} />
      <TextField name="email" label="Email" value={user.email} onChange={handleChange} />

      <Button variant="contained" onClick={() => onSubmit(user)}>
        Save
      </Button>
    </Stack>
  );
}
