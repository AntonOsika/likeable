import { Button } from "@/components/ui/button";
import { Copy, RotateCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Highlight, themes } from "prism-react-renderer";

interface PreviewPanelProps {
  generatedHtml: string | null;
  isLoading: boolean;
  showCode: boolean;
  setGeneratedHtml: (html: string | null) => void;
}

const PreviewPanel = ({ 
  generatedHtml, 
  isLoading, 
  showCode,
  setGeneratedHtml 
}: PreviewPanelProps) => {
  const { toast } = useToast();

  return (
    <div className="flex-1 bg-[#09090B] rounded-xl border border-[#27272A]">
      <div className="bg-[#09090B] border-b border-[#27272A] px-4 py-2 flex items-center justify-between rounded-t-xl">
        <div className="flex items-center space-x-2 text-gray-400">
          <span>{showCode ? "HTML Code" : "HTML Preview"}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            className="items-center justify-center text-sm font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]"
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
            className="items-center justify-center text-sm font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-primary h-7 px-1 rounded-md py-1 gap-1.5 hidden md:flex bg-[#09090B]"
            onClick={() => setGeneratedHtml(null)}
            disabled={!generatedHtml}
          >
            <RotateCw className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>
      
      <div className="h-[calc(100%-3rem)] w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-[#09090B]">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-3xl mx-auto mb-4 animate-bounce flex items-center justify-center">
                <span className="text-3xl text-black font-mono font-bold">&gt;_</span>
              </div>
              <p className="text-gray-400">Generating content...</p>
            </div>
          </div>
        ) : generatedHtml ? (
          showCode ? (
            <div className="w-full h-full overflow-auto rounded-b-xl bg-[#09090B]">
              <Highlight
                theme={themes.nightOwl}
                code={generatedHtml}
                language="html"
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`${className} p-4`} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        <span className="text-gray-500 mr-4">{i + 1}</span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          ) : (
            <iframe
              srcDoc={generatedHtml}
              className="w-full h-full bg-white rounded-b-xl"
              sandbox="allow-scripts"
              title="Generated HTML Preview"
            />
          )
        ) : (
          <div className="flex items-center justify-center h-full bg-[#09090B]">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl text-black font-mono font-bold">&gt;_</span>
              </div>
              <p className="text-gray-400">Enter a prompt to generate content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;