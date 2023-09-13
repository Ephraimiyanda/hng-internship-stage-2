import SideBar from "@/components/sidebar"
export default function RootLayout({children}:any){
return(
    <div className="flex w-screen">
    <SideBar/>
    {children}
</div>
)
}