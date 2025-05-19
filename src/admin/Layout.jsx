import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Outlet } from "react-router-dom"  // <-- use Outlet here!

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger className="[&>svg]:h-20 [&>svg]:w-20" />
        <Outlet /> {/* <--- Page content will render here based on the route */}
      </main>
    </SidebarProvider>
  )
}
