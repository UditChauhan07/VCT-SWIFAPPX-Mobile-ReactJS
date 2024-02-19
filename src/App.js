import './style/style.css';
import React from 'react';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import SearchCompany1 from '../src/pages/SearchCompany/index';
import BusinessDetail from '../src/pages/BusinessDetail/BusinessDetail';
import LoginDetail from '../src/pages/LoginDetail/LoginDetail';
import Password from '../src/pages/Password/Password';
import Dashboard from '../src/pages/Dashboard/Dashboard';
import JobDetails from './pages/JobDetails/JobDetails';

function App() {
  return (
    <BrowserRouter>      
        <Routes>
          <Route path='/' element={<SearchCompany1 />} />
          <Route path='/BusinessDetail' element={<BusinessDetail />} />
          <Route path='/LoginDetail' element={<LoginDetail />} />
          <Route path='/password' element={<Password />} />
          <Route path='/dashboard' element={<Dashboard />} />/job-details
          <Route path='/job-details' element={<JobDetails />} />
        </Routes>      
    </BrowserRouter>
  );
}

export default App;
