
import Image from "next/image";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
<body className="relative min-h-screen bg-black">
  {/* نسختين بس على الشاشات الصغيرة */}
  <div className="sm:hidden absolute inset-0 -z-10 flex flex-col">
    <div className="relative w-full h-1/2">
      <Image fill alt="background" src="/bgImage.svg" className="object-cover" />
    </div>
    <div className="relative w-full h-1/2">
      <Image fill alt="background" src="/bgImage.svg" className="object-cover" />
    </div>
  </div>

  {/* السلوك العادي على الشاشات الأكبر */}
  <Image 
    fill 
    alt="background" 
    src="/bgImage.svg" 
    className="hidden sm:block xl:object-cover object-contain -z-10" 
  />

  {children}
</body>
     
    </html>
  );
}
