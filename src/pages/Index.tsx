import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import PreviewPanel from "@/components/PreviewPanel";
import CodeBox from "@/components/CodeBox";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current user
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

  // Fetch messages query
  const { data: messages = [] } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
    },
    enabled: !!session?.user?.id,
  });

  // Add message mutation
  const addMessage = useMutation({
    mutationFn: async (message: { role: string; content: string }) => {
      if (!session?.user?.id) {
        throw new Error("User must be logged in to send messages");
      }

      const { error } = await supabase
        .from('chat_messages')
        .insert([{
          ...message,
          user_id: session.user.id
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    }
  });

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!session?.user) {
      toast({
        title: "Error",
        description: "Please sign in to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Add user message
      await addMessage.mutateAsync({
        role: 'user',
        content: prompt
      });

      const { data, error } = await supabase.functions.invoke('generate-html', {
        body: { prompt },
      });

      if (error) throw error;

      const parts = data.fullResponse.split(/```html\n([\s\S]*?)\n```/);
      
      // Add assistant message
      await addMessage.mutateAsync({
        role: 'assistant',
        content: data.fullResponse
      });

      if (data.htmlCode) {
        setGeneratedHtml(data.htmlCode.trim());
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
      setPrompt("");
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#09090B] text-white">
      <Navigation />

      <div className="flex h-[calc(100vh-3rem)]">
        <div className="w-96 flex flex-col">
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
                      <img src="https://gptengineer.app/img/lovable-logo.svg" alt="Lovable Logo" className="h-4 w-4" />
                      <span className="font-medium text-sm">Lovable</span>
                    </div>
                    <div className="ml-4 text-sm whitespace-pre-wrap">
                      {message.content.split('\n').map((part, index) => (
                        <span key={index}>
                          {part}
                          {generatedHtml && index === 0 && (
                            <CodeBox showCode={showCode} setShowCode={setShowCode} />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
          setGeneratedHtml={setGeneratedHtml}
        />
      </div>
    </div>
  );
};

export default Index;