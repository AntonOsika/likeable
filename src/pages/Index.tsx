import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Message } from "@/types/chat";
import Navigation from "@/components/Navigation";
import PreviewPanel from "@/components/PreviewPanel";
import AuthDialog from "@/components/AuthDialog";
import ChatSection from "@/components/ChatSection";
import PublishDialog from "@/components/PublishDialog";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(() => {
    const saved = localStorage.getItem("generatedHtml");
    return saved ? saved : null;
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (generatedHtml) {
      localStorage.setItem("generatedHtml", generatedHtml);
    } else {
      localStorage.removeItem("generatedHtml");
    }
  }, [generatedHtml]);

  const { data: session, isLoading: isSessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
  });

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

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setShowAuthDialog(false);
        queryClient.invalidateQueries({ queryKey: ['session'] });
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

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

    if (!session?.user && !isSessionLoading) {
      setShowAuthDialog(true);
      return;
    }

    setIsLoading(true);
    const currentPrompt = prompt;
    setPrompt("");
    
    try {
      if (!session?.user?.id) return;

      await addMessage.mutateAsync({
        role: 'user',
        content: currentPrompt,
        user_id: session.user.id
      });

      const recentMessages = messages.slice(-3);

      const { data, error } = await supabase.functions.invoke('generate-html', {
        body: { 
          prompt: currentPrompt,
          chatHistory: recentMessages 
        },
      });

      if (error) throw error;

      await addMessage.mutateAsync({
        role: 'assistant',
        content: data.fullResponse,
        user_id: session.user.id
      });

      if (data.htmlCode) {
        setGeneratedHtml(data.htmlCode.trim());
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
      <Navigation onPublish={() => setShowPublishDialog(true)} />
      <div className="flex h-[calc(100vh-3rem)]">
        <ChatSection 
          messages={messages}
          showCode={showCode}
          setShowCode={setShowCode}
          generatedHtml={generatedHtml}
          isLoading={isLoading}
          handleSubmit={handleSubmit}
          prompt={prompt}
          setPrompt={setPrompt}
        />
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
      <PublishDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        htmlContent={generatedHtml}
      />
    </div>
  );
};

export default Index;