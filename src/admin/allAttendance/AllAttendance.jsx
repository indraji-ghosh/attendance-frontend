import React from 'react'
import AttendanceTable from './AttendanceTable'

function AllAttendance() {
  return (
    <AttendanceTable apiUrl={`${import.meta.env.VITE_BACKEND_URL}/api/attendance/all-attendance`}/>
  )
}

export default AllAttendance