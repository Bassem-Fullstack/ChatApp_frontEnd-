

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import Image from "next/image"
import { useTypewriter , Cursor } from "react-simple-typewriter"

export default function ProfilePicPage() {

const router = useRouter()

const [text] = useTypewriter({

 words : ["Loading..."] ,

 loop : true ,

 delaySpeed : 500 ,

 deleteSpeed : 50


})


const [selecFile , setSelectFile] = useState<File | null > (null)

// احنا هنعمل اتنين متغير واحد نبعت ملف لباك اند ومتغير تاني هنحول ملف صورة اوبجكيت دة للينك عشان خاطر هنعرض صورة اللى مستخدم اختارها ودامة في اتشمل في متصفح اتشمل ايمج مبيفهمش اوبجكيت بيفهم لينك مسار عشان كدة حولنا ملف اوبجكيت كلة لمسار لينك عشان صيغة اتشمل بتاع اميج يفهمهما

const [previewURL , setpreviewURL] = useState<string | null > (null)


const [error , setError] = useState("")


const [loading , setLoading] = useState(false)

// تحميل صورة


const hanldeFile = (e : React.ChangeEvent<HTMLInputElement>)=> {

// دة فايل انبوت لما مستخدم يرفع صورة من انبوت هيروح على طول على فونشين دة يخزن صورة في ستيت عندنا دة ونخزن كملف ونخزنة كيو ار ال عشان نعرضوة

const file = e.target.files?.[0] // بقولوة هاتلي اول ملف اوبجكيت هو طبعا صورة واحدة اوبجكيت داخل مصفوفة انديكس بتاعها صفر طبعا 


if(file){

 setSelectFile(file) // بنخزن صورة هنا كملف داخل ستيت هنا عشان بعد كدة نبعتها للباك اند

 setpreviewURL(URL.createObjectURL(file)) // حولنا ملف اوبجكيت دة فايل حولنا للينك عشان نعرضوة للمستخدم ونقولوة هو دة صورة عايز تنزلها

}

}


const handleUpload = async()=>{

if(!selecFile){

setError("choose a picture first")

return ; // بقولوة لو مستخدم مخترش صورة او مفيش صورة لهو خالص واول مرة يرفع صورة وضغط على زرار ابليوت من غير مايرفع صورة قولوة اختار صورة الاول

}  

// بعد كدة نفضي ايرور ونشغل عملية لودينج يفضل تفضي ايرورر 

setError("") // نفضي ايرورر بتاعنا 

setLoading(true) // نبدأ نحدث تحميل ونكلم باك اند بتاعنا عشان نخزن صورة في باك اند


try{

const formData = new FormData()

formData.append("image" , selecFile) // بنكتب صورة المفتاح بتاعنا اللى بيربط ما بين باك اند والفروند اللى هو اميج وتاني حاجة بنكتب فايل اية خزنها في ستيت عشان نبعتوة للباك اند

await api.patch("/people/profile-pic" , formData , {

headers : {

 "Content-Type" : "multipart/form-data" // سيرفر بيفهم حاجتين بيفهم جيسون او فورم داتا يعني هبعتلك ملف في اجزاء بيانات ثنائية في لينك على نصوص عشان كدة لما تبعت صورة متبعتش جيسون مش صح خالص ابعتوة كملف سيرفر و كدة كدة السيرفر بيفهم اي حاجة جاية من فورم داتا

} ,

})


router.push("/chat") // بعد ما يرفع صورتة رجعوة لصفحة شات رئيسية

}


catch(err:any){

const errorMessage = err.response?.data?.message || "Something Went Wrong"

setError(String(errorMessage))

}


finally{

 setLoading(false) // نوقف تحميل سواء عملية نجحت او فشلت

}

}


return (

<div className="border w-full h-screen px-[0.15%] py-[4%] sm:px-[6%] sm:py-[2.5%] md:px-[8%] md:py-[3%] lg:px-[12%] lg:py-[3%]">

<div className="backdrop-blur-xl overflow-hidden h-[100%] max-w-[1200px] mx-auto grid grid-cols-1 relative">
  
<div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-100 px-4">

<div className="max-w-md w-full border-2 bg-white/5 text-white border-gray-500 p-6 flex flex-col items-center gap-6 rounded-lg shadow-lg backdrop-blur-2xl">

<h2 className="text-2xl font-medium">Update Profile Picture</h2>

{error && <p className="text-red-500 text-sm">{error}</p>}


{

  <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-500">

   <Image src={previewURL || "/avatar.png"} alt="profile image" fill className="object-cover" />

  </div>  // {/*  relative w-32 h-32 rounded-full overflow-hidden  */}

 

}


<input type="file" accept="image/*" onChange={hanldeFile} className="text-sm text-gray-300" />



<div className="flex gap-3">

<button onClick={handleUpload} disabled={loading} className="py-3 px-6 bg-gradient-to-tr from-pink-400 to-violet-600 text-white rounded-md hover:from-pink-500 hover:to-violet-700 transition-all duration-300 cursor-pointer">


{loading ? <>{text}<Cursor cursorStyle="|" /></> : "Upload"}

</button>


<button type="button" onClick={()=> router.back()} className="py-3 px-6 border border-gray-500 bg-white/5 text-white rounded-md cursor-pointer hover:bg-white/10 transition-all">

 Cancel

</button>

</div>  {/*  min-h-screen flex flex-col items-center  */}

</div> {/*  max-w-md w-full border-2 bg-white/5 text-white border-gray-500 p-6 flex flex-col items-center gap-6 rounded-lg shadow-lg backdrop-blur-2xl  */}

</div> {/*  min-h-screen flex flex-col items-center  */}

</div> {/* backdrop-blur-xl overflow-hidden h-[100%] max-w-[1200px] mx-auto grid grid-cols-1 relative  */}

</div> // {/*  border w-full h-screen px-[0.15%] py-[4%] sm:px-[6%] sm:py-[2.5%] md:px-[8%] md:py-[3%] lg:px-[12%] lg:py-[3%]  */}


)













}

