
"use client" 


import api from "@/lib/api"

import { Eye, EyeOff } from "lucide-react"

import Image from "next/image"

import Link from "next/link"

import { useRouter } from "next/navigation"


import { useState } from "react"

import { FcGoogle } from "react-icons/fc"

import { motion } from "motion/react"

import { useTypewriter , Cursor } from "react-simple-typewriter"

export default function LoginPage() {
 

const [text] = useTypewriter({

 words : ["Loading..."] ,

 loop : true ,

 delaySpeed : 500 ,

 deleteSpeed : 50


})


const [showPassword , setShowPassword] = useState(false) 


const [email , setEmail] = useState("") 

const [password , setPassword] = useState("")

const [error , setError] = useState("")

const [loading , setLoading] = useState(false) 


const router = useRouter()


const handlerSignUp = async(e:React.FormEvent) => {

e.preventDefault() // نوقف حدث بتاع كليك علشان ميعملش ريلود على طول لما يضغط على زر كريت اكونت

setError("")



  try{

 setLoading(true) 

 const res = await api.post("/users/login" , {

 email ,

 password

 })
   
 

 localStorage.setItem("token" , res.data.tokens) // دة خزنة فية توكين وقت ما مستخدم يسجل دخول 

 localStorage.setItem("userId" , res.data.user.id) // بدل ما نفك توكين فوق عشان نجيب الايدي ونعرف انهي مستخدم فاتح متصل دلوقتي احسن ما اروح افك توكين عشان اجيب الايدي فقط وحوار

// user.id بص عندك في رد تحتك يوسير اوبجكيت جواة الايدي مفتاح متخزن فية الايدي بتاع مستخدم



// res.status(200).json({ message : "Logged Sucessful" , user: {

// دة الرد بتاع باك اند بعتهولك  

//  id : user._id ,

// username : user.username ,

// email : user.email


// }, tokens : token })









 router.push("/chat") 

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

 <div className="min-h-screen w-full py-6 px-4 bg-cover bg-center flex items-center 

 justify-center gap-6 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">


 {/* ----- left picture */} 


<motion.div  className="flex flex-col gap-2 justify-center items-center mt-5 md:mt-0"

  initial={{ opacity: 0, x: -40 }}

  animate={{ opacity: 1, x: 0 }}

  transition={{ duration: 0.6, ease: "easeOut" }}


>

<motion.img  alt="Quick Chat" src="/logo_icon.svg" className="w-[70px] md:w-[100px] max-w-full"

 animate={{ y: [0, -8, 0] }}

transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}

/>

  <p className="text-white md:text-3xl text-2xl font-medium">Quick Chat</p>

</motion.div>   {/* flex flex-col justify-center items-center  */}




 {/* ----- left right Login */} 



 <motion.form onSubmit={handlerSignUp} className="max-w-md border-2 bg-white/5 text-white border-gray-500 p-4 sm:p-6 flex flex-col gap-3 sm:gap-6 rounded-lg shadow-lg"
 
 initial={{ opacity: 0, y: 40 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
 
 >


 <h2 className="font-medium text-2xl flex justify-between items-center cursor-pointer">Sign up</h2>

 {error && <motion.p className="text-red-500 text-sm text-center"
 
  initial={{ opacity: 0, y: -10 }}

    animate={{ opacity: 1, y: 0 }}

    exit={{ opacity: 0 }}

 >
  
  {error}
 
 </motion.p>}


 <motion.input  type="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="p-2 border bg-white/5 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Email" 
 
 initial={{ opacity: 0, y: 15 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.4, delay: 0.35 }}
 
 />


<motion.div  className="relative"

initial={{ opacity: 0, y: 15 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.4, delay: 0.45 }}

>

 <input type={showPassword ? "text" : "password"} value={password} onChange={(e)=> setPassword(e.target.value)} className="p-2 border w-full  bg-white/5 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Password"  />


  <button type="button" onClick={()=> setShowPassword(!showPassword)} 
     
  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
 
   {showPassword ? <Eye size={18}/> : <EyeOff size={18}/> }

  </button>

  </motion.div > {/*  relative  */}

  
 <motion.div className="flex flex-col justify-center items-center gap-3"
 
 initial={{ opacity: 0, y: 15 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.4, delay: 0.55 }}
 
 
 >
  
 <motion.button type="submit" disabled={loading} className="py-3 bg-gradient-to-tr from-purple-400 w-full to-violet-600 

 text-white rounded-md cursor-pointer"
 
 
   whileHover={{ scale: 1.02 }}

  whileTap={{ scale: 0.97 }}

 >

 {loading ? <>{text}<Cursor cursorStyle="|" /></> : "Login"}
    


    </motion.button>

 

 <motion.a  
    
    href="https://quick-chat-api.bonto.run/users/google" 
    
className="w-full flex items-center justify-center gap-2 border border-gray-500 bg-white/5 text-white p-2 rounded-md mt-3 hover:bg-white/10 transition-all"    
    
    whileHover={{ scale: 1.02 }}

    whileTap={{ scale: 0.97 }}
    
    >
      
     <FcGoogle size={24}  />
    
      Login With Google
      
      </motion.a >

  </motion.div> 

    

 <p className="text-center text-sm text-gray-400"> Already have an account?{" "}

 <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-all">

    Register

  </Link>

 </p>  {/*  text-center text-sm text-gray-400  */}


 </motion.form> {/*  border-2 bg-white/8 text-white border-gray-500 p-6  */}


 </div>  //{/*  min-h-screen bg-cover bg-center  */}


)




}