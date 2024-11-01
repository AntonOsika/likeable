import { Message } from "@/types/chat";
import CodeBox from "@/components/CodeBox";
import { Button } from "@/components/ui/button";
import { RotateCcw, ExternalLink } from "lucide-react";

interface ChatMessagesProps {
  messages: Message[];
  showCode: boolean;
  setShowCode: (show: boolean) => void;
  generatedHtml: string | null;
}

const ChatMessages = ({ messages, showCode, setShowCode, generatedHtml }: ChatMessagesProps) => {
  const renderMessageContent = (content: string) => {
    // Split by code blocks first
    const parts = content.split(/(```html[\s\S]*?```)/);
    return parts.map((part, index) => {
      if (part.startsWith('```html')) {
        // This is a code block, render the CodeBox here if we have generated HTML
        return generatedHtml ? (
          <CodeBox key={index} showCode={showCode} setShowCode={setShowCode} />
        ) : null;
      }
      // For non-code parts, remove markdown syntax and render
      const cleanText = part
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold syntax
        .replace(/\*(.*?)\*/g, '$1')      // Remove italic syntax
        .replace(/`(.*?)`/g, '$1')        // Remove inline code syntax
        .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // Remove link syntax
        .replace(/#/g, '')                // Remove hashtag characters
        .trim();
      return <span key={index}>{cleanText}</span>;
    });
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-4">
      {messages.map((message, idx) => (
        <div key={idx}>
          {message.role === 'user' ? (
            <div className="bg-[#18181B] rounded-lg p-3 max-w-[85%] ml-auto">
              <p className="text-sm whitespace-pre-wrap">{renderMessageContent(message.content)}</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-1.5 mb-1.5">
                <img 
                  src="https://gptengineer.app/img/lovable-logo.svg" 
                  alt="Lovable Logo" 
                  className="h-4 w-4" 
                />
                <span className="font-medium text-sm">Lovable</span>
              </div>
              <div className="ml-4">
                <div className="text-sm whitespace-pre-wrap">
                  {renderMessageContent(message.content)}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button 
                    className="inline-flex items-center justify-center text-sm font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5"
                  >
                    <RotateCcw className="h-4 w-4 text-[#A1A1AA]" />
                    <span>Restore</span>
                  </Button>
                  <Button 
                    className="inline-flex items-center justify-center text-sm font-light ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#242428] text-white callout hover:bg-primary/20 border border-zinc-700 h-7 rounded-md px-2 py-1 gap-1.5"
                  >
                    <ExternalLink className="h-4 w-4 text-[#A1A1AA]" />
                    <span>View</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;