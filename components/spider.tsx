import Image from "next/image";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import UserList from "./UserList";

import { motion, AnimatePresence } from "motion/react";


interface SpiderProps {

  selectedUser: { _id: string; username: string; profilePic?: { url: string } } | null

  onSelectUser: (user: { _id: string; username: string; profilePic?: { url: string } }) => void

}



export default function Spider ({ selectedUser ,onSelectUser} : SpiderProps ) {


 const [openMenu , setOpenMenu] = useState(false)   

//  هنمسك ايدي بتاع مستخدم بيبعت عشان خاطر ميشوفش شات بتاعوة اكيد مش هيكلم نفسة ويبعت رسالة لنفسة ونبدأ بقي نبصيها يوسير ليست ونقولوة لو مستخدم دة فاتح دلوقتي نفس الايدي متخلهوش يبقي عندة محادثة مع نفسة يشوف محادثاتة مع غيرة فقط

 
const [currentUserId , setCurrentUserId] = useState <string| null> (null)
 
const [searchUser , setSearchUser] = useState("")


useEffect(()=> {

if(typeof window !== "undefined") {


 const id = localStorage.getItem("userId") 

 setCurrentUserId(id)

}


} , [])


const router = useRouter()

const EditProfile = () => {


router.push("/people/profile-pic")

}


const handleLogOut = () => {


 localStorage.removeItem("token") 

 localStorage.removeItem("userId") 

 router.push("/login")

}




const handleSelectAndReset = (user: { _id: string; username: string; profilePic?: { url: string } }) => {
  // 1. نبعت المستخدم المختار للـ ChatWindow عادي
  onSelectUser(user);

  // 2. ننظف العداد للمستخدم ده
  setUnreadCounts((prev) => ({
    ...prev,
    [user._id]: 0,
  }));
};



return (

<div className="pb-5">


<motion.div  className="flex justify-between pl-2 items-center"

  initial={{ opacity: 0, y: -15 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.5, ease: "easeOut" }}

>


{/* <motion.div
  animate={{ y: [0, -6, 0] }}
  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
> */}

<Image 

 src="/logo.png" 

  alt="logo" 

  width={160} 

  height={40} 

  className="max-w-40 h-auto" 

   />


{/* </motion.div> */}


<div className="relative py-4 group">


 <motion.div whileTap={{ scale: 0.9 }}>

  <Image
    
 src="/menu_icon.png"

    alt="menu"

    width={20}

    height={20}

    className="max-h-6 w-auto cursor-pointer"
     
     onClick={()=> setOpenMenu(!openMenu)}

        />

</motion.div>


<AnimatePresence>

{openMenu && (


<motion.div  className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] 

border border-gray-600 text-gray-100 transition-all duration-500"

initial={{ opacity: 0, y: -10, scale: 0.95 }}

animate={{ opacity: 1, y: 0, scale: 1 }}

exit={{ opacity: 0, y: -10, scale: 0.95 }}

transition={{ duration: 0.2, ease: "easeOut" }}

>

 <p onClick={EditProfile} className="cursor-pointer text-sm">Edit Profile</p>
 
 <hr className="my-2 border-t border-gray-500"/>

 <p onClick={handleLogOut} className="cursor-pointer text-sm">Logout</p>

</motion.div > //{/*  absolute top-full right-0 z-20 w-32 p-5  */}


)
   

}


</AnimatePresence>

</div> {/*  relative py-2 group  */}


</motion.div > {/*  flex justify-between items-center  */}


<motion.div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5"

  initial={{ opacity: 0, y: -10 }}

  animate={{ opacity: 1, y: 0 }}

  transition={{ duration: 0.4, delay: 0.2 }}

  whileFocus={{ scale: 1.02 }}

>

 <Image
    
 src="/search_icon.png"

    alt="search"

    width={20}

    height={20}

    className="w-3"/>

   <input type="text" value={searchUser} onChange={(e)=> setSearchUser(e.target.value)}  className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1" placeholder="Search" />

</motion.div>


<UserList selectedUser={selectedUser} onSelectUser={handleSelectAndReset} myId = {currentUserId} SearchUser={searchUser} />

</div> //{/*  pb-5  */}



)





}







