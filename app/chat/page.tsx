
// "use client"

// import { useEffect, useState } from "react"

// import api from "@/lib/api"



// interface Conversation{

//   _id : string ,

//   isGroup : boolean ,

//  GroupName : string ,

//  members : { _id : string , username : string , email:string }[]

// }

// interface Message {

// _id : string ,


// conversation : string ,

// sender : {

//  _id : string ,
 
//  username : string , 

//  email : string ,

// },

// content : string ,

// createdAt : string ,

// } 



// interface UserResult {

// _id : string ,

// username : string ,

// email : string  // دة اوبجكيت هنستخدموة في بحث عشان لو مستخدم حب يبحث عن مستخدم معين نتأكد من هويتة من الايدي وهل نفس مستخدم اللى يوسير عايزوة ولا لاء 

// // وكمان هيرجعلي نتيجة بحث مثلا احمد احمد دة متخزن عندي في داتا بيز يروح يبدأ محادثة معاة

// }





// export default function ChatPage() {


// const [conversations , setConversations] = useState<Conversation[]>([])


// const [messages , setMessages] = useState <Message[]> ([])


// const [newMessage , setNewMessage] = useState("") 


// const [search , setSearch] = useState("")
 
// const [isSending, setIsSending] = useState(false) // بدل ما رسايل بتكتب بسرعة وبضغط بسرعة وبتكرر عملنا ستيت يمنع تكرار رسايل تتبع وراة بعض


// const [searchResult , setSearchResult] = useState<UserResult[]>([]) 

// // دة بنخزن اسامي ناس عاملناة عليهم بحث عشان خاطر تبدأ محادثة معاهم و دردشة معاهم

// const [myId , setMyId] = useState<string|null>(null)

// // احنا لما بنبحث عن مستخدم بنبحث عن اشخاص معينة طيب انا مش عايزوة يبحث عن شخص يطلعلي شخص دة هو انا يعني كأني ببحث عن نفسي في بحث و دة غلط الصح تبحث عن اشخاص تانية وطيب هتميز مابينهم ازاي هقولوة تحت ابحث عن اشخاص يكون ايدي بتاعهم مش زاي ايدي بتاعي كدة هيعرضلي كل ناس في ابلكشين ماعدا انا في شريط بحث لما اجي ابحث عليهم وبتساوي نال لأن نال دي معناها فاضية مفيش قيمة لسة في اول


// const [chatActive , setChatActive] = useState("") // بنعرف انهي محادثة مستخدم واقف عليها تلؤتي ونحددهالو


// // هنجيب كل محادثات بتاع مستخدم دة مع باقي ناس بحيث اول مستخدم يسجل دخول يخش على طول يلاقي اخر محادثاتة مع الناس بيكلمهم



// useEffect(()=> {


// const fetcCoversations = async() => {

// try {
  
// const res = await api.get("/conv") 


// setConversations(res.data) // خزنلي محادثات هتجبها من سيرفر في ستيت دة

// }


// catch(e){

//  console.error("Failed to fetch conversations", e)
// }

// }


// // بعدها بشغل فونشين بتاعي عشان يجبلي محادثات من سيرفر بتاعي 


// fetcCoversations()

// } , [])



// /////////////////////////////////////////////////////////////////////////////////////////////////////


// useEffect(() => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     const payload = JSON.parse(atob(token.split(".")[1]))
//     setMyId(payload.userId) 

//   // token توكين لما بيتفك بيتقسم تلات حاجات قيمة تحتيك دولت عشان كدة حولنا التوكين اللى جاي من سيرفر على هيئة جيسون حولنا لاوبجكيت واستخدمنا خاصية اتوب دة بيفكر تشفير توكين وقولتلوة جوة توكين افصلي تلات قيم فحطيت نقطة على اساس افصل كل قيمة لوحدها واستخدمت انديكس 1 عشان خاطر اقدر اجيب بيلود اللى هو فية بيانات مستخدم والايدي بتاعوة 

//   //   Header (الترويسة)

//   //    Payload (المحتوى / البيانات) احنا بقي عايزين قيمة دي فيها ايدي بتاع مستخدم بنشوف انهي مستخدم فاتح تلؤتي ونخفي الايدي بتاعوة من شريط بحث

//   //    Signature (التوقيع) 

//   }
// }, [])


// useEffect(()=> {


// if(!search || !search.trim()){

// setSearchResult([]) // احنا بنفضي نتائج معروضة جوة شريط بحث متخزنة في ستيت دي داخل مصفوفة فأنا هنا بقولوة لو مفيش سيرش او فية مسافة في سيرش على طول متعرضليش نتائج بحث متخزنة عندك واخرج من فونشين على طول

// return ;

// }


