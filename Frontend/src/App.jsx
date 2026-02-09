import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './component/Layout';
import LoginForm from './component/Registration/LoginForm';
import RegisterForm from './component/Registration/RegisterForm';
import Policies from './component/Registration/Policies';
import Claim from './component/Registration/Claim';
import Payment from './component/Registration/Payment';
import Users from './component/Registration/Users';
import RoleBasedDashboard from './component/Registration/RoleBasedDashboard';
import CreatePolicy from './component/Registration/CreatePolicy';
import UpdatePolicy from './component/Registration/UpdatePolicy';
import UpdateClaim from './component/Registration/UpdateClaim';
import UpdateTicket from './component/Registration/UpdateTicket';
import TrackPayment from './component/Registration/TrackPayment';
import UserPolicy from './component/Registration/UserPolicy';
import CreateClaim from './component/Registration/CreateClaim';
import RaiseTicket from './component/Registration/RaiseTicket';
import About from './component/Registration/About';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path='/policies' element={<Policies />} />
          <Route path='/claims' element={<Claim />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/users' element={<Users />} />
          <Route path='/dashboard' element={<RoleBasedDashboard />} />
          <Route path='/create-policy' element={<CreatePolicy />} />
          <Route path='/update-policy' element={<UpdatePolicy />} />
          <Route path='/update-claim' element={<UpdateClaim />} />
          <Route path='/update-ticket' element={<UpdateTicket />} />
          <Route path='/track-payment' element={<TrackPayment />} />
          <Route path='/user-policy' element={<UserPolicy />} />
          <Route path='/create-claim' element={<CreateClaim />} />
          <Route path='/raise-ticket' element={<RaiseTicket />} />
          <Route path='/about' element={<About/>}/>
        </Route>
      </Routes>
    </Router>


  )
}

export default App;