import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, TextField, Typography, Link, IconButton, Stack,
         CssBaseline, createTheme,  ThemeProvider} from "@mui/material";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
    },
  });

 

  // Authentification manuelle
   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Remember Me:', rememberMe);
    setError('');
    try {
      const response = await axios.post('http://localhost:8084/api/auth/authenticate', {
        email,
        password,
      //  rememberMe,
      });
      console.log("Login Response:", response.data);


    if (response.data && response.data.token) {
        const accessToken = response.data.token;
        console.log("✅ Token reçu:", accessToken);
        localStorage.setItem('token', accessToken);
  //  if (rememberMe) {
  //     localStorage.setItem('token', accessToken); 
  //      console.log("📦 Stocké dans localStorage:", localStorage.getItem('token'));
  //   } else {
  //     sessionStorage.setItem('token', accessToken); // temporaire
  //        console.log("📦 Stocké dans sessionStorage:", sessionStorage.getItem('token'));
  //   }

    const userDetailsResponse = await axios.get('http://localhost:8084/api/users/currentUser', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("User Details Response:", userDetailsResponse.data);

    if (userDetailsResponse.data && userDetailsResponse.data.userEntity) {
      const currentUserDetails = userDetailsResponse.data;
      localStorage.setItem('currentUser', currentUserDetails.userEntity.id);
      const userRole = currentUserDetails.userEntity.role;
        if (userRole === 'SELLER' && !currentUserDetails.userEntity.submitted && !currentUserDetails.userEntity.approved) {
          navigate('/CompleteProfile');   
        } else if (userRole === 'ADMIN') {
          navigate('/');  
        } else {
          navigate('/');  
        }
        }
    }
    } catch (error) {
            if (error.response && error.response.status === 401) {
            toast.error("UserName or password is incorrect");
            } else {
                setError("Erreur inattendue, veuillez réessayer plus tard.");
            }
            console.error('Erreur d’authentification:', error);
            }

    };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box  sx={{ display: "flex", minHeight: "100vh", width: "100%" }} >
        {/* -- formulaire ---  */}
        <Box  sx={{  width: { xs: "100%", md: "50%" }, display: "flex",  flexDirection: "column", justifyContent: "space-between",
            px: 4, py: 3,  bgcolor: "background.paper", zIndex: 1 }} >

          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton color="primary">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography variant="h6">Made Home</Typography>
            </Box>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit" >
              {darkMode ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
            </IconButton>
          </Box>

          {/* Main */}
          <Box component="main"
            sx={{ display: "flex",
              flexDirection: "column",
              alignItems: "center",
              my: "auto",
              width: "100%",
              maxWidth: 400,
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Sign in
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Don’t have an account?{" "}
              <Link href="SignUp" underline="hover">
                Sign up!
              </Link>
            </Typography>

            <Divider sx={{ my: 3, width: "100%" }}>or</Divider>
         
            <form onSubmit={handleSubmit}  >
              <Stack sx={{ gap: 2, mt: 2 }}>
              <FormControl fullWidth>
                <TextField  label="Email" type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField  label="Password"   type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FormControl>
              <Box sx={{  display: "flex", justifyContent: "space-between", alignItems: "center",  }}  >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Remember me"
                />
                <Link href="#" underline="hover">
                  Forgot your password?
                </Link>
              </Box>

              <Button type="submit" variant="contained" fullWidth>
                Sign in
              </Button>
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
             
              </Stack>  
            </form>
            
          </Box>
            <ToastContainer />
          {/* Footer */}
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography variant="caption">
              © Made Home {new Date().getFullYear()}
            </Typography>
          </Box>
       
        </Box>
    
        {/* ---  image --- */}
     <Box sx={{ height: '100%', position: 'fixed', right: 0,top: 0, bottom: 0, left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            theme.palette.mode === 'dark'
              ? 'url(https://thumbs.dreamstime.com/b/gai-propri%C3%A9taire-de-petite-entreprise-debout-accueil-avec-nous-sommes-ouvert-%C3%A9crit-sur-un-conseil-illustration-vectorielle-plate-338878019.jpg)'
              : 'url(https://img.freepik.com/free-vector/flat-small-business-saturday-illustration_23-2150992883.jpg?semt=ais_hybrid&w=740)',
        }}
      />
      </Box>
 
    </ThemeProvider>
  );
}
