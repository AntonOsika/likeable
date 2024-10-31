import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import PreviewPanel from "@/components/PreviewPanel";

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

      // Process the response to remove HTML code from fullResponse
      let displayResponse = data.fullResponse;
      const htmlMatch = displayResponse.match(/```html\n([\s\S]*?)\n```/);
      if (htmlMatch) {
        displayResponse = displayResponse.replace(htmlMatch[0], '[Click the code/preview toggle button to view the generated HTML]');
      }
      setFullResponse(displayResponse);

      // Set the HTML code separately for the preview/code panel
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
      <Navigation />

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

        <PreviewPanel 
          generatedHtml={generatedHtml}
          isLoading={isLoading}
          showCode={showCode}
          setShowCode={setShowCode}
          setGeneratedHtml={setGeneratedHtml}
        />
      </div>
    </div>
  );
};

export default Index;