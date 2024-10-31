import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { History, Settings, Database, Github, Globe, Copy, Smartphone, RotateCw, Code } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [fullResponse, setFullResponse] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-html', {
        body: { prompt },
      });

      if (error) throw error;

      // Always show the full response in the sidebar
      setFullResponse(data.fullResponse);

      // Only set HTML if it exists
      if (data.htmlCode) {
        setGeneratedHtml(data.htmlCode);
      } else {
        setGeneratedHtml(null);
      }
    } catch (error) {
      console.error('Error generating HTML:', error);
      toast({
        title: "Error",
        description: "Failed to generate content",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#09090B] text-white">
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

      <div className="flex h-[calc(100vh-3rem)]">
        <div className="w-96 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto prose prose-markdown prose-zinc dark:prose-invert max-w-full prose-h1:text-xl prose-h1:font-bold prose-h1:mb-2 prose-h2:text-lg prose-h2:font-bold prose-h3:font-bold prose-h3:text-base">
            <div className="mb-4">
              {fullResponse && (
                <div className="text-sm whitespace-pre-wrap">{fullResponse}</div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <img src="https://gptengineer.app/img/lovable-logo.svg" alt="Lovable Logo" className="h-5 w-5 mt-1" />
                <span className="font-medium">Lovable</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}>
              <Input 
                placeholder="Request HTML generation..." 
                className="bg-[#18181B] border-0 focus:bg-[#27272A] rounded-xl focus:outline-none focus:ring-0"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </form>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to generate HTML code
            </p>
          </div>
        </div>

        <div className="flex-1 bg-gray-900 rounded-lg border border-gray-800">
          <div className="bg-black border-b border-[#09090B] px-4 py-2 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>{showCode ? "HTML Code" : "HTML Preview"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                className="items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]"
                onClick={() => setShowCode(!showCode)}
                disabled={!generatedHtml}
              >
                <Code className="h-4 w-4 text-white" />
              </Button>
              <Button 
                className="items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]"
                onClick={() => {
                  if (generatedHtml) {
                    navigator.clipboard.writeText(generatedHtml);
                    toast({
                      title: "Copied!",
                      description: "HTML code copied to clipboard",
                    });
                  }
                }}
                disabled={!generatedHtml}
              >
                <Copy className="h-4 w-4 text-white" />
              </Button>
              <Button 
                className="items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]"
                onClick={() => setGeneratedHtml(null)}
                disabled={!generatedHtml}
              >
                <RotateCw className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
          
          <div className="h-[calc(100%-3rem)] w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center animate-spin">
                    <RotateCw className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-400">Generating content...</p>
                </div>
              </div>
            ) : generatedHtml ? (
              showCode ? (
                <div className="w-full h-full bg-[#1E1E1E] p-4 overflow-auto">
                  <pre className="text-white">
                    <code>{generatedHtml}</code>
                  </pre>
                </div>
              ) : (
                <iframe
                  srcDoc={generatedHtml}
                  className="w-full h-full bg-white rounded-b-lg"
                  sandbox="allow-scripts"
                  title="Generated HTML Preview"
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">{">"}</span>
                  </div>
                  <p className="text-gray-400">Enter a prompt to generate content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
