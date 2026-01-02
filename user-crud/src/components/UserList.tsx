import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button, Stack
} from "@mui/material";
import type { User } from "../models/User";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserList({ users, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users.map((u) => (
          <TableRow key={u.id}>
            <TableCell>{u.name}</TableCell>
            <TableCell>{u.username}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>
              <Stack direction="row" spacing={1}>
                <Button size="small" onClick={() => onEdit(u)}>Edit</Button>
                <Button size="small" color="error" onClick={() => onDelete(u.id!)}>
                  Delete
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
