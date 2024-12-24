import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import AddIcon from '@mui/icons-material/Add';
import AssetsModal from "../assets-gtm/assets-component";
import styled from "./gtm-configuration.module.scss";
import { useDispatch } from "react-redux";
import classnames from "classnames/bind";
import { useState } from "react";
import { setSelectedTagType } from "../../../redux/tag-slice/assetSlice";


const cx = classnames.bind(styled);
const recentSales = [
  { id: "TR001", customer: "John Doe", amount: 1200, date: "2024-01-15" },
  { id: "TR002", customer: "Jane Smith", amount: 850, date: "2024-01-14" },
  { id: "TR003", customer: "Bob Wilson", amount: 2300, date: "2024-01-13" },
  { id: "TR004", customer: "Alice Brown", amount: 760, date: "2024-01-12" },
  { id: "TR005", customer: "Charlie Davis", amount: 1500, date: "2024-01-11" },
];

type ButtonListStyle={
  label: string;
  icon: JSX.Element;
}



const buttonList:ButtonListStyle[]= [
  {
    label: "Tag",
    icon: <AddIcon />
  },
  {
    label: "Trigger",
    icon: <AddIcon />
  },
  {
    label: "Variable",
    icon: <AddIcon />
  },
  {
    label: "Folder",
    icon: <AddIcon />
  }
]

const GtmConfigurationComponent = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(setSelectedTagType(null));
    setIsModalOpen(false);
  };

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null ,newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | null) => {
    if(event){
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    }
  };

  return (
    <div className={cx("container")}>
      <div>
        <div className={cx("section-actions")}>
          {buttonList.map((buttonItem, index) => (
            <>
            <div
              key={index}
              onClick={() => openModal(buttonItem.label)} 
              className={cx("button")}
            >
              <span>{buttonItem.label}</span>
              {buttonItem.icon}
            </div>
            
            </>
          ))}
        </div>
        
        <AssetsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          type={modalType}
          name=""    
          children={null} icon={undefined}     
          >
       </AssetsModal>

    </div>

      {/* <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sales Trend
            </Typography>
            <Line data={salesData} options={{ responsive: true }} />
          </Paper>
        </Grid>

        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sales by Category
            </Typography>
            <Bar data={categoryData} options={{ responsive: true }} />
          </Paper>
        </Grid>
      </Grid> */}
      
      <Paper sx={{ width: "100vw", overflow: "hidden", textAlign: "start", marginBottom: "3rem" }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Tag
        </Typography>
        <TableContainer className={cx("section-table")}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tag Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Triggers</TableCell>
                <TableCell>Updated date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentSales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>${row.amount}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <span>Save</span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recentSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Paper sx={{ width: "100vw", overflow: "hidden", textAlign: "start" }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Recent Sales
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentSales
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell align="right">${row.amount}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={recentSales.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default GtmConfigurationComponent

