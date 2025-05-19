import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./admin/Layout"
import Home from './Home'
import Login from "./admin/Login";
import ProtectedRoute from "./ProtectedRoute";
import Student from "./admin/student/Student";
import Attendance from "./admin/attendance/Attendance";
import AllAttendance from "./admin/allAttendance/AllAttendance";
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />

        {/* protected Route */}
        <Route element={<ProtectedRoute />}>

        <Route path="/admin" element={<Layout />}>
          <Route path="student" element={<Student />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="all-attendance" element={<AllAttendance />} />


        </Route>
        </Route>

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
