import React from 'react';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CompleteProfilePage from './pages/CompleteProfilePage';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" exact Component={DashboardPage}></Route>
      <Route path="/SignIn" exact Component={SignInPage}></Route>
      <Route path="/SignUp" exact Component={SignUpPage}></Route>
      <Route path="/CompleteProfile" exact Component={CompleteProfilePage}></Route>
      
    </Routes>
   </Router>
  
  );
}

export default App;