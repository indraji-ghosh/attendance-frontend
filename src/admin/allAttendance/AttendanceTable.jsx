import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token is missing!");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/attendance/all-attendance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading attendance data...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto px-4 py-6">
      <table className="min-w-full table-auto border border-gray-300 shadow-md rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">Date</th>
            <th className="border border-gray-300 px-6 py-3 text-left font-semibold text-gray-700">Subject</th>
            <th className="border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700">Total Present</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center px-6 py-4 text-gray-500">No attendance data available.</td>
            </tr>
          ) : (
            data.map(({ date, subject, attendance }, index) => {
              const presentCount = attendance.filter(student => student.present).length;
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">
                    {new Date(date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-gray-800">
                    {subject}
                  </td>
                  <td className="border border-gray-300 px-6 py-4 text-center text-green-600 font-medium">
                    {presentCount}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
