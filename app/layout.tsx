
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
      <body className="">
        
        {children}
       

        <p className=""></p>
         
      

      </body>
      
     
    </html>
  );
}
