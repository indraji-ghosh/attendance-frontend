import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import axios from "axios";

export function AddStudent() {
    
      const [loading, setLoading] = useState(false); 
      const [error, setError] = useState(null)
      const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        roll: '',
        phone: ''
      });
    

      const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData(prevState => ({
          ...prevState,
          [name]: value

        }));
      };
    
        async function handleSubmit(e) {
            e.preventDefault();
            setLoading(true);
          try {
            const token = localStorage.getItem("token");
      
            if (!token) {
              setError("Token is missing!");
              setLoading(false);
              return;
            }
    
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/student/add`,formData ,{
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            });

            console.log('Student added:', response.data);
            setLoading(false);
            setFormData({
                name: '',
                studentId: '',
                roll: '',
                phone: ''
              });


          } catch (error) {
            console.error('Error fetching student data:', error);
            if (error.response) {
              console.error('Server responded with:', error.response.data);
            }
            setError(error.response.data.message);
            setLoading(false);
          }
          
        }
      
      

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button >Add Student</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>+ Add Student</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Indrajit Ghosh"
            className="col-span-3"
            value={formData.name}
        onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="EIILMBCA43101" className="text-right">
            Student Id
          </Label>
          <Input
            id="studentId"
             name="studentId"
            placeholder="Pedro Duarte"
            className="col-span-3"
            value={formData.studentId}
        onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="roll" className="text-right">
            Roll
          </Label>
          <Input
            id="roll"
             name="roll"
            placeholder="Pedro Duarte"
            className="col-span-3"
            value={formData.roll}
        onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="phone" className="text-right">
            Phone
          </Label>
          <Input
            id="phone"
             name="phone"
            placeholder="9876545655"
            className="col-span-3"
            value={formData.phone}
        onChange={handleChange}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" >{loading?"Adding student":"Add Student"}</Button>
      </DialogFooter>
      </form>
      {error && (
  <div className="text-red-500 text-sm mb-4">
    {error}
  </div>
)}
    </DialogContent>
  </Dialog>
  )
}
