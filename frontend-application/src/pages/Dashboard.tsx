import { useEffect, useState } from "react";
import AxiosInstance from "../services/AxiosInstance";
import type { User } from "../models/User";
import UserToolbar from "../components/Dashboard/UserToolbar";
import UserTable from "../components/Dashboard/UserTable";
import PaginationControls from "../components/Dashboard/PaginationControls";
import UserModalView from "../components/Dashboard/Modals/UserModalView";
import UserModalEdit from "../components/Dashboard/Modals/UserModalEdit";
import UserModalCreate from "../components/Dashboard/Modals/UserModalCreate";
import ConfirmDeleteDialog from "../components/Dashboard/Modals/ConfirmDeleteDialog";
import {
  Box,
  CircularProgress,
  Typography,
  Paper,
  Alert,
  Container
} from "@mui/material"
import { useCallback } from "react";

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await AxiosInstance.get("/api/v1/users", {
        params: {
          search: search || undefined,
          role: role || undefined,
          status : status || undefined,
          page,
          limit
        }
      });
      setUsers(Array.isArray(response.data.results) ? response.data.results : []);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        setError((error as { message: string }).message);
      } else {
        setError("Error try to charge users list");
      }
    
    }finally {
      setLoading(false);
    }
  }, [search, role, status, page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const onUserUpdated = () => {
    fetchUsers();
  };

  const onUserDeleted = async () => {
    if(!selectedUser) return;
    await AxiosInstance.delete(`api/v1/users/${selectedUser._id}`);
    setDeleteOpen(false);
    fetchUsers();
  };


  return (
    <Container>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Dashboard - Users -
        </Typography>

        <Paper sx={{ p: 2, mb: 2 }}>
          <UserToolbar
            search={search}
            onSearchChange={setSearch}
            role={role}
            onRoleChange={setRole}
            status={status}
            onStatusChange={setStatus}
            onCreate={() => setCreateOpen(true)}
          />
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <UserTable
              users={users || []}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
          </>
        )}

        {/* Modales */}
        <UserModalView open={viewOpen} onClose={() => setViewOpen(false)} user={selectedUser} />
        <UserModalEdit open={editOpen} onClose={() => setEditOpen(false)} user={selectedUser} onUpdated={onUserUpdated} />
        <ConfirmDeleteDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onConfirm={onUserDeleted} />
      </Box>

      <UserModalCreate
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={fetchUsers}
    />
    </Container>
  );
};

export default Dashboard;
