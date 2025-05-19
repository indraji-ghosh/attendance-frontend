import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { PiStudentFill } from "react-icons/pi";
import { LuChartColumnStacked } from "react-icons/lu";
import { FaBook } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";




import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Stuedents",
    url: "/admin/student",
    icon: PiStudentFill,
  },
  {
    title: "Attendance",
    url: "/admin/attendance",
    icon: LuChartColumnStacked,
  },
  // {
  //   title: "Subjects",
  //   url: "/subject",
  //   icon: FaBook,
  // },
  // {
  //   title: "Teacher",
  //   url: "/teacher",
  //   icon: FaChalkboardTeacher,
  // },
  {
    title: "All attendance",
    url: "/admin/all-attendance",
    icon: LuChartColumnStacked,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="py-10"><h1 className="text-xl text-black">Attendance System</h1></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span className="text-l">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
