import { Button } from "@/components/ui/button";
import { History, Settings, Database, Github, Globe, Copy } from "lucide-react";

const Navigation = () => (
  <nav className="px-4 py-2 flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
        <img src="https://gptengineer.app/img/lovable-logo.svg" alt="Lovable Logo" className="h-3.5 w-3.5" />
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
);

export default Navigation;