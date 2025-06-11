import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Settings = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    leadAssignments: true,
    statusUpdates: true,
    dailyDigest: false,
    marketingEmails: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
  });

  const [displaySettings, setDisplaySettings] = useState({
    darkMode: false,
    compactMode: false,
    language: 'english'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationSettings({
      ...notificationSettings,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSecurityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecuritySettings({
      ...securitySettings,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleDisplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisplaySettings({
      ...displaySettings,
      [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const saveSettings = () => {
    setSnackbarMessage('Settings saved successfully');
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={3}>
        Settings
      </Typography>

      <Card 
        elevation={0} 
        sx={{ 
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'visible' 
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 'auto',
                px: 3,
                py: 2,
              }
            }}
          >
            <Tab 
              icon={<NotificationsIcon />} 
              label="Notifications" 
              iconPosition="start" 
              sx={{ borderRadius: 0 }}
            />
            <Tab 
              icon={<SecurityIcon />} 
              label="Security" 
              iconPosition="start" 
              sx={{ borderRadius: 0 }}
            />
            <Tab 
              icon={<PaletteIcon />} 
              label="Display" 
              iconPosition="start" 
              sx={{ borderRadius: 0 }}
            />
            <Tab 
              icon={<LanguageIcon />} 
              label="Language" 
              iconPosition="start" 
              sx={{ borderRadius: 0 }}
            />
          </Tabs>
        </Box>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Email Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Configure which email notifications you want to receive
          </Typography>

          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 3,
              borderColor: 'divider'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onChange={handleNotificationChange}
                      name="emailNotifications"
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={500}>Enable Email Notifications</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Master toggle for all email notifications
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', ml: 0 }}
                />
              </Grid>
              <Divider sx={{ width: '100%', my: 2 }} />
              
              <Grid item xs={12}>
                <FormControlLabel
                  disabled={!notificationSettings.emailNotifications}
                  control={
                    <Switch
                      checked={notificationSettings.leadAssignments}
                      onChange={handleNotificationChange}
                      name="leadAssignments"
                      color="primary"
                    />
                  }
                  label="New lead assignments"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  disabled={!notificationSettings.emailNotifications}
                  control={
                    <Switch
                      checked={notificationSettings.statusUpdates}
                      onChange={handleNotificationChange}
                      name="statusUpdates"
                      color="primary"
                    />
                  }
                  label="Lead status updates"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  disabled={!notificationSettings.emailNotifications}
                  control={
                    <Switch
                      checked={notificationSettings.dailyDigest}
                      onChange={handleNotificationChange}
                      name="dailyDigest"
                      color="primary"
                    />
                  }
                  label="Daily summary digest"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  disabled={!notificationSettings.emailNotifications}
                  control={
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onChange={handleNotificationChange}
                      name="marketingEmails"
                      color="primary"
                    />
                  }
                  label="Marketing and promotional emails"
                />
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Security Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Manage your account security preferences
          </Typography>

          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 3,
              borderColor: 'divider'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onChange={handleSecurityChange}
                      name="twoFactorAuth"
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={500}>Two-factor authentication</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add an extra layer of security to your account
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', ml: 0 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" fontWeight={500} gutterBottom>
                  Session Timeout (minutes)
                </Typography>
                <TextField
                  select
                  fullWidth
                  name="sessionTimeout"
                  value={securitySettings.sessionTimeout}
                  onChange={handleSecurityChange}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">2 hours</option>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" fontWeight={500} gutterBottom>
                  Change Password
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="Current Password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      sx={{ mt: 1, borderRadius: 2 }}
                    >
                      Update Password
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        {/* Display Tab */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Display Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Customize your interface preferences
          </Typography>

          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 3,
              borderColor: 'divider'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={displaySettings.darkMode}
                      onChange={handleDisplayChange}
                      name="darkMode"
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={500}>Dark Mode</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Use dark theme across the application
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', ml: 0 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={displaySettings.compactMode}
                      onChange={handleDisplayChange}
                      name="compactMode"
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" fontWeight={500}>Compact Mode</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Reduce spacing and element sizes
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', ml: 0 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        {/* Language Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Language Settings
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Choose your preferred language
          </Typography>

          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 3,
              borderColor: 'divider'
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Application Language"
                  name="language"
                  value={displaySettings.language}
                  onChange={handleDisplayChange}
                  SelectProps={{
                    native: true,
                  }}
                  variant="outlined"
                >
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                </TextField>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>

        <Divider />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={saveSettings}
              sx={{ borderRadius: 2 }}
            >
              Save Settings
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
