import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, Settings, Database, Github, Globe, Copy, Smartphone, RotateCw, Undo } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Index = () => {
  return (
    <div className="h-screen bg-[#09090B] text-white">
      {/* Top Navigation Bar */}
      <nav className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <img src="https://gptengineer.app/img/lovable-logo.svg" alt="Lovable Logo" className="h-4 w-4" />
          </Button>
          <Button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5">
            <Copy className="h-4 w-4 text-[#A1A1AA]" />
          </Button>
          <Button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5">
            <History className="h-4 w-4 text-[#A1A1AA]" />
            <span>Show history</span>
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5">
                three-js-magic
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Add dropdown items here */}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5">
            <Settings className="h-4 w-4 text-[#A1A1AA]" />
          </Button>
          <Button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5">
            <Database className="h-4 w-4 text-[#A1A1AA]" />
            <span>Supabase</span>
          </Button>
          <Button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5">
            <Github className="h-4 w-4 text-[#A1A1AA]" />
            <span>GitHub</span>
          </Button>
          <Button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5">
            <Globe className="h-4 w-4 text-[#A1A1AA]" />
            <span>Publish</span>
          </Button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-48px)]">
        {/* Left Sidebar */}
        <div className="w-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-4">
              <p className="text-sm mb-4">
                If your project requires backend functionality, you can use the Supabase menu on the top right to connect your project to Supabase.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-[#242428]">
                  <Settings className="h-4 w-4" />
                  <span>Manage knowledge</span>
                </Button>
                <Button variant="outline" size="sm" className="bg-[#242428]">
                  Supabase integration docs
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <img src="https://gptengineer.app/img/lovable-logo.svg" alt="Lovable Logo" className="h-5 w-5 mt-1" />
                <span className="font-medium">Lovable</span>
              </div>
              <p className="text-sm text-gray-300">
                Hi! I see you have a Three.js scene already set up in your project. It currently shows a rotating green cube with proper lighting and responsive behavior. Would you like to modify this scene or create something new with Three.js? I can help you:
              </p>
              <ul className="list-decimal pl-6 text-sm text-gray-300 space-y-2">
                <li>Add different 3D shapes</li>
                <li>Change colors and materials</li>
                <li>Add more complex animations</li>
                <li>Implement user interactions</li>
                <li>Add more advanced lighting effects</li>
              </ul>
              <p className="text-sm text-gray-300">
                Let me know what specific changes or features you'd like to explore!
              </p>
            </div>
          </div>

          {/* Input Section */}
          <div className="p-4">
            <Input 
              placeholder="Request a change..." 
              className="bg-[#18181B] border-0 focus:bg-[#27272A] rounded-xl focus:outline-none focus:ring-0"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Build front-end with React, Tailwind & Vite.
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800">
          {/* URL Bar */}
          <div className="bg-black border-b border-[#09090B] px-4 py-2 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>preview--three-js-magic.gptengineer.run</span>
              <span>/</span>
              <span>index</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button className="items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]">
                <Copy className="h-4 w-4 text-white" />
              </Button>
              <Button className="items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]">
                <Smartphone className="h-4 w-4 text-white" />
              </Button>
              <Button className="items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]">
                <RotateCw className="h-4 w-4 text-white" />
              </Button>
              <Button className="items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]">
                <Undo className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center h-full p-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">{">"}</span>
              </div>
              <p className="text-gray-400">Spinning up preview</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;