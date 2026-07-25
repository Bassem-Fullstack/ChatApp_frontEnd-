"use client"

import api from "@/lib/api"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    try {
      await api.post("/users/register", { username, email, password })

       router.push("/")

      setError("")
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Something went wrong"
      setError(String(errorMessage))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && <p className="text-center mb-4 text-red-500">{error}</p>}

        <input
          type="text"
          value={username}
          placeholder="Username"
          className="w-full border p-2 rounded-md mb-4"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="Email"
          className="w-full border p-2 rounded-md mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative mb-4">
          <input
            type={open ? "text" : "password"}
            value={password}
            placeholder="Password"
            className="w-full border p-2 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setOpen(!open)} className="absolute right-2 top-2">
            {open ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Sign up
        </button>

   <a 
   
   href="https://chatapp-production-7953.up.railway.app/users/google" 
   
   className="w-full flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-md mt-3 hover:bg-gray-50 transition-all"
   
   >
     
    <FcGoogle size={24}  />
   
     Login With Google
     
     </a>
   


        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  )
}