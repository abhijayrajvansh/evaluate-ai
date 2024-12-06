// "use client"

// import * as React from "react"
// import {
//   AudioWaveform,
//   BookOpen,
//   Bot,
//   Command,
//   Frame,
//   GalleryVerticalEnd,
//   Map,
//   PieChart,
//   Settings2,
//   SquareTerminal,
// } from "lucide-react"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarRail,
// } from "@/components/ui/sidebar"
// import { VersionSwitcher } from "./parts/version-switcher"

// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: "",
//   },
//   projects: [
//     {
//       name: "Resume",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Objectives",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Github",
//       url: "/dashboard/github",
//       icon: Map,
//     },
//   ],
//   individual: [
//     {
//       name: "Projects",
//       url: "/dashboard/projects",
//       icon: PieChart,
//     },
//   ],
// }

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar collapsible="icon" {...props}>
//       <SidebarHeader>
//         <VersionSwitcher />
//       </SidebarHeader>
//       <SidebarContent>
//         <NavProjects projects={data.projects} />
//         <NavProjects projects={data.individual} />
//         {/* add more sub division routes here... */}
//       </SidebarContent>
//       <SidebarFooter>
//         <NavUser user={data.user} />
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   )
// }
