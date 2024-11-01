import { Message } from "@/types/chat";
import CodeBox from "@/components/CodeBox";

interface ChatMessagesProps {
  messages: Message[];
  showCode: boolean;
  setShowCode: (show: boolean) => void;
  generatedHtml: string | null;
}

const ChatMessages = ({ messages, showCode, setShowCode, generatedHtml }: ChatMessagesProps) => {
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(```html[\s\S]*?```)/);
    return parts.map((part, index) => {
      if (part.startsWith('```html')) {
        // This is a code block, render the CodeBox here if we have generated HTML
        return generatedHtml ? (
          <CodeBox key={index} showCode={showCode} setShowCode={setShowCode} />
        ) : null;
      }
      // This is regular text, render it normally
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((message, idx) => (
        <div key={idx} className="mb-6">
          {message.role === 'user' ? (
            <div className="bg-[#18181B] rounded-lg p-4 max-w-[85%] ml-auto">
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
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
              <div className="ml-4 text-sm whitespace-pre-wrap">
                {renderMessageContent(message.content)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;