import { PrivateRouteNavbar, Sidebar, TokenValidator } from "@/components";
import { SidebarProvider, SidebarTrigger } from "@/components/ui";

export default function PrivateRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="bg-primary-5 relative">
      <TokenValidator />
      <Sidebar />
      <div className="w-full min-h-screen h-full py-4 pr-4 lg:pl-0 sm:p-6 p-3">
        <div className="fixed h-screen items-center z-50 hidden lg:flex">
          <SidebarTrigger className="" />
        </div>

        <PrivateRouteNavbar />

        <div className="mt-28 w-full rounded-card-medium bg-white p-6 lg:mt-0">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
