


"use client"

import api from "@/lib/api"
import socket from "@/lib/socket"
import { motion } from "motion/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface SelectedUser {

_id : string ,

username : string ,

profilePic ?: {url : string}


}



interface Message {

_id : string ,

conversationId : string ,

content : string ,

sender : {

_id : string ,

username : string ,

email : string 

} ,

createdAt : string 

}




interface ChatWindowProps {

selectedUser:SelectedUser | null

}



export default function ChatWindow({ selectedUser }:ChatWindowProps){


 const [conversationId , setConversationId] = useState <string | null> (null)   


 const [messages , setMessages] = useState <Message[]> ([])


 const [newMessage , setNewMessage] = useState("") 


 const messageEndRef =  useRef <HTMLDivElement>(null) // عشان نحدد اخر رسالة فين ونبدأ نعمل سكورول ليها


const [currentUserId, setCurrentUserId] = useState<string | null>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const id = localStorage.getItem("userId");
    setCurrentUserId(id);
  }
}, []);
// بنجيب الايدي بتاع مستخدم في لوكيل ستوريج عشان نعرف مين مستخدم حالي هتبدأ محادثة وتكلموة



useEffect(()=> {


if(!selectedUser) return ; // لو مستخدم مخترش حد يبدأ محادثة متشغلش فونشين دة وقف على طول


const initCoversation = async () => {

try {

 const res = await api.post("/conv/private-chat" , { otherUserId : selectedUser._id })   

// بنكريت محادثة جديدة على حسب يوسير ايدي اللى مستخدم اختارة هو هيكملوة طبعا سيلكيت ايدي دة متخزن هنا في سبايدر بيانات مستخدم جواها واحنا بصينا بوربس بارميتر

// otherUserId دة باك اند ثابت احنا كتبينوة عشان نعرف مستخدم هيبدأ محادثة مع مين بظبط

// نخزن بقي الايدي بتاع محادثة هنا

setConversationId(res.data._id) // هنستخدموة بعدين في رسايل لما نيجي نبعت رسايل نوجة مستخدم لمحادثة عايز يكلم فية


}


catch(err){

 console.log(err)

}
 

}

initCoversation ()

}, [selectedUser])



///////////////////////////////////////////////////////////////////////////////// 


useEffect(()=> {


if(!conversationId) return


const fetchMessages = async ()=> {


try{

const res = await api.get(`/messages/${conversationId}`)

setMessages(res.data)


}

catch(err){

 console.log(err)

}

}

fetchMessages()


// خلاص اتأكدنا من ايدي بتاع محادثة نبدأ بقي نظبط ونعمل حدث بتاعنا ونضم ايدي بتاع محادثة دة لسوكيت عشان يشتغل


socket.emit("joinRoom" , conversationId)


const handleNewMessages = (message :Message) => {

// بنتأكد ان الايدي بتاع محادثة دة هو هو نفس الايدي عشان نخزنوة في سيت ماسج نخزن رسايل لازم نتأكد قبلها من الايدي اللى جاي من سوكيت بتاع محادثة هو هو نفس الايدي متخزن عندنا في محادثة 

if(message.conversationId === conversationId) {

setMessages((prev) => [...prev , message]) // بخزن رسالة جديدة مع رسايل قديمة داخل سيت ماسج

}


}


socket.on("newMessage" , handleNewMessages)


// بعد ما خزن رسايل جديدة في حدث نيو ماسج نبدأ بقي نقفل الحدث بتاعنا لو مستخدم مش هيبعت رسالة جديدة خلاص ويخرج من شات

return ()=> {

 socket.off("newMessage" , handleNewMessages) 

}

} , [conversationId])



useEffect(()=> {


messageEndRef.current?.scrollIntoView({behavior : "smooth"})

// بقولوة اخر رسالة لمستخدمين بعتهوها وتيجي تنزل سكورول انزل بطريقة ناعمة في حالة اخر رسالة

}, [messages])


const handleSend = () => {

 if(!newMessage.trim() || !conversationId || !currentUserId ) return // لو مفيش تفاصيل مستخدم ولا محادثة ولا رسالة ولا محتوي حتي وقف فونشين


socket.emit("sendMessage" , {

conversationId ,

sender : currentUserId ,

content : newMessage


})

  setNewMessage("") // فضيلي رسالة جديدة

}


const [isOtherTyping , setIsOtherTyping] = useState(false) 


const typingTimer = useRef<NodeJS.Timeout | null> (null)


// عملنا متغيرين متغير يغير قيمة كتابة بترو لو مستخدم اخر بيكتب والمتغير تاني بيراقب عملية يشوف مين اخر مستخدم كان بيكتب فيهم او هل مستخدم اخر دة وقف كتابة ولا لاء بيراقب عملية


