import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import UserForm from "./UserForm";
import type { User } from "../models/User";

interface Props {
  open: boolean;
  title: string;
  user?: User;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

export default function UserDialog({ open, title, user, onClose, onSubmit }: Props) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <UserForm initialData={user} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
