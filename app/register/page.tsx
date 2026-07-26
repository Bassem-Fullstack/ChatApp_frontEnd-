




"use client" 


import api from "@/lib/api"
import { Eye, EyeOff } from "lucide-react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"


import { useState } from "react"
import { FcGoogle } from "react-icons/fc"




export default function LoginPage() {
 

const [showPassword , setShowPassword] = useState(false) 


const [username , setUserName] = useState("") 

const [email , setEmail] = useState("") 

const [password , setPassword] = useState("")

const [error , setError] = useState("")

const [loading , setLoading] = useState(false) 

const [agree , setAgree] = useState(false)

const router = useRouter()


const handlerSignUp = async(e:React.FormEvent) => {

e.preventDefault() // نوقف حدث بتاع كليك علشان ميعملش ريلود على طول لما يضغط على زر كريت اكونت

setError("")



  try{

 setLoading(true) 

 const res = await api.post("/users/register" , {

 username ,
 
 email ,

 password

 })
   
 

//  localStorage.setItem("token" , res.data.tokens)

 router.push("/login") 

  }

  catch(err:any){

   const errorMessage = err.response?.data?.message || "Something Went Wrong"

   setError(String(errorMessage))

  }
 
  finally{

 setLoading(false)

  }


}







return(

 <div className="min-h-[90vh] w-full py-6 px-4 bg-cover bg-center flex items-center 

 justify-center gap-6 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">


 {/* ----- left picture */} 


<div className="flex flex-col gap-2 justify-center items-center mt-5 md:mt-0">

<img alt="Quick Chat" src="/logp_icon2.svg" className="w-[70px] md:w-[100px] max-w-full" />

  <p className="text-white md:text-3xl text-2xl font-medium">Quick Chat</p>

</div>   {/* flex flex-col justify-center items-center  */}




 {/* ----- left right Login */} 



 <form onSubmit={handlerSignUp} className="max-w-md border-2 bg-white/5 text-white border-gray-500 p-4 sm:p-6 flex flex-col gap-3 sm:gap-6 rounded-lg shadow-lg">


 <h2 className="font-medium text-2xl flex justify-between items-center cursor-pointer">Sign up</h2>

 {error && <p className="text-red-500 text-sm text-center">{error}</p>}

 <input type="text" value={username} onChange={(e)=> setUserName(e.target.value)} className="p-2 border bg-white/5 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Username" />

 <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="p-2 border bg-white/5 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email" />


<div className="relative">

 <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=> setPassword(e.target.value)} className="p-2 border w-full  bg-white/5 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Password"  />


  <button type="button" onClick={()=> setShowPassword(!showPassword)} 
     
  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"

   >
 
   {showPassword ? <Eye size={18}/> : <EyeOff size={18}/> }

  </button>

  </div> {/*  relative  */}

  
 <div className="flex flex-col justify-center items-center gap-3">
  
 <button type="submit" disabled={loading} className="py-3 bg-gradient-to-tr from-purple-400 w-full to-violet-600 

 text-white rounded-md cursor-pointer

 ">

 {loading ? "Loading ..." : "Create Account"}
    


    </button>

 

 <a 
    
    href="https://chatapp-production-7953.up.railway.app/users/google" 
    
className="w-full flex items-center justify-center gap-2 border border-gray-500 bg-white/5 text-white p-2 rounded-md mt-3 hover:bg-white/10 transition-all"    
    >
      
     <FcGoogle size={24}  />
    
      Login With Google
      
      </a>

  </div> 

    

   
<div className="flex items-center gap-2 text-sm text-gray-300">

 
 <input type="checkbox" required checked = {agree} onChange={(e)=> setAgree(e.target.checked)} />

 <p>Agree to the terms of use & privacy policy.</p>



   </div> {/*  flex items-center gap-2 text-sm text-gray-500  */}

 <p className="text-center text-sm text-gray-400"> Already have an account?{" "}

 <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-all">

    Login

  </Link>

 </p>  {/*  text-center text-sm text-gray-400  */}


 </form> {/*  border-2 bg-white/8 text-white border-gray-500 p-6  */}


 </div>  //{/*  min-h-screen bg-cover bg-center  */}


)




}









