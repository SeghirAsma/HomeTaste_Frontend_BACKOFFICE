import React from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, TextField
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function RejectSellerDialog({ open, onClose, onConfirm, seller, reason, setReason }) {
  if (!seller) return null;

  return (
       <Dialog  open={open} onClose={onClose}>
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CancelIcon color="error" />
            <Typography variant="h6" fontWeight="bold">Reject the seller</Typography>
          </DialogTitle>
          <DialogContent>
          <Typography>Enter the reason for the rejection for <strong>{seller.lastName} {seller.firstName}</strong> :</Typography>
            <TextField autoFocus margin="dense" label="Reason" fullWidth variant="outlined" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
             sx={{ mt: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={onConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>

  );
}
