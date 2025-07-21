import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Grid
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../../store/slices/notificationSlice";
import AxiosInstance from "../../../services/AxiosInstance";
import type { User } from '../../../models/User';

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
};

const initialFormState: User = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  role: "Admin",
  status: "Active",
  address: {
    street: "",
    number: "",
    city: "",
    postalCode: "",
  },
};

const UserModalCreate = ({ open, onClose, onCreated }: Props) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
    if (open) {
      setForm(initialFormState);  // Limpia el form cada vez que se abre
    }
  }, [open]);

    const [form, setForm] = useState<User>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "User",
        status: "Active",
        address: {
            street: "",
            number: "",
            city: "",
            postalCode: ""
        }
    });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        try {
        // Validación básica
        if (!form.firstName || !form.lastName || !form.email || !form.role) {
            dispatch(showNotification({ message: "Required fields are missing", type: "warning" }));
            return;
        }

        await AxiosInstance.post("/api/v1/users", form);

        dispatch(showNotification({ message: "Correctly Create User", type: "success" }));
        onClose();
        onCreated();
        } catch (error) {
            console.error("Error creating user:", error);
            dispatch(
                showNotification({
                message: "Error try to create user",
                type: "error",
                })
            );
        }
    };

    const handleOnClose = () => {
        setForm(initialFormState);
        onClose();
    };

    return (
    <Dialog open={open} onClose={handleOnClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear Nuevo Usuario</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
        </Grid>

        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
          fullWidth
          margin="dense"
        />

        <Grid container spacing={1} mt={1}>
          <Grid item xs={6}>
            <TextField
              label="Street"
              value={form.address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Number"
              value={form.address.number}
              onChange={(e) => handleAddressChange("number", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="City"
              value={form.address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Postal Code"
              value={form.address.postalCode}
              onChange={(e) => handleAddressChange("postalCode", e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
        </Grid>

        <TextField
          select
          label="Role"
          value={form.role}
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
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          fullWidth
          margin="dense"
        >
          <MenuItem value="Active">Activo</MenuItem>
          <MenuItem value="Inactive">Inactivo</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Crear Usuario
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModalCreate;