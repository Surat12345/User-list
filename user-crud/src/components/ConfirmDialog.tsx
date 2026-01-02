import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = "Confirm",
  message,
  onConfirm,
  onCancel
}: Props) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
