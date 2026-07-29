
// "use client"


// import api from "@/lib/api"

// import { Eye , EyeOff} from "lucide-react"

// import { useRouter } from "next/navigation"

// import { useState } from "react"

// import { FaGoogle } from "react-icons/fa6"
// import { FcGoogle } from "react-icons/fc"




// export default function LoginPage () {


// const[email , setEmail] = useState("") 


// const[password , setPassword] = useState("")


// const[error , setError] = useState("")


// const[open ,setOpen] = useState(false)

// const router = useRouter()


// const handleLogin = async()=>{

// try{

// const res = await api.post("/users/login" , {email , password})


// localStorage.setItem("token" , res.data.tokens)

// router.push("/chat") 

// }


// catch(err : any){


// const errorMessage = err.response?.data?.message || "Something went wrong"

//  setError(String(errorMessage))

// }

// }




// return(


// <div className="min-h-screen flex items-center justify-center bg-gray-100">


// <div className="bg-white p-8 rounded-lg shadow-md w-96">

// <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
// {
 
//  error&& <p className="text-center mb-4 text-red-500">{error}</p>

// }



// <input

// type="email" 

// value={email}

// placeholder="Email" 

// className="w-full border p-2 rounded-md mb-4"

// onChange={(e)=> setEmail(e.target.value)}

// />

// <div className="relative mb-4">

// {/*  */}

// <input

// type={open ? "text" : "password"} 

// value={password}

// placeholder="Password" 

// className="w-full border p-2 rounded-md mb-4"

// onChange={(e)=> setPassword(e.target.value)}

// />



// <button onClick={()=> setOpen(!open)} className="absolute right-2 top-2">{open ? <Eye size={20}/> : <EyeOff size={20}/>}</button>



// </div>  {/* relative */}


   
 
  
//     <button
//           onClick={handleLogin}
          
//           className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
//         >
//           Login

//         </button>

   
// <a 

// href="https://chatapp-production-7953.up.railway.app/users/google" 

// className="w-full flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-md mt-3 hover:bg-gray-50 transition-all"

// >
  
//  <FcGoogle size={24}  />

//   Login With Google
  
//   </a>


// <p className="text-center mt-4 mb-4">

//           Already have an account?{" "}

//           <a href="/register" className="text-blue-500  hover:text-blue-700 transition-all">Register</a>

//         </p>




// </div> {/* min-h-screen flex items-center justify-center bg-gray-100  */}

// </div> // {/* min-h-screen flex items-center justify-center bg-gray-100  */}



// )




// }


"use client"

import Image from "next/image"

import { useState } from "react"



import { redirect, usePathname } from "next/navigation"

import LoginPage from "./login/page"

import RegisterPage from "./register/page"


 

export default function HomePage () {

  redirect("/register")

//   const [selectUser , setSelectUser] = useState(false)
  
//   const pathname = usePathname() 

//   const isChat =pathname==="/chat" // عشان نعمل بوردر استخدمنا مسار شات نعمل بوردر في مسار شات فقط

 

//   return (

//   <div className={`border h-screen sm:px-[15%] sm:py-[5%] w-full md:px-[5%] md:py-[3%] `}>

 
//  <div className={`backdrop-blur-xl ${isChat ? "border-2 border-gray-600": ""} rounded-2xl 
 
//  overflow-hidden  grid-cols-1 relative 
 
//  ${selectUser ? "md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]" : "md:grid-cols-2"} 

//  `}>


 
//  <RegisterPage/> 

//   <LoginPage/>


//  </div> {/*  backdrop-blur-xl border-2 border-gray-600 rounded-2xl */}


//  </div>  //{/*  border w-full h-screen sm:px-[15%] sm:py-[5%]  */}

//   )


} 
















