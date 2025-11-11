import React, { useState } from "react";
import {
  Box, Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Avatar, IconButton,  Tooltip, Stack, Grid, Card, CardContent, Typography, Select, MenuItem
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
import { LineChart, Line, ResponsiveContainer } from "recharts";

const drawerWidth = 240;

// --- Données ---
const sellers = [
  { id: 1, firstName : "Alain", lastName : "Savery", commercialName: "Green Market", image: "https://i.pravatar.cc/100?img=1", phone: "+33 6 12 34 56 78", dob: "1998-03-12", email: "contact@greenmarket.fr", companyName: "Green Market SARL", address: "12 Rue des Lilas, Paris", city: "Paris", country: "France", category: "Produits écologiques", website: "https://greenmarket.fr", description: "Vente de produits écologiques faits maison." },
  { id: 2, firstName : "Emilie", lastName : "Borny", commercialName: "EcoStyle", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
  { id: 3, firstName : "Belle", lastName : "Johny", commercialName: "FAshionDress", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
  { id: 4, firstName : "Moley", lastName : "Astanzi", commercialName: "BoxStyle", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
  { id: 4, firstName : "Moley", lastName : "Astanzi", commercialName: "BoxStyle", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
  { id: 4, firstName : "Moley", lastName : "Astanzi", commercialName: "BoxStyle", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
  { id: 4, firstName : "Moley", lastName : "Astanzi", commercialName: "BoxStyle", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
  { id: 4, firstName : "Moley", lastName : "Astanzi", commercialName: "BoxStyle", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
  { id: 4, firstName : "Moley", lastName : "Astanzi", commercialName: "BoxStyle", image: "https://i.pravatar.cc/100?img=2", phone: "+33 7 45 67 89 10", dob: "1995-07-08", email: "hello@ecostyle.com", companyName: "EcoStyle SAS", address: "45 Avenue de Lyon, Lyon", city: "Lyon", country: "France", category: "Vêtements durables", website: "https://ecostyle.com", description: "Création de vêtements éthiques et durables." },
];


export default function Dashboard() {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [reason, setReason] = useState("");

  //donnes card
const [period, setPeriod] = useState("1 M");
const stats = {
  "1 W": { comptesCrees: 12 },
  "1 M": { comptesCrees: 48},
  "3 M": { comptesCrees: 120 },
};
const data = stats[period];

//courbe
const chartData = [
  { name: "Lun", value: 10 },
  { name: "Mar", value: 12 },
  { name: "Mer", value: 8 },
  { name: "Jeu", value: 15 },
  { name: "Ven", value: 20 },
  { name: "Sam", value: 18 },
  { name: "Dim", value: 22 },
];
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


  // --- Actions Vendeur ---
  const handleOpenProfile = (seller) => { setSelectedSeller(seller); setOpenProfile(true); };
  const handleCloseProfile = () => { setOpenProfile(false); setSelectedSeller(null); };
  const handleApprove = (seller) => { setSelectedSeller(seller); setOpenApprove(true); };
  const handleConfirmApprove = () => { console.log("Approuvé :", selectedSeller); setOpenApprove(false); setSelectedSeller(null); };
  const handleReject = (seller) => { setSelectedSeller(seller); setOpenReject(true); };
  const handleConfirmReject = () => { console.log("Rejeté :", selectedSeller, "Raison :", reason); setOpenReject(false); setSelectedSeller(null); setReason(""); };

  //pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 6; // nombre d’éléments max par page
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentSellers = sellers.slice(startIndex, endIndex);
  const pageCount = Math.ceil(sellers.length / rowsPerPage);

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
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        {/* Carte de la courbe */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #8E2DE2 0%, #200751ff 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Évolution des comptes créés
              </Typography>

              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  borderRadius: 2,
                  "& .MuiSvgIcon-root": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  minWidth: 120,
                }}
              >
                <MenuItem value="1 W">1 week</MenuItem>
                <MenuItem value="1 M">1 month</MenuItem>
                <MenuItem value="3 M">3 month</MenuItem>
              </Select>
            </Box>

            <Box sx={{ width: "100%", height: 45 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#80D8FF"
                  strokeWidth={2.5}
                  dot={{ r: 3, stroke: "#80D8FF", fill: "#fff" }}
                />

                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        {/* Comptes créés */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes créés ({period})
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {data.comptesCrees}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    {/* Comptes approuvés */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes approuvés
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              40
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    {/* Comptes nn approuvés */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes non approuvés
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              20
            </Typography>
          </CardContent>
        </Card>
      </Grid>

   {/* Comptes en cours */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #F7971E 0%, #FFD200 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes en cours
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              25
            </Typography>
          </CardContent>
        </Card>

      </Grid>
    </Grid>


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
                  <TableCell><Avatar src={seller.image} alt={seller.firstName} />
                  </TableCell>
                  <TableCell>{seller.firstName}</TableCell>
                  <TableCell>{seller.lastName}</TableCell>
                  <TableCell>{seller.commercialName}</TableCell>
                  <TableCell>{seller.email}</TableCell>
                  <TableCell>{seller.dob}</TableCell>
                  <TableCell>{seller.phone}</TableCell>
                 <TableCell align="center">
                    <Tooltip title="Voir le profil" arrow>
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
                      <Tooltip title="Approuver" arrow>
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

                      <Tooltip title="Rejeter" arrow>
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


