import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log("Login clicked!", { username, password })
    try {
        setLoading(true)
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/teachers/login`, { username, password })
        localStorage.setItem("token", res.data.token)
        setMessage("Login successful! ✅") 
        setTimeout(()=> {navigate("/admin")},1000)
    } catch (error) {
        console.error(error)
        setMessage("Login failed. ❌ Check username/password.")
    } finally{
        setLoading(false)
    }
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <div className="mb-4">
          <Label htmlFor="username" className="px-2 py-3">Username</Label>
          <Input 
            id="email" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password" className="px-2 py-3">Password</Label>
          <Input 
            id="password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password"
            required
          />
        </div>

        <Button type="submit" className="w-full">
             {loading ? "Logging in..." : "Login"}
             
             </Button>

             {message && (
          <p className="text-center mt-4 text-sm font-semibold text-gray-700">
            {message}
          </p>
        )}
      </form>
    </div>
  )
}
 