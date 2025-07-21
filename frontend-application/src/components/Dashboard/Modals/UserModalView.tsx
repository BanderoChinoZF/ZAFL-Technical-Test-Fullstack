// src/components/modals/UserModalView.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import type { User } from "../../../models/User";

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const UserModalView = ({ open, onClose, user }: Props) => {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>User {user.firstName} {user.lastName}</DialogTitle>
      <DialogContent dividers>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={3}
          mt={1}
        >
          <Avatar
            src={typeof user.profilePicture === "string" ? user.profilePicture : undefined}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
        </Box>

        <TextField
          label="Name"
          value={`${user.firstName} ${user.lastName}`}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Email"
          value={user.email}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Phone Number"
          value={user.phoneNumber}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Role"
          value={user.role}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Status"
          value={user.status}
          fullWidth
          margin="dense"
          disabled
        />
        <TextField
          label="Address"
          value={`${user.address.street} ${user.address.number}, ${user.address.city} ${user.address.postalCode}`}
          fullWidth
          margin="dense"
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModalView;
