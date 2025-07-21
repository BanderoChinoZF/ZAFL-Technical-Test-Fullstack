import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  onCreate: () => void;
}

const UserToolbar = ({
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
  onCreate
}: Props) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Name or email"
        size="small"
      />

      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Role</InputLabel>
        <Select
          label="Rol"
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Status</InputLabel>
        <Select
          label="Estado"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

       <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onCreate}
        size="small"
      >
        Add User
      </Button>
    </Box>
  );
};

export default UserToolbar;
