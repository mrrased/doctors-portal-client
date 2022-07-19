import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Navigation from './Pages/Shared/Navigation/Navigation';
import Appointment from './Pages/Appointment/Appointment/Appointment';
import Login from './Pages/Login/Login';
import Registers from './Pages/Login/Registers';
import AuthProvider from './Hooks/AuthProvider';
import PrivateRoute from './Hooks/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor/AddDoctor';
import AdminRoute from './Hooks/AdminRoute';
import Payment from './Pages/Dashboard/Payment/Payment';

function App() {
  return (
    <div>
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/navigate' element={<Navigation></Navigation>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/appointment' element={<PrivateRoute><Appointment/></PrivateRoute>}></Route>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}>
              <Route exact path="/dashboard" element={<DashboardHome/>}/>
              <Route path="/dashboard/admin" element={<AdminRoute><MakeAdmin/></AdminRoute>} />
              <Route path="/dashboard/payment/:appointmentId" element={<AdminRoute><Payment/></AdminRoute>} />
              <Route path="/dashboard/addDoctor" element={<AdminRoute><AddDoctor /></AdminRoute>} /></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Registers></Registers>}></Route>
        <Route path='/' element={<Home></Home>}></Route>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
