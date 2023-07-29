import { Routes,Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/auth";
import Layout from './components/admin/global/Layout'
import Dashboard from './components/admin/dashboard'
import Staff from './components/admin/staff/index'
import Leave from './components/admin/leave/Leave'
import Applicant from "./components/admin/applicants/Applicant";
import Announcement from "./components/admin/announcements/Announcement";
import About from "./components/about/About";
import ViewProfile from "./components/admin/staff/ViewProfile";
import EditProfile from "./components/admin/staff/EditProfile";
import AddNewStaff from "./components/admin/staff/AddNewStaff";
import EmployeeLayout from "./components/employee/global/EmployeeLayout";
import Profile from "./components/employee/Profile/Profile";
import EmployeeLeave from "./components/employee/leave/EmployeeLeave";
import EmployeeAnnouncement from "./components/employee/Announcement/EmployeeAnnouncement";
import ChangePassword from "./components/admin/staff/ChangePassword";
import ChangeLoggedUserPassword from "./components/employee/Profile/ChangeLoggedUserPassword";
import SendPasswordResetEmail from "./components/SendPasswordResetEmail";
import ResetPassword from "./components/ResetPassword";
import PutApplicantData from "./components/PutApplicantData";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/admin/" element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="staff" element={<Staff/>}/>
          <Route path="staff/viewprofile/:id" element={<ViewProfile/>}/>
          <Route path="staff/editprofile/:id" element={<EditProfile/>}/>
          <Route path="staff/addprofile" element={<AddNewStaff/>}/>
          <Route path="staff/changepassword/:id" element={<ChangePassword/>}/>
          <Route path="leave" element={<Leave/>}/>
          <Route path="applicants" element={<Applicant/>}/>
          <Route path="announcement" element={<Announcement/>}/>
        </Route>
        <Route path="/employee/" element={<EmployeeLayout/>}>
          <Route index element={<Profile/>}/>
          <Route path="changepassword" element={<ChangeLoggedUserPassword/>} />
          <Route path="leave" element={<EmployeeLeave/>} />
          <Route path="announcement" element={<EmployeeAnnouncement/>} />
        </Route>
        <Route path="/sendpasswordresetemail" element={<SendPasswordResetEmail/>}></Route>
        <Route path="/api/user/reset/:uid/:token" element={<ResetPassword/>}></Route>
        <Route path='/putapplicantdetail/:uid' element={<PutApplicantData/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='*' element={<h1>404 Page Not Found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;