import './style/style.css';
import React from 'react';
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import SearchCompany1 from '../src/pages/SearchCompany/index';
import BusinessDetail from '../src/pages/BusinessDetail/BusinessDetail';
import LoginDetail from '../src/pages/LoginDetail/LoginDetail';
import Password from '../src/pages/Password/Password';
import Dashboard from '../src/pages/Dashboard/Dashboard';
import JobDetails from './pages/JobDetails/JobDetails';
import FinalJobDetail from './pages/FinalJobDetail/FinalJobDetail'
import SignatureScreen from './pages/SignatureScreen/SignatureScreen'
import HistoryDetail from './pages/HistoryDetail/HistoryDetail'
import Notification from './pages/Notification/Notification'
import Profile from './pages/Profile/Profile'
import Remarks from './pages/Remarks/Remarks';
import ImageCapture from './pages/PictureUploading/ImageCapture';
import SignaturePad from './components/SignaturePad';
import NotFound from './pages/NotFound/NotFound';
import EditDetail from './pages/EditDetail/EditDetail';

function App() {
  return (
    <BrowserRouter>      
        <Routes>
          <Route path='/' element={<SearchCompany1 />} />
          <Route path='/BusinessDetail' element={<BusinessDetail />} />
          <Route path='/LoginDetail' element={<LoginDetail />} />
          <Route path='/password' element={<Password />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/job-details' element={<JobDetails />} />
          <Route path='/final-job-detail' element={<FinalJobDetail />} />
          <Route path='/signature-screen' element={<SignatureScreen />} />
          <Route path='/history' element={<HistoryDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/notification' element={<Notification />}/>
          <Route path='/remark' element={<Remarks />}/>
          <Route path='*' element={<NotFound />}/>
           <Route path='/imageCapture' element={<ImageCapture />}/>
           <Route path='/edit-details' element={<EditDetail />}/>
          {/* <Route path='/sign' element={<SignaturePad />}/>  */}
        </Routes>      
    </BrowserRouter>
  );
}

export default App;
