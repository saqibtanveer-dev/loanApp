import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '555-123-4567', // example data
    position: user?.role === 'admin' ? 'Administrator' : 'Loan Agent',
    department: 'Sales & Support',
    location: 'New York, USA'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would save to an API
    setIsEditing(false);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={3}>
        My Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Left column - User info */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              overflow: 'visible',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Box sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
              <Box 
                sx={{ 
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  height: '80px',
                  borderRadius: '12px 12px 0 0',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              />
              
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mx: 'auto',
                  mt: 2,
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
              
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                {formData.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {formData.position}
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'inline-block',
                  px: 2, 
                  py: 0.5, 
                  borderRadius: 2, 
                  bgcolor: user?.role === 'admin' ? 'primary.light' : 'secondary.light',
                  color: user?.role === 'admin' ? 'primary.dark' : 'secondary.dark',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase'
                }}
              >
                {user?.role}
              </Box>
            </Box>

            <Divider />

            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1">
                  {formData.department}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body1">
                  {formData.location}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {formData.email}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Paper 
            elevation={0}
            sx={{ 
              borderRadius: 3, 
              mt: 3, 
              p: 3,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2}>
              Performance
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Leads Handled
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {user?.role === 'admin' ? '152' : '47'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Conversion Rate
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {user?.role === 'admin' ? '68%' : '52%'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Average Response
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    2.5h
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Client Rating
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    4.8/5
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Right column - Profile details */}
        <Grid item xs={12} md={8}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 3, 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              height: '100%'
            }}
          >
            <CardHeader
              title={
                <Typography variant="h6" fontWeight={600}>
                  Profile Details
                </Typography>
              }
              action={
                isEditing ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{ borderRadius: 2 }}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    sx={{ borderRadius: 2 }}
                  >
                    Edit
                  </Button>
                )
              }
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Account Security
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      name="currentPassword"
                      variant="outlined"
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter current password" : "••••••••"}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      name="newPassword"
                      variant="outlined"
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter new password" : ""}
                    />
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
