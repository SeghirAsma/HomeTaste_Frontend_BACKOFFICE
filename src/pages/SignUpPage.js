import React,{useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; 
import { Verify } from 'react-puzzle-captcha';
import 'react-puzzle-captcha/dist/react-puzzle-captcha.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { toast,ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" > Made Home </Link>{' '}
      {new Date().getFullYear()}{'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessageSuccess, setSnackbarMessageSuccess] = useState('');
    const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);
    const [snackbarMessageFailure, setSnackbarMessageFailure] = useState('');
    const [openSnackbarFailure, setOpenSnackbarFailure] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [touchedFirstname, setTouchedFirstname] = useState(false);
    const [touchedLastname, setTouchedLastname] = useState(false);
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPhoneNumber, setTouchedPhoneNumber] = useState(false);
    const [touchedAddress, setTouchedAddress] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [touchedRole, setTouchedRole] = useState(false);
    
   

    const navigate = useNavigate(); 

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const [showCaptcha, setShowCaptcha] = useState(false);
    const [captchaSolved, setCaptchaSolved] = useState(false);
  
    const handleShowCaptcha = () => {
      setShowCaptcha(true);
    };

    const handleEmailChange = (e) => {
      const emailValue = e.target.value;
      setEmail(emailValue);
      if (!emailValue) {
        setEmailError('Email is required');
      } else if (!validateEmail(emailValue)) {
        setEmailError('Please enter a valid email address (xxx@yyy.yyy)');
      } else {
        setEmailError('');
      }
    };
  
    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
      return regex.test(email);
    };

    const handlePasswordChange = (e) => {
      const passwordValue = e.target.value;
      setPassword(passwordValue);
    
      if (!passwordValue) {
        setPasswordError('Password is required');
      } else if (!validatePassword(passwordValue)) {
        setPasswordError('Password must be at least 8 characters, include at least one uppercase and lowercase letter, at least one number, and contain only one of these special characters (#*-=+)');
      } else {
        setPasswordError('');
      }
    };

    const validatePassword = (password) => {
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#*-=+]).{8,}$/;
    
      return regex.test(password);
    };
    
  
    const handleSuccess = () => {
      setSnackbarMessageSuccess("Captcha solved successfully!");
      setOpenSnackbarSuccess(true);
      setCaptchaSolved(true);
    };
  
    const handleFail = () => {
      setSnackbarMessageFailure("Captcha solving failed. Please try again.");
      setOpenSnackbarFailure(true);
    };
    
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !phoneNumber || !address || !role) {
      setSnackbarMessage("Please fill in all fields.");
      setOpenSnackbar(true);
      return; 
    }
  
    if (captchaSolved) {
      try {
        const response = await axios.post('http://localhost:8084/api/users/add', {
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          address,
          role
        });
        const accessToken = response.data.token;
        localStorage.setItem('token', accessToken);
        console.log('Inscription Successful', response.data);
        toast.success("Inscription Successful")
          setTimeout(() => {
            navigate('/SignIn');
        }, 2000);
      } catch (error) {
        console.error('Authentication Failed', error);
      }
    } else {
      setSnackbarMessage("Please solve the captcha before signing up.");
            setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setOpenSnackbarSuccess(false);
    setOpenSnackbarFailure(false);
  };
  
  return (
    <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box   sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                        <TextField id="firstName" label="First Name" name="firstName" 
                        autoComplete="first-name" required autoFocus sx={{ flex: 1 }}  
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onBlur={() => setTouchedFirstname(true)} 
                        error={touchedFirstname && !firstName}
                        helperText={touchedFirstname && !firstName ? "First name is required" : ""}
                        />
                        <TextField id="lastName" label="Last Name" name="lastName" 
                        autoComplete="last-name" required sx={{ flex: 1 }}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onBlur={() => setTouchedLastname(true)} 
                        error={touchedLastname && !lastName}  
                        helperText={touchedLastname && !lastName ? "Last Name is required" : ""} 
                        />
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <TextField id="email"  label="Email Address" name="email"
                        autoComplete="email"  required fullWidth
                        value={email}
                        onBlur={() => setTouchedEmail(true)}
                        onChange={handleEmailChange}
                        error={touchedEmail && (emailError !== '')}
                        helperText={touchedEmail && emailError}
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField name="password" label="Password" type="password" id="password"  
                        autoComplete="new-password" required fullWidth
                        value={password}
                        onBlur={() => setTouchedPassword(true)}
                        onChange={handlePasswordChange}
                        error={touchedPassword && (passwordError !== '')}
                        helperText={touchedPassword && passwordError}
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField name="phoneNumber" label="Phone Number" type="text" id="phoneNumber" 
                        autoComplete="new-phoneNumber" required fullWidth
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={() => setTouchedPhoneNumber(true)} 
                        error={touchedPhoneNumber && !phoneNumber}  
                        helperText={touchedPhoneNumber && !phoneNumber ? "Phone Number is required" : ""} 
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <TextField name="address" label="Address" type="text" id="address" 
                        autoComplete="new-address" required fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onBlur={() => setTouchedAddress(true)} 
                        error={touchedAddress && !address}  
                        helperText={touchedAddress && !address ? "Address is required" : ""} 
                        />
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <FormControl fullWidth>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select labelId="role-label" id="role" label="Role"
                            value={role} 
                            onChange={handleRoleChange}
                            onBlur={() => setTouchedRole(true)} 
                            error={touchedRole && !role}  
                            helperText={touchedRole && !role ? "Role is required" : ""} 
                        >
                            <MenuItem value="CONSUMER">CONSUMER</MenuItem>
                            <MenuItem value="SELLER">SELLER</MenuItem>
                        </Select>
                        </FormControl>
                    </Box>
                </Box>

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                color='secondary'  onClick={handleShowCaptcha} >
                    Show Captcha  
                </Button>
                <Verify  width={320} height={160} visible={showCaptcha}
                onSuccess={handleSuccess}
                onFail={handleFail}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}
                    color='secondary' >
                    Sign Up
                </Button>

                <Grid container justifyContent="flex-end">
                <Grid >
                    <Link href="/SignIn" variant="body2"> Already have an account? Sign in </Link>
                </Grid>
                </Grid>
            </Box>
            <ToastContainer position="top-right" autoClose={3000} />
        </Box>

        <Copyright sx={{ mt: 5 }} />
    </Container>
    </ThemeProvider>

    <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning">
          {snackbarMessage}
        </Alert>
    </Snackbar>
    <Snackbar open={openSnackbarSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessageSuccess}
        </Alert>
    </Snackbar>
    <Snackbar open={openSnackbarFailure} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessageFailure}
        </Alert>
    </Snackbar>
    </div>
  );
}