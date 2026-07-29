
"use client"

import { jwtDecode } from "jwt-decode"
import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"


 interface DecodedToken {
  userId: string
}

export default function GoogleCallback(){



 const {token} = useParams () // بجيب توكين من لينك اللى باك اند هيبعتهولي من لينك يو ار ال    

 //const {token} دة اسم توكين فولدر اللى انا مسميها في نيكست جيس


const router = useRouter()


useEffect(() => {

  if (token) {

    const tokenString = Array.isArray(token) ? token[0] : token


    try{
       
      // احنا عايزين نفك توكين بتاع مستخدم لما سجل دخول بجوجل عشان خاطر نفعل زر الاخضر بتاع سوكيت لان انت معملتش ايدي للمستخدم سجل بجوجل تربطوة مع سوكيت عشان كدة حملنا مكتبة نفك توكين بتاعنا ونجيب منة الايدي ونخزنوة في لوكيل ستوريج
      
      const decode = jwtDecode<DecodedToken>(tokenString)

      localStorage.setItem("token", tokenString)

      localStorage.setItem("userId" , decode.userId)
          
    router.push("/chat")

    }
       
    catch(err){
     
      console.log(err)

      router.push("/login")

    }

  }
}, [token])

// Array.isArray(token)  دي دالة خاصية موجودة في جافا سكريبت بترجع ترو او فولس بقولوة هنا هل توكين جاي في مصفوفة لو جاية في مصفوفة خد اول واحدة ولا لو لاء خد توكين زاي ماهو كدة كنص

return(
 
    <p> Loading ... </p>

)

}


