import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Alert,
  AlertTitle,
  Avatar,
  useTheme
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  ArrowForward as ArrowForwardIcon,
  Check as CheckIcon,
  AccountBalanceWallet as WalletIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Validation schemas for each step
const personalInfoSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  idNumber: Yup.string().required('ID number is required')
});

const loanInfoSchema = Yup.object({
  loanAmount: Yup.number()
    .required('Loan amount is required')
    .min(1000, 'Minimum loan amount is $1,000')
    .max(100000, 'Maximum loan amount is $100,000'),
  loanPurpose: Yup.string().required('Loan purpose is required'),
  loanTerm: Yup.number().required('Loan term is required')
});

const employmentInfoSchema = Yup.object({
  employmentStatus: Yup.string().required('Employment status is required'),
  employerName: Yup.string().when('employmentStatus', {
    is: (value: string) => ['full-time', 'part-time', 'contract'].includes(value),
    then: () => Yup.string().required('Employer name is required'),
    otherwise: () => Yup.string()
  }),
  monthlyIncome: Yup.number().required('Monthly income is required').min(0, 'Income must be positive'),
  employmentDuration: Yup.string().required('Employment duration is required')
});

// Step labels
const steps = ['Personal Information', 'Loan Details', 'Employment Information', 'Review & Submit'];

const LeadForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  // Initial form values
  const initialValues = {
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    
    // Loan Info
    loanAmount: 5000,
    loanPurpose: '',
    loanTerm: 12,
    
    // Employment Info
    employmentStatus: '',
    employerName: '',
    monthlyIncome: 0,
    employmentDuration: '',
    
    // Additional fields for review
    agreeTerms: false
  };

  // Form handling with Formik
  const formik = useFormik({
    initialValues,
    validationSchema: 
      activeStep === 0 ? personalInfoSchema : 
      activeStep === 1 ? loanInfoSchema : 
      activeStep === 2 ? employmentInfoSchema : null,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (activeStep === steps.length - 1) {
        // Submit the form
        console.log('Form submitted:', values);
        
        // Simulate API call
        setTimeout(() => {
          setSubmitSuccess(true);
        }, 1500);
      } else {
        handleNext();
      }
    }
  });

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
    } else {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors).length === 0) {
          setActiveStep((prevStep) => prevStep + 1);
        } else {
          formik.setErrors(errors);
        }
      });
    }
  };

  // Loan purpose options
  const loanPurposeOptions = [
    'Debt Consolidation',
    'Home Improvement',
    'Medical Expenses',
    'Education',
    'Business',
    'Vehicle Purchase',
    'Wedding',
    'Vacation',
    'Other'
  ];

  // Employment status options
  const employmentStatusOptions = [
    'full-time',
    'part-time',
    'self-employed',
    'contract',
    'unemployed',
    'retired',
    'student'
  ];

  // Employment duration options
  const employmentDurationOptions = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '5-10 years',
    'More than 10 years'
  ];

  // Render step content based on active step
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="idNumber"
                name="idNumber"
                label="ID Number / Passport"
                value={formik.values.idNumber}
                onChange={formik.handleChange}
                error={formik.touched.idNumber && Boolean(formik.errors.idNumber)}
                helperText={formik.touched.idNumber && formik.errors.idNumber}
                variant="outlined"
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="loanAmount"
                name="loanAmount"
                label="Loan Amount"
                type="number"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                value={formik.values.loanAmount}
                onChange={formik.handleChange}
                error={formik.touched.loanAmount && Boolean(formik.errors.loanAmount)}
                helperText={formik.touched.loanAmount && formik.errors.loanAmount}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formik.touched.loanTerm && Boolean(formik.errors.loanTerm)}>
                <InputLabel id="loan-term-label">Loan Term (Months)</InputLabel>
                <Select
                  labelId="loan-term-label"
                  id="loanTerm"
                  name="loanTerm"
                  value={formik.values.loanTerm}
                  onChange={formik.handleChange}
                  label="Loan Term (Months)"
                >
                  {[6, 12, 24, 36, 48, 60].map((term) => (
                    <MenuItem key={term} value={term}>
                      {term} months
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.loanTerm && formik.errors.loanTerm && (
                  <FormHelperText>{formik.errors.loanTerm}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.loanPurpose && Boolean(formik.errors.loanPurpose)}>
                <InputLabel id="loan-purpose-label">Loan Purpose</InputLabel>
                <Select
                  labelId="loan-purpose-label"
                  id="loanPurpose"
                  name="loanPurpose"
                  value={formik.values.loanPurpose}
                  onChange={formik.handleChange}
                  label="Loan Purpose"
                >
                  {loanPurposeOptions.map((purpose) => (
                    <MenuItem key={purpose} value={purpose}>
                      {purpose}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.loanPurpose && formik.errors.loanPurpose && (
                  <FormHelperText>{formik.errors.loanPurpose}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.employmentStatus && Boolean(formik.errors.employmentStatus)}>
                <InputLabel id="employment-status-label">Employment Status</InputLabel>
                <Select
                  labelId="employment-status-label"
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formik.values.employmentStatus}
                  onChange={formik.handleChange}
                  label="Employment Status"
                >
                  {employmentStatusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.employmentStatus && formik.errors.employmentStatus && (
                  <FormHelperText>{formik.errors.employmentStatus}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {['full-time', 'part-time', 'contract'].includes(formik.values.employmentStatus) && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="employerName"
                  name="employerName"
                  label="Employer Name"
                  value={formik.values.employerName}
                  onChange={formik.handleChange}
                  error={formik.touched.employerName && Boolean(formik.errors.employerName)}
                  helperText={formik.touched.employerName && formik.errors.employerName}
                  variant="outlined"
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="monthlyIncome"
                name="monthlyIncome"
                label="Monthly Income"
                type="number"
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                }}
                value={formik.values.monthlyIncome}
                onChange={formik.handleChange}
                error={formik.touched.monthlyIncome && Boolean(formik.errors.monthlyIncome)}
                helperText={formik.touched.monthlyIncome && formik.errors.monthlyIncome}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={formik.touched.employmentDuration && Boolean(formik.errors.employmentDuration)}>
                <InputLabel id="employment-duration-label">Employment Duration</InputLabel>
                <Select
                  labelId="employment-duration-label"
                  id="employmentDuration"
                  name="employmentDuration"
                  value={formik.values.employmentDuration}
                  onChange={formik.handleChange}
                  label="Employment Duration"
                  disabled={['unemployed', 'student'].includes(formik.values.employmentStatus)}
                >
                  {employmentDurationOptions.map((duration) => (
                    <MenuItem key={duration} value={duration}>
                      {duration}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.employmentDuration && formik.errors.employmentDuration && (
                  <FormHelperText>{formik.errors.employmentDuration}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        );
      case 3:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              <AlertTitle>Please Review Your Information</AlertTitle>
              Ensure all details are correct before submitting your loan application.
            </Alert>
            
            <Typography variant="h6" gutterBottom>Personal Information</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                <Typography>{formik.values.firstName} {formik.values.lastName}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">ID Number</Typography>
                <Typography>{formik.values.idNumber}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography>{formik.values.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                <Typography>{formik.values.phone}</Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom>Loan Details</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">Loan Amount</Typography>
                <Typography>${formik.values.loanAmount}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">Term</Typography>
                <Typography>{formik.values.loanTerm} months</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="text.secondary">Purpose</Typography>
                <Typography>{formik.values.loanPurpose}</Typography>
              </Grid>
            </Grid>
            
            <Typography variant="h6" gutterBottom>Employment Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Employment Status</Typography>
                <Typography>
                  {formik.values.employmentStatus.charAt(0).toUpperCase() + 
                   formik.values.employmentStatus.slice(1).replace('-', ' ')}
                </Typography>
              </Grid>
              {['full-time', 'part-time', 'contract'].includes(formik.values.employmentStatus) && (
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Employer</Typography>
                  <Typography>{formik.values.employerName}</Typography>
                </Grid>
              )}
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Monthly Income</Typography>
                <Typography>${formik.values.monthlyIncome}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" color="text.secondary">Employment Duration</Typography>
                <Typography>{formik.values.employmentDuration}</Typography>
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return null;
    }
  };

  // Success message after form submission
  if (submitSuccess) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.default',
          py: 8,
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
              overflow: 'visible',
              textAlign: 'center',
              p: 4,
            }}
            className="fadeIn"
          >
            <Box mb={3} display="flex" justifyContent="center">
              <Avatar
                sx={{
                  bgcolor: 'success.main',
                  width: 80,
                  height: 80,
                  boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)',
                  mb: 3,
                }}
              >
                <CheckIcon fontSize="large" />
              </Avatar>
            </Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
              Application Submitted!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Your loan application has been successfully submitted. Our team will review your application
              and contact you soon.
            </Typography>
            <Typography variant="body1" fontWeight={600} paragraph color="primary">
              Application Reference: {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/')}
              sx={{ mt: 2, px: 4, py: 1.5, borderRadius: 2 }}
            >
              Back to Home
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 8,
        backgroundImage: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
      }}
    >
      <Container maxWidth="md">
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    width: 40,
                    height: 40,
                    mr: 1,
                  }}
                >
                  <WalletIcon />
                </Avatar>
                <Typography variant="h4" component="h1" fontWeight={700}>
                  LoamApp
                </Typography>
              </Box>
              <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
                Personal Loan Application
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center">
                Complete the form below to apply for a personal loan
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
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                
                <form onSubmit={formik.handleSubmit}>
                  {getStepContent(activeStep)}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      startIcon={<ArrowBackIcon />}
                      sx={{ borderRadius: 2 }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      endIcon={activeStep === steps.length - 1 ? <CheckIcon /> : <ArrowForwardIcon />}
                      sx={{ borderRadius: 2 }}
                      type={activeStep === steps.length - 1 ? 'submit' : 'button'}
                    >
                      {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LeadForm;
