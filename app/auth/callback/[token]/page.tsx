
"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"

 

export default function GoogleCallback(){



 const {token} = useParams () // بجيب توكين من لينك اللى باك اند هيبعتهولي من لينك يو ار ال    

 //const {token} دة اسم توكين فولدر اللى انا مسميها في نيكست جيس


const router = useRouter()


useEffect(() => {
  if (token) {

    const tokenString = Array.isArray(token) ? token[0] : token

    localStorage.setItem("token", tokenString)

    router.push("/chat")
  }
}, [token])

// Array.isArray(token)  دي دالة خاصية موجودة في جافا سكريبت بترجع ترو او فولس بقولوة هنا هل توكين جاي في مصفوفة لو جاية في مصفوفة خد اول واحدة ولا لو لاء خد توكين زاي ماهو كدة كنص

return(
 
    <p> Loading ... </p>

)

}


