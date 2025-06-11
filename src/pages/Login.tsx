import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Paper
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setIsLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 8,
        backgroundImage: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 4,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '16px',
                  bgcolor: 'primary.main',
                  color: 'white',
                  mb: 2,
                  boxShadow: '0 8px 16px rgba(37, 99, 235, 0.2)',
                }}
              >
                <LockIcon fontSize="large" />
              </Paper>
              <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
                Welcome to LoamApp
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Sign in to access the loan management system
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
                overflow: 'visible',
              }}
              className="fadeIn"
            >
              <CardContent sx={{ p: 4 }}>
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      className="input-focus-effect"
                    />
                  </Box>

                  <Box mb={4}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleTogglePasswordVisibility}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      className="input-focus-effect"
                    />
                  </Box>

                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    sx={{
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                    }}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <Box mt={3}>
                    <Divider>
                      <Typography variant="body2" color="text.secondary">
                        Demo Accounts
                      </Typography>
                    </Divider>
                  </Box>

                  <Box mt={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          size="medium"
                          variant="outlined"
                          onClick={() => {
                            setEmail('admin@loamapp.com');
                            setPassword('admin123');
                          }}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                          }}
                        >
                          Admin Demo
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          fullWidth
                          size="medium"
                          variant="outlined"
                          onClick={() => {
                            setEmail('agent@loamapp.com');
                            setPassword('agent123');
                          }}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                          }}
                        >
                          Agent Demo
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