const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {

setNewMessage(e.target.value) //  نحدث رسايل جديد لما مستخدم يبدا كتابة


if(!conversationId || !currentUserId) return ; // لو مش نفس ايدي مستخدم حالا ومش نفس ايدي غرفة وقف فونشين


socket.emit("typing" , {conversationId , userId : currentUserId})


// هنبدا بقي نعمل وقت مثلا ثانيتين اول ما مستخدم يوقف كتابة نخفي كلمة يكتب... نخفيها لو عدي ثانيتين بالحدث بتاعنا


if(typingTimer.current) clearTimeout(typingTimer.current) // صفرلي وقت لو مستخدم بطل كتابة كود دة مش هيتنفذ غير في حالة لو مستخدم وقف كتابة صفرلي وقت وابدء وقت من جديد تاني لو حب يكتب تاني


typingTimer.current = setTimeout(() => {


 socket.emit("stopTyping" , {conversationId , userId : currentUserId}) 

} , 2000) 

// 2000 دة ملي ثانية يعني ثانيتين فقط مستخدم عدي ثانيتين اخفي كلمة تايبنج ولو هيبدأ يكتب من جديد ابدلوة من اول جديد

}





useEffect(() => {

  // نبدأ بقي نستلم حدث سوكيت جاي من باك اند ونفعل ستيت بتاعنا ويشتغل مع الحدث على طول

  if(!conversationId) return ; // لو مفيش محادثة اخرج من فونشين دي وقفها متكملش
  
  
  const handleUserTyping = (typingUserId : string) => {


   if(typingUserId !== currentUserId){

   // بقارن الايدي جاي في بارميتر بالايدي متخزن عندي بقولوة لو هو هو نفس مستخدم الغية لو الايدي زاي بعض لو نفس مستخدم كلمة يكتب ... متظهرلش لنفس مستخدم لكت لمستخدم اخر
 
   setIsOtherTyping(true)
   
  // فعلهالي وكدة مستخدم تاني هيقدر يشوف مين بيكتب

   }
   
  }




//////////////////////////////////////////////////////////////////////////// 

// الحدث تاني وقف كتابة


const handleStopTyping = (typingUserId : string) => {


if(typingUserId !== currentUserId) {
 
  setIsOtherTyping(false) // وقف الحدث لما مستخدم يبطل كتابة

}

}


socket.on("userTyping" , handleUserTyping)

socket.on("userStopTyping" , handleStopTyping)


return () => {

 socket.off("userTyping" , handleUserTyping) 

 socket.off("userStopTyping" , handleStopTyping)
 
}


} , [conversationId , currentUserId]) // احداث دي تشتغل بناء على المستخدم داخل محادثة فقط













if (!selectedUser) {

    return (

      <motion.div 
      
      className="flex-1 flex flex-col items-center justify-center text-gray-200 h-full gap-4 p-4 text-center"
      
      animate={{ y: [0, -10, 0] }}
      
      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      
      >

         <Image width={128} height={128} src="/logo_icon.svg" alt="pic" className="w-32 h-auto opacity-80"/>

        <p className="text-xl font-medium tracking-wide"> Chat anytime , anywhere</p>
        
      </motion.div>
    )
  }

 

  return (


   <div className="flex flex-col h-full">


    <div className="flex items-center gap-3 p-3 w-[520px] border-b  border-gray-600">
      
 
   <div className="relative w-10 h-10 ">

    <Image src={selectedUser.profilePic?.url || "/avatar.png"} alt={selectedUser.username} fill className="rounded-full object-cover" />

     
   </div> {/*  relative w-10 h-10 */}
   
    <p className="text-white font-medium">{selectedUser.username}</p>

     {isOtherTyping && (
    <span className="text-xs text-violet-400 animate-pulse">
      typing...
    </span>
  )}


    </div> {/* flex items-center gap-3 p-3  */}
   

    
    <div className="flex-1 custom-scrollbar min-h-0 overflow-y-auto p-4 flex flex-col gap-2">

   
   {

    messages.map((msg)=> {
     

      const senderId = typeof msg.sender === "object" ? msg.sender?._id :msg.sender

       const isMyMessage = String(senderId) === String(currentUserId)  
  
return (

      <div
        key={msg._id}

        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm break-words whitespace-pre-wrap ${

          isMyMessage

            ? "bg-violet-600 text-white self-end ml-auto"

            : "bg-[#282142] text-gray-100 self-start mr-auto"
         
            // خزنة الايدي هنا عشان على طول مستخدم دة يبعت رسالة يكون لون رسالة بتاعتوة بلون موف دة ولما حد يبعتلوة رسالة يكون بلون رمادي دة لاننا كنا معتمدين على سوكيت فكان رسالة بتاخد وقت عقبال ما توصل للمستخدم خليناها كدة

        }`}
      >
        {msg.content}
      </div>

      )
    })
  
   }
  

   
  

    <div ref={messageEndRef} />

    </div> {/*  flex-1 overflow-y-auto p-4 flex flex-col gap-2  */}
      


    <div className="flex items-center gap-2 p-4 w-[520px] border-t border-gray-600" >

      
      <input type="text" value={newMessage} 
      
      onChange={handleInputChange} 

        placeholder="start message ..."

        onKeyDown={(e)=> e.key === "Enter" && handleSend()}
        
         className="flex-1 bg-[#282142] text-white text-sm rounded-full px-4 py-2 outline-none"
        />
     
  
       <button
          onClick={handleSend}
          className="bg-gradient-to-tr from-pink-400 to-violet-600 text-white px-4 py-2 rounded-full text-sm cursor-pointer"
        >
          Send
        </button>

    </div>  {/*  flex items-center gap-2 p-4 w-[520px]  */}    


    </div> // {/*  flex flex-col h-full  */}

  )

































}













