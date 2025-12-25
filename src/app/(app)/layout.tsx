import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import MusicPlayer from '@/components/MusicPlayer';
import { Logo } from '@/components/Logo';
import { Nav } from '@/components/Nav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <MusicPlayerProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar collapsible="icon" className="border-r">
            <SidebarHeader>
              <Logo />
            </SidebarHeader>
            <SidebarContent>
              <Nav />
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-foreground">User Name</span>
                  <span className="text-muted-foreground">user@email.com</span>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex flex-1 flex-col">
            <header className="flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
                <SidebarTrigger className="md:hidden"/>
                <div className="relative ml-auto flex-1 md:grow-0">
                    {/* This could be a global search component in the future */}
                </div>
            </header>
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </div>
        <MusicPlayer />
      </SidebarProvider>
    </MusicPlayerProvider>
  );
}
