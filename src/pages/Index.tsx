import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, History, Settings, Database, Github, Globe, Copy, Mobile, RotateCw, Undo } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <nav className="border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-orange-500">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Copy className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Show history</span>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                three-js-magic
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Add dropdown items here */}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Supabase</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Publish</span>
          </Button>
        </div>
      </nav>

      {/* URL Bar */}
      <div className="border-b border-gray-800 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-400">
          <span>preview--three-js-magic.gptengineer.run</span>
          <span>/</span>
          <span>index</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Copy className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mobile className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <RotateCw className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Undo className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-96 border-r border-gray-800 p-4">
          <div className="mb-4">
            <p className="text-sm mb-4">
              If your project requires backend functionality, you can use the Supabase menu on the top right to connect your project to Supabase.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Manage knowledge</span>
              </Button>
              <Button variant="outline" size="sm">
                Supabase integration docs
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Heart className="h-5 w-5 text-orange-500 mt-1" />
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

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <Input 
              placeholder="Request a change..." 
              className="bg-gray-900 border-gray-700"
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              Build front-end with React, Tailwind & Vite.
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-gray-900 p-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">{">"}</span>
            </div>
            <p className="text-gray-400">Spinning up preview</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;