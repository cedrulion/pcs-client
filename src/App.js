// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';

import LandingPage from './components/LandingPage';
import DashboardLayout from './components/DashboardLayout';
import Service2 from './components/services';
import PetsPage from './components/PetsPage';
import Profile from './components/Profile';
import Client from './components/Client';
import Staff from './components/Staff';
import Appointment from './components/Appointment';
import Myappointment from './components/Myappointment';
import AppointmentsPage from './components/AppointmentsPage';


function App() {
  return (
    <Router>
       <Routes>
       <Route  path="/" element={<LandingPage/>} ></Route>
        <Route  path="/signup" element={<SignUp/>} ></Route>
        <Route  path="/signin" element={<SignIn/>} ></Route>
       
        <Route  path="/landingpage" element={<LandingPage/>} ></Route>
         <Route  path="/dashboard" element={<DashboardLayout/>} >
         <Route path="services" element={<Service2 />} />
         <Route  path="PetsPage" element={<PetsPage/>} />
         <Route  path="profile" element={<Profile/>} />
         <Route  path="client" element={<Client/>} />
         <Route  path="staff" element={<Staff/>} />
         <Route  path="appointment" element={<Appointment/>} />
         <Route  path="myappointment" element={<Myappointment/>} />
         <Route  path="allappointment" element={<AppointmentsPage/>} />
         </Route>
        </Routes>
    </Router>
  );
}

export default App;
