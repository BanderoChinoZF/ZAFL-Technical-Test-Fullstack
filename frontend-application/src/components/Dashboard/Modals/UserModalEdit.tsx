import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import { Grid } from "@mui/material";
import type { User, Address } from "../../../models/User";
import AxiosInstance from './../../../services/AxiosInstance';

interface Props {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUpdated: () => void;
}

const UserModalEdit = ({ open, onClose, user, onUpdated }: Props) => {
  const [form, setForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        status: user.status,
        address: user.address || {
          street: "",
          number: "",
          city: "",
          postalCode: ""
        }
      });
    }
  }, [user]);

  const handleChange = (field: keyof User, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof Address, value: string) => {
    setForm((prev) => ({
      ...prev,
      address: {
        street: prev.address?.street ?? "",
        number: prev.address?.number ?? "",
        city: prev.address?.city ?? "",
        postalCode: prev.address?.postalCode ?? "",
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    if (!user) return;
    try {
      await AxiosInstance.put(`api/v1/users/${user._id}`, form);
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <TextField
              label="First Name"
              value={form.firstName || ""}
              onChange={(e) => handleChange("firstName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              label="Last Name"
              value={form.lastName || ""}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
        </Grid>

        <TextField
          label="Email"
          value={form.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Phone Number"
          value={form.phoneNumber || ""}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          fullWidth
          margin="dense"
        />

        {/* Address fields */}
        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <TextField
              label="Street"
              value={form.address?.street || ""}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Number"
              value={form.address?.number || ""}
              onChange={(e) => handleAddressChange("number", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              value={form.address?.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Postal Code"
              value={form.address?.postalCode || ""}
              onChange={(e) => handleAddressChange("postalCode", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
        </Grid>

        <TextField
          select
          label="Role"
          value={form.role || ""}
          onChange={(e) => handleChange("role", e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={form.status || ""}
          onChange={(e) => handleChange("status", e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModalEdit;
