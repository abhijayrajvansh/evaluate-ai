import { AppSidebar } from "@/components/parts/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardNavigationContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <div className="p-6 space-y-6  mx-auto">
        {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardNavigationContainer;
