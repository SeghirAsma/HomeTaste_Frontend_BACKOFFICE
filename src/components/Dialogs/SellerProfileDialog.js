import React from "react";
import {
  Dialog, DialogContent, DialogTitle, Avatar, Box, Typography,
  Grid, Divider
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function SellerProfileDialog({ open, onClose, seller }) {
  if (!seller) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 'fit-content', minWidth: 300,   maxWidth: '90vw' }, }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, borderBottom: "1px solid #ccc" }}>
        <VisibilityIcon color="primary" />
        <Typography variant="h6" fontWeight="bold">Seller Profile</Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ p: 2 }}>
          {/* Avatar et info de base */}
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar 
                src={seller.profileImgUrl} 
                sx={{ width: 100, height: 100, mb: 1 }} 
              />
              <Typography variant="h6" fontWeight="bold" align="center">
                {seller.lastName} {seller.firstName}
              </Typography>
              <Typography color="text.secondary" align="center">
                {seller.email}
              </Typography>
            </Box>
          </Grid>
        </Grid>


          <Divider sx={{ my: 2 }} />

          {/* Personal Info et Company Info côte à côte */}
        <Grid container spacing={12}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Personal Information</Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography><strong>Phone Number:</strong> {seller.phoneNumber}</Typography>
            <Typography><strong>Date Of Birth:</strong> {seller.dateOfBirth}</Typography>
            <Typography><strong>Address:</strong> {seller.address}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" fontWeight="bold">Company Information</Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography><strong>Business Name:</strong> {seller.businessName}</Typography>
            <Typography><strong>Adresse:</strong> {seller.address}</Typography>
          </Grid>
        </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Business Details toujours en dessous */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">Business Details</Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography sx={{ wordBreak: "break-word", maxWidth: 600, whiteSpace: 'pre-line' }}>
                <strong>Category:</strong> {seller.category}
              </Typography>

              <Typography sx={{ wordBreak: "break-word", mt: 1, maxWidth: 600, whiteSpace: 'pre-line' }}>
                <strong>Description:</strong> {seller.description}
              </Typography>

               <Typography sx={{ wordBreak: "break-word", mt: 1, maxWidth: 600 }}>
                <strong>WebSites:</strong>
              </Typography>
              {seller.socialLinks && seller.socialLinks.length > 0 ? (
                seller.socialLinks.map((link, index) => (
                  <Typography key={index} component="div" sx={{ wordBreak: "break-word", maxWidth: 600 }}>
                    <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                  </Typography>
                ))
              ) : (
                <Typography color="text.secondary">No site available</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>


  );
}
