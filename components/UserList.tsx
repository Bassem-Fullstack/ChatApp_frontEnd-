




"use client"


import api from "@/lib/api"

import socket from "@/lib/socket"

import Image from "next/image"

import { useEffect, useState } from "react"


import { AnimatePresence, motion } from "motion/react"

interface User {

_id : string ,


username : string ,

profilePic ? : {

url : string

}

}


interface UserListProps {

  selectedUser: User | null

  onSelectUser: (user: User) => void 

  myId?: string | null 

  SearchUser : string | null 


 
}



export default function UserList ({selectedUser , onSelectUser , myId , SearchUser } : UserListProps) {


const [users , setUsers] = useState <User[]> ([])

// دة متغير هنخزن فية كل مستخدمين مسجلين عندنا عشان نخزنوة  في ستيت هنا اللى جاي من داتا بيز


const [onlineUser , setOnlineUser] = useState <string[]>([])

// هنخزن فية كل مستخدمين فاتحين او متصلين دلوقتي فقط



// اول ما الصفحة تفتح براوزير تفتح على طول تروح تجبلي بيانات مستخدم على طول بسرعة يوس ايفكيت بتشتغل اول ماتفتح براوزير على طول


useEffect( () => {


const fetchUsers = async () => {

try{

 const res = await api.get(`/people/search?username=${SearchUser}`)

// { params : {username : ""} }) دي خاصية في مكتبة اكسيوس معناها هاتلي كويري في شريط بحث يبدأ بيوسير نيم هاتهولي


setUsers(res.data) // خزنة بيانات يوسير كلها اللى متخزنة في داتا بيز عندنا هنا في ستيت

}


catch(err){

console.log(err)

}

}


fetchUsers() // نشغل فونشين بقي بتاعنا 


// بعد كدة نستخدم سوكيت بتاعنا ونشوف مين مستخدم فاتح دلوقتي ومين اوفلاين

const currentUserId = localStorage.getItem("userId")


if(currentUserId){

 socket.emit("userOnline" , currentUserId) // بقولوة شغلي حدث يوسير اونلاين واعرفلي مين فاتح طبع احداث بتاع سوكيت لازم يكون مطابق لنفس حدث بتاع باك اند اقصد لازم يكون نفس اسم بظبط يوسير اونلاين في فروند اند ويوسير اونلاين في باك اند نفس الاسم زاي بعض

}


socket.on("checkUserOnline" , (onlineIds : string[]) => {


setOnlineUser(onlineIds) // دة بارميتر بيستقبل بيانات جاية من باك اند من غير بارميتر دة مش هتعرف تستقبل كمية الايدي بتاع مستخدمين عشان كدة استخدمنا بارميتر وحطينها في سيت اونلاين عشان نعرف مين مستخدم فاتح دلوقتي والحدث يشوف ويتأكد طبعا الباك اند يبعتلك مصفوفة فية مجموع الايدي بتاع مستخدمين يبعتهالك في مصفوفة انت بتستبقلها في مصفوفة برضو وتخزنة في ستيت هنا عشان نعرف مين مستخدم متصل ومين مش متصل

})


return () => {

socket.off("checkUserOnline") // اخرج برة فونشين وقفة لو مستخدم دة مش فاتح مش متصل

}


} , [SearchUser])




const filterUser = users.filter((user) =>  user._id !==myId)

// كدة هيفلتلري اسماء ناس فاتحين فقط

return(


<div className="flex flex-col gap-2 mt-4">


{
 
 filterUser.map((everyUser , index) => (

 <motion.div  key={everyUser._id} onClick={()=> onSelectUser(everyUser)} 
 
 className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-all ${

  selectedUser?._id ===everyUser._id ? "bg-white/20" : "hover:bg-white/10"

 }`}
 
 
 initial={{ opacity: 0, y: 10 }}

 animate={{ opacity: 1, y: 0 }}

 transition={{ duration: 0.15, delay: index * 0.015 }}

 >

 <div className="relative w-10 h-10"> 


 <Image src={everyUser.profilePic?.url || "/avatar.png"}  alt={everyUser.username} fill className="rounded-full object-cover" />
 

    <AnimatePresence>

  {
   onlineUser.includes(everyUser._id) && (

     <motion.span  className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0f0f1a] rounded-full"
     
     initial={{ scale: 0, opacity: 0 }}

     animate={{ scale: 1, opacity: 1 }}

     exit={{ scale: 0, opacity: 0 }}

     transition={{ duration: 0.2 }}

     >


     </motion.span>

   )

  }

</AnimatePresence>

 </div> {/* relative w-10 h-10 */}



<p className="text-white text-sm">{everyUser.username}</p>

 </motion.div > //{/* flex items-center gap-3 p-2 rounded-md */}

 
 ))

}



</div> //{/*  flex flex-col gap-2 mt-4  */}


)






}











