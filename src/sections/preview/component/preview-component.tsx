import {
  Box,
  Button,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

const PreviewComponent = () => {
  // Example data for each table
  const activeUserStats = [
    { day: 1, users: 0 },
    { day: 2, users: 0 },
    { day: 3, users: 5 },
    { day: 4, users: 10 },
  ];

  const eventStats = [
    { eventName: "PAGE_VIEW", count: 25 },
    { eventName: "SCROLL", count: 21 },
    { eventName: "FIRST_VISIT", count: 21 },
    { eventName: "SESSION_START", count: 10 },
  ];

  const countryStats = [
    { country: "RU", users: 5 },
    { country: "SC", users: 4 },
    { country: "VN", users: 2 },
    { country: "DE", users: 1 },
  ];

  const referralStats = [
    { channel: "DIRECT", count: 25 },
    { channel: "REFERRAL", count: 21 },
  ];

  return (
    <Box sx={{ padding: 4,backgroundColor: 'rgba(244,247,252,0.75)' }}>
      {/* Header */}
      <Grid2
        container
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{backgroundColor: 'rgba(244,247,252,0.75)'}}
      >
        <Box sx={{display: "flex", gap: '1rem',alignItems: 'center'}}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <TextField variant="outlined" size="small" placeholder="Search..." />
        </Box>
        <Box sx={{display: "flex", gap: '3rem',alignItems: 'center'}}>
          <Button variant="contained" color="primary">
            Back
          </Button>
          <Button variant="outlined" color="primary">
            <FileDownloadIcon/>
            Download
          </Button>
        </Box>
      </Grid2>

      {/* Statistics Grid2 */}
      <Grid2 container spacing={3}>
        {/* Active User Statistics */}
        <Grid2 component="div">
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
              Active User Statistics
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Day N</TableCell>
                    <TableCell align="right">Number of Active Users</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeUserStats.map((row) => (
                    <TableRow key={row.day}>
                      <TableCell>{row.day}</TableCell>
                      <TableCell align="right">{row.users}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>

        {/* Event Statistics */}
        <Grid2 component="div">
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
              Event Statistics
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Event Name</TableCell>
                    <TableCell align="right">Number of Events</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventStats.map((row) => (
                    <TableRow key={row.eventName}>
                      <TableCell>{row.eventName}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>

        {/* Country Statistics */}
        <Grid2 component="div">
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
              Statistics of Users from Countries
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell align="right">Active Users</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {countryStats.map((row) => (
                    <TableRow key={row.country}>
                      <TableCell>{row.country}</TableCell>
                      <TableCell align="right">{row.users}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>

        {/* Referral Statistics */}
        <Grid2 component="div">
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" mb={2}>
              Where Do Your New Users Come From
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Session Primary Channel Group</TableCell>
                    <TableCell align="right">Number of Events</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referralStats.map((row) => (
                    <TableRow key={row.channel}>
                      <TableCell>{row.channel}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PreviewComponent;
