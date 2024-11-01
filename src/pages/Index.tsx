import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navigation from "@/components/Navigation";
import PreviewPanel from "@/components/PreviewPanel";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AuthDialog from "@/components/AuthDialog";
import ChatMessages from "@/components/ChatMessages";
import type { Message } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
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

  // Fetch messages query with proper typing
  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['messages', session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      
      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      return messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));
    },
    enabled: !!session?.user?.id,
  });

  // Add message mutation with proper typing
  const addMessage = useMutation({
    mutationFn: async (message: { role: 'user' | 'assistant'; content: string; user_id: string }) => {
      const { error } = await supabase
        .from('chat_messages')
        .insert([message]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', session?.user?.id] });
    }
  });

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    if (!session?.user) {
      setShowAuthDialog(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // Add user message
      await addMessage.mutateAsync({
        role: 'user',
        content: prompt,
        user_id: session.user.id
      });

      const { data, error } = await supabase.functions.invoke('generate-html', {
        body: { 
          prompt,
          chatHistory: messages 
        },
      });

      if (error) throw error;

      // Add assistant message
      await addMessage.mutateAsync({
        role: 'assistant',
        content: data.fullResponse,
        user_id: session.user.id
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
              />
              {prompt.trim() && (
                <Button
                  onClick={handleSubmit}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 h-8 w-8 rounded-full bg-white hover:bg-gray-100"
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

        <PreviewPanel 
          generatedHtml={generatedHtml}
          isLoading={isLoading}
          showCode={showCode}
          setGeneratedHtml={setGeneratedHtml}
        />
      </div>

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
      />
    </div>
  );
};

export default Index;