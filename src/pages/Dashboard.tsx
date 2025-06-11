import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Person as PersonIcon,
  AttachMoney as AttachMoneyIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Mock data for charts and tables
const barChartData = [
  { name: 'Jan', leads: 45 },
  { name: 'Feb', leads: 52 },
  { name: 'Mar', leads: 48 },
  { name: 'Apr', leads: 61 },
  { name: 'May', leads: 55 },
  { name: 'Jun', leads: 67 },
];

const leadStatusData = [
  { name: 'New', value: 35, color: '#3b82f6' },
  { name: 'In Review', value: 25, color: '#f59e0b' },
  { name: 'Approved', value: 20, color: '#10b981' },
  { name: 'Rejected', value: 15, color: '#ef4444' },
  { name: 'Pending Info', value: 5, color: '#8b5cf6' },
];

const recentLeadsData = [
  {
    id: 'L1001',
    name: 'John Smith',
    email: 'john.smith@example.com',
    amount: 25000,
    status: 'New',
    date: '2025-06-10',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random',
  },
  {
    id: 'L1002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    amount: 15000,
    status: 'In Review',
    date: '2025-06-09',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random',
  },
  {
    id: 'L1003',
    name: 'Michael Williams',
    email: 'mwilliams@example.com',
    amount: 50000,
    status: 'Approved',
    date: '2025-06-08',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Williams&background=random',
  },
  {
    id: 'L1004',
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    amount: 35000,
    status: 'Rejected',
    date: '2025-06-07',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Brown&background=random',
  },
  {
    id: 'L1005',
    name: 'Daniel Lee',
    email: 'd.lee@example.com',
    amount: 20000,
    status: 'Pending Info',
    date: '2025-06-06',
    avatar: 'https://ui-avatars.com/api/?name=Daniel+Lee&background=random',
  },
];

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Helper function to get status chip color
const getStatusChipColor = (status: string): string => {
  switch (status) {
    case 'New': return '#3b82f6';
    case 'In Review': return '#f59e0b';
    case 'Approved': return '#10b981';
    case 'Rejected': return '#ef4444';
    case 'Pending Info': return '#8b5cf6';
    default: return '#9ca3af';
  }
};

const Dashboard = () => {
  const theme = useTheme();
  const [leads, setLeads] = useState(recentLeadsData);
  const [stats, setStats] = useState({
    totalLeads: 100,
    totalAmount: 2450000,
    approvalRate: 68,
    conversionRate: 42,
  });

  useEffect(() => {
    // In a real application, fetch data from API here
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/apply"
          sx={{ borderRadius: 2 }}
        >
          New Lead
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main', 
                    width: 56, 
                    height: 56, 
                    boxShadow: '0 4px 8px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  <AssignmentIcon fontSize="medium" />
                </Avatar>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h5" component="div" sx={{ mb: -1 }}>
                    {stats.totalLeads}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total Leads
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                <Typography variant="caption" color="success.main" fontWeight={500}>
                  +8% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'secondary.main', 
                    width: 56, 
                    height: 56, 
                    boxShadow: '0 4px 8px rgba(16, 185, 129, 0.5)'
                  }}
                >
                  <AttachMoneyIcon fontSize="medium" />
                </Avatar>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h5" component="div" sx={{ mb: -1 }}>
                    {formatCurrency(stats.totalAmount)}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Total Amount
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                <Typography variant="caption" color="success.main" fontWeight={500}>
                  +12% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#8b5cf6', 
                    width: 56, 
                    height: 56, 
                    boxShadow: '0 4px 8px rgba(139, 92, 246, 0.5)'
                  }}
                >
                  <CheckCircleIcon fontSize="medium" />
                </Avatar>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h5" component="div" sx={{ mb: -1 }}>
                    {stats.approvalRate}%
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Approval Rate
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                <Typography variant="caption" color="success.main" fontWeight={500}>
                  +5% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0} 
            sx={{ 
              borderRadius: 4, 
              height: '100%',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#f59e0b', 
                    width: 56, 
                    height: 56, 
                    boxShadow: '0 4px 8px rgba(245, 158, 11, 0.5)'
                  }}
                >
                  <PersonIcon fontSize="medium" />
                </Avatar>
                <Box sx={{ ml: 'auto' }}>
                  <Typography variant="h5" component="div" sx={{ mb: -1 }}>
                    {stats.conversionRate}%
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Conversion Rate
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                <Typography variant="caption" color="error.main" fontWeight={500}>
                  -2% from last month
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ borderRadius: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader 
              title={
                <Typography variant="h6" fontWeight={600}>
                  Lead Applications (Last 6 Months)
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300, p: 1 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="leads" 
                      name="Leads" 
                      fill="#3b82f6" 
                      radius={[4, 4, 0, 0]}
                      barSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ borderRadius: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
            <CardHeader 
              title={
                <Typography variant="h6" fontWeight={600}>
                  Lead Status
                </Typography>
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ height: 300, p: 1, display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {leadStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend align="center" verticalAlign="bottom" layout="horizontal" />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Leads Table */}
      <Card elevation={0} sx={{ borderRadius: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader 
          title={
            <Typography variant="h6" fontWeight={600}>
              Recent Leads
            </Typography>
          }
          action={
            <Button 
              component={Link}
              to="/leads"
              color="primary"
            >
              View All
            </Button>
          }
        />
        <Divider />
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client</TableCell>
                  <TableCell>Loan Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow 
                    key={lead.id} 
                    hover 
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={lead.avatar} sx={{ mr: 2, width: 40, height: 40 }} />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {lead.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {lead.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {formatCurrency(lead.amount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={lead.status} 
                        size="small"
                        sx={{ 
                          bgcolor: `${getStatusChipColor(lead.status)}20`,
                          color: getStatusChipColor(lead.status),
                          fontWeight: 600,
                          borderRadius: '6px',
                          border: `1px solid ${getStatusChipColor(lead.status)}40`,
                        }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(lead.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        component={Link} 
                        to={`/leads/${lead.id}`}
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
