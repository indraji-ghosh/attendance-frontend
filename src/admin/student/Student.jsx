import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { DataTable } from './data-table';
import {columns} from './column'

import { AddStudent } from './addStudent';

function Student() {
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

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/student/all`, {
          headers: {
            Authorization: `Bearer ${token}`, // Use the correct token key
          },
        });
  
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
        }
        setError(error.message);
        setLoading(false);
      }
      
    }
  
    fetchData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
    <h1 className='text-2xl m-10'>All Students</h1>
    <div className="m-10">
      <div className="flex justify-end my-4">
      <AddStudent/>
    </div>
      <DataTable columns={columns} data={data} />
      </div>  
    
  </div>
  );
}

export default Student;
