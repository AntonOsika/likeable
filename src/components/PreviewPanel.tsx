import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Code2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const PreviewPanel = ({ generatedHtml, isLoading, showCode, setGeneratedHtml }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("preview");

  const handleCopy = () => {
    if (generatedHtml) {
      navigator.clipboard.writeText(generatedHtml);
      toast({
        title: "Copied to clipboard",
        description: "HTML code has been copied.",
      });
    }
  };

  return (
    <div className="flex-1 overflow-auto p-4">
      <Tabs defaultValue="preview" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                <Code2 className="w-8 h-8 text-black animate-pulse" />
              </div>
              <p className="text-sm text-gray-400">Generating HTML...</p>
            </div>
          ) : (
            <div className="prose w-full max-w-none overflow-hidden">
              <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="code">
          <div className="relative">
            <Button onClick={handleCopy} className="absolute right-4 top-4">
              <Copy className="mr-2 h-4 w-4" />
              Copy Code
            </Button>
            <pre className="bg-gray-800 text-white p-4 rounded-md">
              <code>{generatedHtml}</code>
            </pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewPanel;
