import React from "react";
import {
  Dialog, DialogContent, DialogTitle, Avatar, Box, Typography,
  Grid, Divider
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function SellerProfileDialog({ open, onClose, seller }) {
  if (!seller) return null;

  return (
  <Dialog  open={open}
      onClose={onClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, borderBottom: "1px solid #ccc" }}>
             <VisibilityIcon color="primary" />
             <Typography variant="h6" fontWeight="bold">
              Profil du Vendeur
            </Typography>
          </DialogTitle>
          <DialogContent>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Avatar src={seller.image} sx={{ width: 100, height: 100, mx: "auto", mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold">{seller.commercialName}</Typography>
                    <Typography color="text.secondary">{seller.email}</Typography>
                  </Grid>
                  <Grid item xs={12}><Divider sx={{ my: 2 }} /></Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Informations Personnelles</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography><strong>Téléphone :</strong> {seller.phone}</Typography>
                    <Typography><strong>Date de naissance :</strong> {seller.dob}</Typography>
                    <Typography><strong>Pays :</strong> {seller.country}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" fontWeight="bold">Entreprise</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography><strong>Nom :</strong> {seller.companyName}</Typography>
                    <Typography><strong>Adresse :</strong> {seller.address}</Typography>
                    <Typography><strong>Ville :</strong> {seller.city}</Typography>
                  </Grid>
                  <Grid item xs={12}><Divider sx={{ my: 2 }} /></Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight="bold">Détails du Business</Typography>
                    <Divider sx={{ mb: 1 }} />
                    <Typography><strong>Catégorie :</strong> {seller.category}</Typography>
                    <Typography><strong>Site Web :</strong> <a href={seller.website} target="_blank" rel="noopener noreferrer">{seller.website}</a></Typography>
                    <Typography><strong>Description :</strong> {seller.description}</Typography>
                  </Grid>
                </Grid>
              </Box>
        
          </DialogContent>
        </Dialog>
  );
}
