import React, { useState,useEffect  } from "react";
import {
  Box, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Avatar, IconButton,  Tooltip, Stack
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomerAppBar from "../components/CustomerAppBar";
import CustomerDrawer from "../components/CustomerDrawer";
import SellerProfileDialog from "../components/Dialogs/SellerProfileDialog";
import ApproveSellerDialog from "../components/Dialogs/ApproveSellerDialog";
import RejectSellerDialog from "../components/Dialogs/RejectSellerDialog";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import DashboardStats from "../components/DashboardStats";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const drawerWidth = 240;

export default function Dashboard() {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [reason, setReason] = useState("");
  const [sellersAppending, setSellersAppending] = useState([]);
  const [sellersRejected, setSellersRejected] = useState([]);
  const [sellersApproved, setSellersApproved] = useState([]);
  const [sellerCount, setSellerCount] = useState(0);
  const [allSellers, setAllSellers] = useState([]);

  const pendingAccountsCount = sellersAppending.length;
  const ArchivedAccountsCount = sellersRejected.length;
  const ApprovedAccountsCount = sellersApproved.length;
  
  const [stats, setStats] = useState({ "1 W": 0, "1 M": 0, "3 M": 0,"1 Y": 0 });
  const [period, setPeriod] = useState("1 M");



//courbe
const [chartData, setChartData] = useState([]);
  // --- AppBar Menu ---
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleMobileMenuOpen = (e) => setMobileMoreAnchorEl(e.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

    // --- drawer ---
  const [drawerOpen, setDrawerOpen] = useState(true);
  
    //pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 6; // nombre d’éléments max par page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentSellers = sellersAppending.slice(startIndex, endIndex);
  const pageCount = Math.ceil(sellersAppending.length / rowsPerPage);

  // --- Actions dialog ---
  const handleOpenProfile = (seller) => { setSelectedSeller(seller); setOpenProfile(true); };
  const handleCloseProfile = () => { setOpenProfile(false); setSelectedSeller(null); };
  const handleApprove = (seller) => { setSelectedSeller(seller); setOpenApprove(true); };
  const handleReject = (seller) => { setSelectedSeller(seller); setOpenReject(true); };

//approve seller
 const handleConfirmApprove = () => {
  const storedToken = localStorage.getItem("token");
  if (!selectedSeller) return;

  axios.put(`http://localhost:8084/api/users/approve/${selectedSeller.id}`, {}, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  .then(() => {
    setSellersAppending(prev => prev.filter(s => s.id !== selectedSeller.id));
    setSellersApproved(prev => [...prev, selectedSeller]);
    setOpenApprove(false);
    setSelectedSeller(null);
    toast.success("Seller approved successfully!");
   
  })
  .catch((err) => {
    console.error("Erreur lors de l'approbation :", err);
     toast.error("Failed to approve seller");
  });
};

//reject seller
 const handleConfirmReject = () => {
  const storedToken = localStorage.getItem("token");
  if (!selectedSeller) return;

  axios.put(`http://localhost:8084/api/users/reject/${selectedSeller.id}`, { reason: reason }, {
    headers: {
      Authorization: `Bearer ${storedToken}`
    }
  })
  .then(() => {
    setSellersAppending(prev => prev.filter(s => s.id !== selectedSeller.id));
    setSellersRejected(prev => [...prev, selectedSeller]);
    setOpenReject(false);
    setSelectedSeller(null);
    toast.success("Seller rejected successfully!");
   
  })
  .catch((err) => {
    console.error("Erreur lors de l'approbation :", err);
     toast.error("Failed to reject seller");
  });
};

  //get users en cours
  useEffect(() => {
     const storedToken = localStorage.getItem("token") ;
    axios.get("http://localhost:8084/api/users/UsersNotApproved", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          }})
    .then((res) => {
      setSellersAppending(res.data);
    })
    .catch((err) => {
      console.error("Erreur API :", err);
    });
  }, []);

  //get users rejected
  useEffect(() => {
     const storedToken = localStorage.getItem("token") ;
    axios.get("http://localhost:8084/api/users/UsersRejected", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          }})
    .then((res) => {
      setSellersRejected(res.data);
    })
    .catch((err) => {
      console.error("Erreur API :", err);
    });
  }, []);

  //get users approved
  useEffect(() => {
     const storedToken = localStorage.getItem("token") ;
    axios.get("http://localhost:8084/api/users/UsersApproved", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          }})
    .then((res) => {
      setSellersApproved(res.data);
    })
    .catch((err) => {
      console.error("Erreur API :", err);
    });
  }, []);


  //get all user (seller)
  useEffect(() => {
    axios.get("http://localhost:8084/api/users/all")
      .then((res) => {
        const allUsers = res.data;
        const sellers = allUsers.filter(user => user.role === "SELLER");
        setAllSellers(sellers);       
        setSellerCount(sellers.length); 
      })
      .catch((err) => console.error(err));
  }, []);


  useEffect(() => {
    const newStats = {
      "1 W": calculateCreatedAccounts(allSellers, "1 W"),
      "1 M": calculateCreatedAccounts(allSellers, "1 M"),
      "3 M": calculateCreatedAccounts(allSellers, "3 M"),
      "1 Y": calculateCreatedAccounts(allSellers, "1 Y"),
    };
    setStats(newStats);
  }, [allSellers]);

  
  // Fonction pour filtrer les sellers selon période pour comptes crees
  const calculateCreatedAccounts = (sellers, period) => {
    const now = new Date();
    return sellers.filter(seller => {
      const createdAt = new Date(seller.creationDate);
      if (isNaN(createdAt)) return false; 

      if (period === "1 W") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return createdAt >= oneWeekAgo;
      }
      if (period === "1 M") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return createdAt >= oneMonthAgo;
      }
      if (period === "3 M") {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        return createdAt >= threeMonthsAgo;
      }

      if (period === "1 Y") {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1);
      return createdAt >= oneYearAgo;
      }
      return false;
    }).length;
  };


  useEffect(() => {
    const count = calculateCreatedAccounts(allSellers, period);
    setStats(prev => ({ ...prev, [period]: count }));
  }, [period, allSellers]);

  // Fonction pour filtrer les sellers selon période dans chart
  const generateChartData = (users, period) => {
    const now = new Date();
    let data = [];

    if (period === "1 W") {
      for (let i = 6; i >= 0; i--) {
        const day = new Date();
        day.setDate(now.getDate() - i);
        const dayStr = day.toLocaleDateString('en-US', { weekday: 'short' }); 
        const count = users.filter(u => {
          const created = new Date(u.creationDate);
          return created.toDateString() === day.toDateString();
        }).length;
        data.push({ name: dayStr, value: count });
      }
    }

    if (period === "1 M") {
      for (let i = 29; i >= 0; i--) {
        const day = new Date();
        day.setDate(now.getDate() - i);
        const dayStr = `${day.getDate()}/${day.getMonth() + 1}`;
        const count = users.filter(u => {
          const created = new Date(u.creationDate);
          return created.toDateString() === day.toDateString();
        }).length;
        data.push({ name: dayStr, value: count });
      }
    }

    if (period === "3 M" || period === "1 Y") {
      const monthsCount = period === "3 M" ? 3 : 12;
      for (let i = monthsCount - 1; i >= 0; i--) {
        const month = new Date();
        month.setMonth(now.getMonth() - i);
        const monthStr = month.toLocaleString('default', { month: 'short' });
        const count = users.filter(u => {
          const created = new Date(u.creationDate);
          return created.getMonth() === month.getMonth() &&
                created.getFullYear() === month.getFullYear();
        }).length;
        data.push({ name: monthStr, value: count });
      }
    }
    return data;
  };

  useEffect(() => {
    const data = generateChartData(allSellers, period);
    setChartData(data);
  }, [allSellers, period]);
  
  return (
    <Box sx={{ display: 'flex' }}>
      {/* --- AppBar --- */}
      <CustomerAppBar
        menuId={menuId}
        mobileMenuId={mobileMenuId}
        anchorEl={anchorEl}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        handleProfileMenuOpen={handleProfileMenuOpen}
        handleMobileMenuOpen={handleMobileMenuOpen}
        handleMenuClose={handleMenuClose}
        handleMobileMenuClose={handleMobileMenuClose}
      />

      {/* --- Drawer --- */}
      <CustomerDrawer open={drawerOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3, 
          width: `calc(100% - ${drawerWidth}px)`, 
          overflowX: 'auto',   
        }}
      >
        <Toolbar />

        {/* --- statistiques --- */}
        <DashboardStats
          period={period}
          setPeriod={setPeriod}
          chartData={chartData}
          sellerCount={sellerCount}
          ApprovedAccountsCount={ApprovedAccountsCount}
          ArchivedAccountsCount={ArchivedAccountsCount}
          pendingAccountsCount={pendingAccountsCount}
          stats={stats}
        />

        {/* --- Tableau des comptes vendeurs --- */}
        <TableContainer component={Paper} sx={{ maxWidth: '100%', mx: "auto", mt: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell >First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Address Mail</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell align="center"><strong>Action</strong></TableCell>
                <TableCell align="center"><strong>Decision</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentSellers.map((seller, index) => (
                <TableRow key={index}>
                  <TableCell><Avatar src={seller.profileImgUrl} />
                  </TableCell>
                  <TableCell>{seller.firstName}</TableCell>
                  <TableCell>{seller.lastName}</TableCell>
                  <TableCell>{seller.businessName}</TableCell>
                  <TableCell>{seller.email}</TableCell>
                  <TableCell>{seller.dateOfBirth}</TableCell>
                  <TableCell>{seller.phoneNumber}</TableCell>
                 <TableCell align="center">
                    <Tooltip title="view profile" arrow>
                      <IconButton
                        onClick={() => handleOpenProfile(seller)}
                        sx={{
                          color: "#6A1B9A", 
                          "&:hover": { color: "#4A148C", transform: "scale(1.1)" },
                          transition: "all 0.2s ease",
                        }}
                      >
                       <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>

                  <TableCell align="center">
                    <Stack direction="row" justifyContent="center">
                      <Tooltip title="Approve" arrow>
                        <IconButton
                          onClick={() => handleApprove(seller)}
                          sx={{
                            color: "#2e7d32",
                            "&:hover": { color: "#1b5e20", transform: "scale(1.1)" },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Reject" arrow>
                        <IconButton
                          onClick={() => handleReject(seller)}
                          sx={{
                            color: "#e62727ff",
                            "&:hover": { color: "#b71c1c", transform: "scale(1.1)" },
                            transition: "all 0.2s ease",
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- Pagination --- */}
        <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
          <Pagination
            count={pageCount}
              page={page}
              onChange={(e, value) => setPage(value)}
              variant="outlined"
              color="secondary"
            />
        </Stack>

        {/* --- Dialog Profil --- */}
        <SellerProfileDialog
          open={openProfile}
          onClose={handleCloseProfile}
          seller={selectedSeller}
        />
        {/* --- Dialog Approve --- */}
        <ApproveSellerDialog
          open={openApprove}
          onClose={() => setOpenApprove(false)}
          onConfirm={handleConfirmApprove}
          seller={selectedSeller}
        />
        <ToastContainer position="top-right" autoClose={2000} />

        {/* --- Dialog Reject --- */}
        <RejectSellerDialog
          open={openReject}
          onClose={() => setOpenReject(false)}
          onConfirm={handleConfirmReject}
          seller={selectedSeller}
          reason={reason}
          setReason={setReason}
        />

      </Box>
    </Box>
  );
}


