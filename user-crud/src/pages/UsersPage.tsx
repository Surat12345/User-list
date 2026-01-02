import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from "@mui/material";
import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isLocal?: boolean; // 🔥 identify localStorage users
}

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  // delete
  const [openDelete, setOpenDelete] = useState(false);

  // edit
  const [openEditConfirm, setOpenEditConfirm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    const fetchUsers = async () => {
      const apiRes = await axios.get<User[]>(API_URL);

      const localUsers: User[] =
        JSON.parse(localStorage.getItem("addedUsers") || "[]");

      const markedLocalUsers = localUsers.map(u => ({
        ...u,
        isLocal: true
      }));

      setUsers([...markedLocalUsers, ...apiRes.data]);
    };

    fetchUsers();
  }, []);

  /* ---------------- DELETE ---------------- */
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    if (!selectedUser) return;

    // local user
    if (selectedUser.isLocal) {
      const localUsers: User[] =
        JSON.parse(localStorage.getItem("addedUsers") || "[]");

      const updatedLocal = localUsers.filter(
        u => u.id !== selectedUser.id
      );

      localStorage.setItem("addedUsers", JSON.stringify(updatedLocal));
      setUsers(users.filter(u => u.id !== selectedUser.id));
    } else {
      // api user (fake delete)
      axios.delete(`${API_URL}/${selectedUser.id}`).then(() => {
        setUsers(users.filter(u => u.id !== selectedUser.id));
      });
    }

    setOpenDelete(false);
    setSelectedUser(null);
  };

  /* ---------------- EDIT ---------------- */
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setOpenEditConfirm(true);
  };

  const confirmEdit = () => {
    if (!selectedUser) return;
    setEditUser({ ...selectedUser });
    setOpenEditConfirm(false);
    setOpenEditForm(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editUser) return;
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    if (!editUser) return;

    // local user edit
    if (editUser.isLocal) {
      const localUsers: User[] =
        JSON.parse(localStorage.getItem("addedUsers") || "[]");

      const updatedLocal = localUsers.map(u =>
        u.id === editUser.id ? editUser : u
      );

      localStorage.setItem("addedUsers", JSON.stringify(updatedLocal));
    } else {
      // api user edit (fake)
      axios.put(`${API_URL}/${editUser.id}`, editUser);
    }

    setUsers(users.map(u => (u.id === editUser.id ? editUser : u)));
    setOpenEditForm(false);
    setEditUser(null);
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>

      {/* USERS TABLE */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell width={200}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleEditClick(user)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DELETE CONFIRM */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{selectedUser?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT CONFIRM */}
      <Dialog open={openEditConfirm} onClose={() => setOpenEditConfirm(false)}>
        <DialogTitle>Confirm Edit</DialogTitle>
        <DialogContent>
          Do you want to edit <strong>{selectedUser?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditConfirm(false)}>Cancel</Button>
          <Button variant="contained" onClick={confirmEdit}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* EDIT FORM */}
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)} fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              name="name"
              label="Name"
              value={editUser?.name || ""}
              onChange={handleEditChange}
            />
            <TextField
              name="username"
              label="Username"
              value={editUser?.username || ""}
              onChange={handleEditChange}
            />
            <TextField
              name="email"
              label="Email"
              value={editUser?.email || ""}
              onChange={handleEditChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