// // انت كل حرف بتكتبوة في شريط بحث بيأثر بيبعت طلب لسيرفر وكدة انت بتأثر على سيرفر تخيل في اكتر من 100 مستخدم وكل واحد كتب حرف واحد في بحث الحرف دة على طول يبعت طلب لسيرفر 100 واحد في نفس الوقت هيأثر على سيرفر ويخلي سيرفر بطئ عشان كدة استخدمنا سيت تايم يعني توقيت يعني متبعتش اي كلمة للسيرفر غير لما يكون وقت حدث دة خلص ولما يخلص ابعت طلب لسيرفر تخيل انت كل مرة من غير توقيت بتبعت اكتر من 5 طلبات لان كل حرف بياخد طلب لباك اند لسيرفر بتاعوة عشان كدة عملنا وقت قولتلوة لما يخلص طلبوة ويعدي 400 ملي ثانية خلاص ابدء شغل فونشين وابعت طلب لسيرفر فالبتالي بدل ما كنت بتبعت ستة طلبات بسبب انك كاتب ستة حروف هتبعت طلب واحد فقط بكلمة واحدة فقط

// const delayTime = setTimeout(async () => {


//  try {

//   const res = await api.get(`/people/search?username=${search}`)

// // ?username دي كويري كتبنها هناك في باك اند لو فاكر وعلامة استفهام دي بعد كويري يعني معناها بعد علامة استفهام دي شايلة قيمة

// setSearchResult(res.data.filter((u: UserResult) => u._id !== myId))
//  }

// catch(e){
//       console.error("Search failed", e)
// }


// } , 400 )

// // 400 دة ملي ثانية مش ثانية يعني دة فونت ثانية زاي مابنقول بعامية

// // 400 ملي ثانية عشان يستناة مستخدم خلص كتابة ولا لسة ويبعت طلب لسيرفر بدل ما كل حرف مستخدم يكتبوة يبعت طلب طلب كل شواية يعني لو اسمة من خمس حروف هيبعت خمس طلبات و دة هيخلي سيرفر تقيل


// return ()=> clearTimeout(delayTime) // يعني صفرلي قيم قديمة مستخدم كتبها قبل كدة عشان نبدأ نكتب قيم على نطافة عدي على 400 ملي ثانية خلاص امسحلي قيم مستخدم كتبها قبل كدة عشان نكتب قيم تانية جديدة داخل سيرش


// } , [search])

// // [search] اشتغل على قيمة دي بس كل مرة تتغير


// ////////////////////////////////////////////////////////////////////////////////////////// 

// // تلؤتي احنا هنعمل احداث الاحداث دي وقت ضغط على رسالة او ارسال رسالة او رسالة جديدة عشان كدة مستخدمتش يوس ايفكيت لان يوس ايفكيت بيشتغل تلقائي على متصفح اول متفتح موقع او صفحة لكن هنا انت عايز مستخدم هو يتحكم في ارسال رسالة او يبحث عن شخص معين او لما يلاقي شخص بيبحث عنة كدة يعني



// const startConversation = async(otherUserId : string) => {

// try{

// const res = await api.post("/conv/private-chat" , {otherUserId})


// const updated = await api.get("/conv")

// setConversations(updated.data)  // اطبعلي محادثات كلها ومعاها محادثات جديدة جاية من سيرفر

// setChatActive(res.data._id) // بنعرف انهي محادثة شغالة تلؤتي وفاتحة تلؤتي 

// setMessages([]) // نفضي رسايل ويبدأ يبعت رسايل جديدة مع شخص اخر من غير سطر دة كأنك واقف لسة في نفس محادثة ومفيش حاجة حصلت وانت عايز تروح تكلم شخص اخر 

// setSearch("") // خلاص بحثت عن شخص اقفل بحث بقي متفضلش متعلق كدة بالبحث فضيلي بحث خالص 

// setSearchResult([]) 

// // الفكرة مستخدم وصل لمحادثة خلاص بقي مالهاش لازمة بقي  البحث بقولوة فضيهالي لما يوصل للى مستخدم وفضيلي نتيجة بحث وشغلي المحادثة هاتلي الايدي بتاع محادثة دي تلؤتي شغالين فيها تلؤتي بيكلموة وهاتلي جميع محادثات وخزنهالي في سيت محادثات

// }



// catch(e){

// console.error("Failed to fetch conversations", e)

// }

// }


// // احنا فوق عملنا محادثات وشايلة الايدي بتاع محادثة والاسم الشخص وتاريخ لكن مش شايلة المحتوي اللى هو رسايل مابين طرفين عشان كدة فونشين تحتينا بقي نعملوة ونشوفة بقي نظبطوة بنجيب محتوي جوة اللى هو رسايل لو مستخدم حب يفتح يشوف رسايل جديدة مين مستخدم بدأ وكدة

// //////////////////////////////////////////////////////////////////////////////////////////// 

// const openConversation = async(id : string) => {

// setChatActive(id) // بنحدد ونعرف محادثة اية مستخدم رجعلها وفاتحها انهي محادثة شغالة تلؤتي 

// setMessages([]) // بنفضي رسايل لو فية رسايل قديمة قبل كدة بنفضيها عشان خاطر لو جبنا رسايل جديدة من سيرفر

// try{

// const res = await api.get(`/messages/${id}`) // بنجيب المحتوي او الايدي بتاع رسايل بتاع مستخدم ونعرض كل رسايل بتاع محادثة 

