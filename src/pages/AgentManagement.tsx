import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  PersonAdd as PersonAddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  leads: number;
  conversionRate: number;
}

const MOCK_AGENTS: Agent[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    phone: '555-123-4567', 
    status: 'active', 
    leads: 24, 
    conversionRate: 67 
  },
  { 
    id: '2', 
    name: 'Sarah Johnson', 
    email: 'sarah.j@example.com', 
    phone: '555-987-6543', 
    status: 'active', 
    leads: 31, 
    conversionRate: 72 
  },
  { 
    id: '3', 
    name: 'Michael Brown', 
    email: 'michael.b@example.com', 
    phone: '555-456-7890', 
    status: 'inactive', 
    leads: 18, 
    conversionRate: 59 
  },
  { 
    id: '4', 
    name: 'Emily Wilson', 
    email: 'emily.w@example.com', 
    phone: '555-654-3210', 
    status: 'active', 
    leads: 42, 
    conversionRate: 81 
  },
  { 
    id: '5', 
    name: 'David Clark', 
    email: 'david.c@example.com', 
    phone: '555-789-0123', 
    status: 'active', 
    leads: 27, 
    conversionRate: 65 
  }
];

const AgentManagement = () => {
  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'active' as 'active' | 'inactive'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenAddDialog = () => {
    setEditMode(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'active'
    });
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (agent: Agent) => {
    setEditMode(true);
    setCurrentAgent(agent);
    setFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      status: agent.status
    });
    setOpenDialog(true);
  };

  const handleOpenDeleteDialog = (agent: Agent) => {
    setCurrentAgent(agent);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenDeleteDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setFormData({
      ...formData,
      status: e.target.value as 'active' | 'inactive'
    });
  };

  const handleSaveAgent = () => {
    if (editMode && currentAgent) {
      // Update existing agent
      const updatedAgents = agents.map(agent => 
        agent.id === currentAgent.id 
          ? { ...agent, name: formData.name, email: formData.email, phone: formData.phone, status: formData.status } 
          : agent
      );
      setAgents(updatedAgents);
      setSnackbar({
        open: true,
        message: 'Agent updated successfully',
        severity: 'success'
      });
    } else {
      // Add new agent
      const newAgent: Agent = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        leads: 0,
        conversionRate: 0
      };
      setAgents([...agents, newAgent]);
      setSnackbar({
        open: true,
        message: 'Agent added successfully',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDeleteAgent = () => {
    if (currentAgent) {
      const filteredAgents = agents.filter(agent => agent.id !== currentAgent.id);
      setAgents(filteredAgents);
      setSnackbar({
        open: true,
        message: 'Agent deleted successfully',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Agent Management
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleOpenAddDialog}
          sx={{ borderRadius: 2 }}
        >
          Add Agent
        </Button>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}
      >
        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'background.paper' }}>
                <TableCell>Agent</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Leads Assigned</TableCell>
                <TableCell>Conversion Rate</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((agent) => (
                  <TableRow key={agent.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            mr: 2, 
                            bgcolor: agent.status === 'active' ? 'primary.main' : 'text.disabled'
                          }}
                        >
                          {agent.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight={500}>
                            {agent.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {agent.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{agent.phone}</TableCell>
                    <TableCell>
                      <Chip 
                        label={agent.status === 'active' ? 'Active' : 'Inactive'}
                        color={agent.status === 'active' ? 'success' : 'default'}
                        size="small"
                        sx={{ 
                          fontWeight: 600,
                          borderRadius: 1
                        }}
                      />
                    </TableCell>
                    <TableCell>{agent.leads}</TableCell>
                    <TableCell>{agent.conversionRate}%</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit">
                        <IconButton 
                          onClick={() => handleOpenEditDialog(agent)}
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton 
                          onClick={() => handleOpenDeleteDialog(agent)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={agents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add/Edit Agent Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Agent' : 'Add New Agent'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ p: 1 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Agent Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSaveAgent} 
            variant="contained" 
            color="primary"
          >
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete agent "{currentAgent?.name}"? This cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleDeleteAgent} 
            variant="contained" 
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgentManagement;
