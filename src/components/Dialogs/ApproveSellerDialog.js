import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function ApproveSellerDialog({ open, onClose, onConfirm, seller }) {
  if (!seller) return null;

  return (
    <Dialog open={open} onClose={onClose}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircleIcon color="success" />
            <Typography variant="h6" fontWeight="bold">Approuver le vendeur</Typography>
          </DialogTitle>          
          <DialogContent>
           <Typography>Voulez-vous vraiment approuver <strong>{seller.commercialName}</strong> ?</Typography>
          </DialogContent>
          <DialogActions>
            <Button  onClick={onClose}>Annuler</Button>
            <Button variant="contained" color="success" onClick={onConfirm}>Confirmer</Button>
          </DialogActions>
        </Dialog>
  );
}