// setMessages(res.data)

// }


// catch(e){

// console.error("Failed to fetch conversations", e)

// }

// } 

// // دي مسئولة انها تعرضلي شات كل رسايل مع المستخدم دة جميع رسايلك معاة وبنعرف انهي محادثة مفتوحة تلؤتي وشغال متأكتيفة


// ////////////////////////////////////////////////////////////////////////////////////////////////////



// const handleSend = async()=> {

// if(!newMessage.trim() || !chatActive || isSending) return; // بقولوة لو مفيش رسالة جديدة وفية مسافات كمان ومفيش محادثة شغالة تلؤتي وقف فونشين واخرج منها

// setIsSending(true)

// try {

// const res = await api.post(`/messages/${chatActive}` , {

// content : newMessage // نعرف انهي محادثة متأكتيفة تلؤتي وشغالة تلؤتي عشان كدة خزنت الايدي بتاع محادثة تلؤتي في متغير ونعرض منها رسايل المستخدم هيبعتها لانك انت لسة هتبدأ محادثة جديدة هتبدأ ترسل رسالة جديدة او هتبدأ محادثة جديدة

// }) 


// setMessages((prev)=> [...prev , res.data]) // بنخزن رسالة جديدة دي مع رسايل قديمة قبل كدة

// setNewMessage("") // خلاص رسالة وصلت لمستخدم تاني خلاص بقي حدثلي الانبوت بقي بعد ما مستخدم بعت رسالة


// }


// catch(e){

// console.error("Failed to fetch conversations", e)  

// }
  
//  finally {
//     setIsSending(false)   // <-- دي السطر الناقص
//   }

// }





//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-1/4 border-r overflow-y-auto">
//         <h2 className="p-4 font-bold text-lg">Conversations</h2>

//         {/* شريط البحث */}
//         <div className="px-4 mb-4 relative">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="search your friend"
//             className="w-full border p-2 rounded-md"
//           />
//           {/* نتايج البحث */}
//           {searchResult.length > 0 && (
//             <div className="absolute z-10 w-full border rounded-md bg-white shadow mt-1">
//               {searchResult.map((u) => (
//                 <div
//                   key={u._id}
//                   onClick={() => startConversation(u._id)}
//                   className="p-2 cursor-pointer hover:bg-gray-100"
//                 >
//                   {u.username}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* قائمة المحادثات */}
//         {conversations.map((conv) => (
//           <div
//             key={conv._id}
//             onClick={() => openConversation(conv._id)}
//             className={`p-3 cursor-pointer hover:bg-gray-100 ${
//               chatActive === conv._id ? "bg-gray-200" : ""
//             }`}
//           >
//             {conv.isGroup
//               ? conv.GroupName
//               : conv.members
//   .filter((m) => m._id !== myId)
//   .map((m) => m.username)
//   .join(", ")}
//           </div>
//         ))}
//       </aside>

//       {/* Chat Window */}
//       <main className="flex-1 flex flex-col">
//         <div className="flex-1 overflow-y-auto p-4">
//           {chatActive ? (
//             messages.length > 0 ? (
//               messages.map((msg) => (
//                 <div key={msg._id} className="mb-2">
//                   <span className="font-semibold">{msg.sender.username}: </span>
//                   <span>{msg.content}</span>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-400"> Send first message ...</p>
//             )
//           ) : (
//             <p className="text-gray-400">Choose your own conversaiton</p>
//           )}
//         </div>

//         {/* Input */}
//         {chatActive && (
//           <div className="p-4 border-t flex gap-2">
//             <input
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//               className="flex-1 border rounded px-3 py-2"
//               placeholder="type your message ..."
//             />
//             <button
//               onClick={handleSend}
//                 disabled={isSending}
//               className="bg-blue-500 text-white px-4 py-2 rounded"
//             >
//               Send
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   )




// }





"use client"

import { useEffect, useState } from "react"

import api from "@/lib/api"

import Spider from "@/components/spider"

import ChatWindow from "@/components/chatWindow"


interface SelectedUser {

  _id: string

  username: string

  profilePic?: { url: string }

}

export default function ChatPage () {


const [selectUser , setSelectUser] = useState<SelectedUser | null>(null)

return(


<div className="border w-full h-screen px-[0.15%] py-[4%] sm:px-[6%] sm:py-[2.5%] md:px-[10%] md:py-[3%] lg:px-[12%] lg:py-[3%]">

  
  <div className="backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 relative">
  
  
 <div className="border-r border-gray-600  overflow-y-auto">

      <Spider selectedUser= {selectUser} onSelectUser ={setSelectUser} />
      
      

       </div> {/* border-r border-gray-600 p-4 overflow-y-auto  */}


  <div className="flex flex-col min-h-0 h-full md:col-span-2">

         <ChatWindow selectedUser={selectUser}  />

    </div>  {/* flex flex-col h-full */}


 </div> {/*  backdrop-blur-xl border-2 border-gray-600 rounded-2xl  */}



 </div> //{/*  border w-full h-screen sm:px-[15%] sm:py-[5%]  */}


)

























































}










