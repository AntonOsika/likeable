import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import ChatMessages from "@/components/ChatMessages";
import type { Message } from "@/types/chat";

interface ChatSectionProps {
  messages: Message[];
  showCode: boolean;
  setShowCode: (show: boolean) => void;
  generatedHtml: string | null;
  isLoading: boolean;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const ChatSection = ({
  messages,
  showCode,
  setShowCode,
  generatedHtml,
  isLoading,
  handleSubmit,
  prompt,
  setPrompt,
}: ChatSectionProps) => {
  return (
    <div className="w-96 flex flex-col">
      <ChatMessages 
        messages={messages}
        showCode={showCode}
        setShowCode={setShowCode}
        generatedHtml={generatedHtml}
      />
      <div className="p-4">
        <form onSubmit={handleSubmit} className="relative">
          <Input 
            placeholder="Request HTML generation..." 
            className="bg-[#18181B] border-0 focus:bg-[#27272A] rounded-xl focus:outline-none focus:ring-0"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          {prompt.trim() && (
            <Button
              onClick={handleSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-6 w-6 rounded-full bg-white hover:bg-gray-100"
              disabled={isLoading}
            >
              <ArrowUp className="h-4 w-4 text-black" />
            </Button>
          )}
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Press Enter to generate HTML code
        </p>
      </div>
    </div>
  );
};

export default ChatSection;