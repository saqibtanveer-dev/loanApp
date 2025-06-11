import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  AttachMoney as AttachMoneyIcon,
  AssignmentInd as AssignmentIndIcon
} from '@mui/icons-material';

// Mock lead data - in a real app, this would come from an API
const MOCK_LEADS = [
  {
    id: '1',
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, AN 12345',
    loanAmount: 25000,
    loanPurpose: 'Home improvement',
    loanTerm: 36,
    employmentStatus: 'Full-time',
    employer: 'Acme Corporation',
    monthlyIncome: 5500,
    status: 'pending',
    dateSubmitted: '2025-06-05T10:30:00',
    notes: 'Applicant has good credit history.',
    assignedAgent: 'Sarah Johnson'
  },
  {
    id: '2',
    fullName: 'Mary Johnson',
    email: 'mary.j@example.com',
    phone: '555-987-6543',
    address: '456 Oak Dr, Someville, SO 67890',
    loanAmount: 15000,
    loanPurpose: 'Debt consolidation',
    loanTerm: 24,
    employmentStatus: 'Part-time',
    employer: 'Global Services Inc.',
    monthlyIncome: 3200,
    status: 'approved',
    dateSubmitted: '2025-06-03T14:15:00',
    notes: 'Approved for lower amount than requested.',
    assignedAgent: 'Mike Brown'
  },
  {
    id: '3',
    fullName: 'Robert Williams',
    email: 'rob.w@example.com',
    phone: '555-456-7890',
    address: '789 Pine Rd, Othertown, OT 34567',
    loanAmount: 50000,
    loanPurpose: 'Business startup',
    loanTerm: 60,
    employmentStatus: 'Self-employed',
    employer: 'Self',
    monthlyIncome: 7800,
    status: 'reviewing',
    dateSubmitted: '2025-06-07T09:45:00',
    notes: 'Needs additional documentation for business plan.',
    assignedAgent: 'David Clark'
  }
];

// Mock list of agents for assignment
const MOCK_AGENTS = [
  { id: '1', name: 'Sarah Johnson' },
  { id: '2', name: 'Mike Brown' },
  { id: '3', name: 'David Clark' },
  { id: '4', name: 'Emily Wilson' }
];

const LeadDetails = () => {
  // Get the lead ID from the URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the lead data from our mock data
  const leadData = MOCK_LEADS.find(lead => lead.id === id);
  
  // State for editable fields
  const [status, setStatus] = useState(leadData?.status || 'pending');
  const [agent, setAgent] = useState(leadData?.assignedAgent || '');
  const [notes, setNotes] = useState(leadData?.notes || '');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // If lead not found
  if (!leadData) {
    return (
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Lead not found
        </Typography>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'declined':
        return 'error';
      case 'reviewing':
        return 'warning';
      default:
        return 'info';
    }
  };

  // Handle status change
  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
  };

  // Handle agent change
  const handleAgentChange = (e: SelectChangeEvent) => {
    setAgent(e.target.value);
  };

  // Handle notes change
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };

  // Handle save
  const handleSave = () => {
    // In a real app, this would update the data via an API
    setSnackbar({
      open: true,
      message: 'Lead updated successfully',
      severity: 'success'
    });
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mr: 3, borderRadius: 2 }}
        >
          Back
        </Button>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            Loan Application #{leadData.id}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body1" color="text.secondary">
              Submitted {formatDate(leadData.dateSubmitted)}
            </Typography>
            <Chip
              label={status.charAt(0).toUpperCase() + status.slice(1)}
              color={getStatusColor(status) as "success" | "error" | "warning" | "info"}
              size="small"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <Grid container spacing={3}>
        {/* Left column - Applicant info */}
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              mb: 3
            }}
          >
            <CardContent sx={{ pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Applicant Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {leadData.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email Address
                  </Typography>
                  <Typography variant="body1">
                    {leadData.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Phone Number
                  </Typography>
                  <Typography variant="body1">
                    {leadData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="body1">
                    {leadData.address}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              mb: 3
            }}
          >
            <CardContent sx={{ pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AttachMoneyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Loan Details
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Loan Amount
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    ${leadData.loanAmount.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Loan Term
                  </Typography>
                  <Typography variant="body1">
                    {leadData.loanTerm} months
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Loan Purpose
                  </Typography>
                  <Typography variant="body1">
                    {leadData.loanPurpose}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              mb: { xs: 3, md: 0 }
            }}
          >
            <CardContent sx={{ pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Employment Information
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Employment Status
                  </Typography>
                  <Typography variant="body1">
                    {leadData.employmentStatus}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Employer
                  </Typography>
                  <Typography variant="body1">
                    {leadData.employer}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Monthly Income
                  </Typography>
                  <Typography variant="body1">
                    ${leadData.monthlyIncome.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right column - Processing */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              mb: 3
            }}
          >
            <CardContent sx={{ pb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentIndIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight={600}>
                  Processing
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Application Status</InputLabel>
                <Select
                  value={status}
                  label="Application Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="reviewing">Reviewing</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="declined">Declined</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Assigned Agent</InputLabel>
                <Select
                  value={agent}
                  label="Assigned Agent"
                  onChange={handleAgentChange}
                >
                  <MenuItem value="">
                    <em>Not assigned</em>
                  </MenuItem>
                  {MOCK_AGENTS.map(agent => (
                    <MenuItem key={agent.id} value={agent.name}>
                      {agent.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={4}
                value={notes}
                onChange={handleNotesChange}
              />
            </CardContent>
          </Card>

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mt: 2
            }}
          >
            <Button 
              variant="contained" 
              color="primary"
              size="large"
              onClick={handleSave}
              sx={{ 
                px: 4, 
                py: 1.5,
                borderRadius: 2
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeadDetails;
