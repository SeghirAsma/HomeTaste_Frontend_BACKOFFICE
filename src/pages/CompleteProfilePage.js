import React, { useState, useRef } from "react";
import { Box, Button, Divider, FormControl, InputLabel, TextField, IconButton, Typography, Stack, Select, MenuItem, Card,
         CardContent, CardActions, Avatar, Paper, Tooltip} from "@mui/material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function MyProfile() {
  const [description, setDescription] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [documentUrl, setDocumentUrl] = useState(null);
  const [businessType, setBusinessType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const inputFileRef = useRef(null);
  const [profileImgUrl, setProfileImgUrl] = useState(null);

  const initialImageUrl = "https://static.vecteezy.com/system/resources/thumbnails/018/742/015/small_2x/minimal-profile-account-symbol-user-interface-theme-3d-icon-rendering-illustration-isolated-in-transparent-background-png.png";

  const [profileImgPreview, setProfileImgPreview] = useState(initialImageUrl);
  const navigate = useNavigate();

  const handleFileClick = () => inputFileRef.current.click();

  const handleFileImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImgUrl(file);
      setProfileImgPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDocumentUrl(file);
  };

  const handleAddSocialLink = () => {
    if (newLink.trim()) {
      setSocialLinks([...socialLinks, newLink.trim()]);
      setNewLink("");
    }
  };

  const handleRemoveLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleCancel = () => navigate("/SignIn");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      documentUrl && description && businessName && businessType && dateOfBirth && socialLinks && profileImgUrl 
       ) {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("businessName", businessName);
      formData.append("documentUrl", documentUrl);
      formData.append("businessType", businessType);
      formData.append("dateOfBirth", dateOfBirth.toISOString());
      formData.append("profileImgUrl", profileImgUrl);
      socialLinks.forEach((link) => formData.append("socialLinks", link));

      try {
        const storedToken =
          localStorage.getItem("token") ;

        await axios.post("http://localhost:8084/api/Profile/complete", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${storedToken}`,
          },
        });

        setDescription("");
        setBusinessName("");
        setDocumentUrl(null);
        setBusinessType("");
        setDateOfBirth("");
        setSocialLinks([]);
        setProfileImgUrl(null);
        setProfileImgPreview(initialImageUrl);
        toast.success("Profile Submitted")
        setTimeout(() => {
            navigate('/SignIn');
        }, 2000);

      } catch (error) {
        console.error("Erreur lors de l'envoi du profil:", error);
      }
    }
  };

  return (
    <Box sx={{ flex: 1, width: "100%", py: 5, bgcolor: "background.default" }}>
      <Paper elevation={3}  sx={{ maxWidth: 900, mx: "auto", p: { xs: 3, md: 5 },borderRadius: 4 }} >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: 600 }}>
          Complete Profile
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* ==== Personal Info ==== */}
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Personal Information
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Customize how your profile information appears.
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Tooltip title="Upload new picture">
                     <Avatar
                      onClick={handleFileClick}
                      src={profileImgPreview}
                      alt="Profile"
                      sx={{ width: 120, height: 120, boxShadow: 2 }}
                    />
                    </Tooltip>
                    <input type="file"  accept="image/*"
                      ref={inputFileRef}
                      style={{ display: "none" }}
                      onChange={handleFileImgChange}
                    />
                  </Box>

                  <Stack spacing={2} sx={{ flex: 1 }}>
                    <TextField  label="Business Name" placeholder="Enter your Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      fullWidth
                      InputProps={{
                        startAdornment: <AccountCircle sx={{ mr: 1 }} color="action" />,
                      }}
                    />

                     <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={dateOfBirth}
                            onChange={(newValue) => setDateOfBirth(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                            disableFuture
                        />
                    </LocalizationProvider>


                    <FormControl fullWidth>
                      <InputLabel>Business Type</InputLabel>
                      <Select label="Business Type" placeholder="Choose your business type"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        startAdornment={<BusinessRoundedIcon sx={{ mr: 1 }} color="action" />}
                      >
                        <MenuItem value="" disabled>
                            Choose your business type
                        </MenuItem>
                        <MenuItem value="FOOD">FOOD</MenuItem>
                        <MenuItem value="CLOTHING">CLOTHING</MenuItem>
                        <MenuItem value="ACCESSORIES">ACCESSORIES</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* ==== Bio ==== */}
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Bio
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Write a short introduction for your profile.
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField multiline minRows={4}
                  placeholder="Describe your activity, products, and experience..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                />
              </CardContent>
            </Card>

            {/* ==== Document ==== */}
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Upload Document
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Share samples of your work or certifications.
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack alignItems="center" spacing={2}>
                  <FileUploadRoundedIcon color="secondary" sx={{ fontSize: 40 }} />
                  <Button variant="outlined" color="secondary" component="label">
                    Upload File
                    <input type="file" hidden onChange={handleFileChange} />
                  </Button>
                  {documentUrl && (
                    <Typography variant="body2" color="text.secondary">
                      {documentUrl.name}
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* ==== Social Links ==== */}
            <Card sx={{ borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600}>
                  Social Links
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  Add your social media or website URLs.
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stack spacing={2}>
                  <Stack direction="row" spacing={1}>
                    <TextField fullWidth
                      placeholder="https://example.com/profile"
                      value={newLink}
                      onChange={(e) => setNewLink(e.target.value)}
                    />
                    <Button variant="contained" sx={{backgroundColor : "#68ec98ff"}}  onClick={handleAddSocialLink}>
                       <AddIcon />
                    </Button>
                  </Stack>

                  {socialLinks.map((link, index) => (
                    <Stack direction="row" spacing={1} key={index} alignItems="center"  >
                      <TextField fullWidth
                      value={link}  
                      InputProps={{ readOnly: true }}
                      />
                      <IconButton color="error" onClick={() => handleRemoveLink(index)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>

              <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                <Button variant="outlined" color="inherit" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                  Save
                </Button>
              </CardActions>
            </Card>
          </Stack>
        </form>
         <ToastContainer />
      </Paper>
    </Box>
  );
}
