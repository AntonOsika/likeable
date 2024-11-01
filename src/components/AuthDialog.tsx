import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        onOpenChange(false);
        toast({
          title: "Welcome!",
          description: "You're now signed in and ready to start.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onOpenChange, toast]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-light">Sign up to continue</DialogTitle>
          <DialogDescription>
            Please sign up or sign in to use the HTML generator.
          </DialogDescription>
        </DialogHeader>
        <Auth
          supabaseClient={supabase}
          view="sign_up"
          appearance={{ 
            theme: ThemeSupa,
            style: {
              button: { background: '#000', color: 'white' },
              anchor: { color: '#666' }
            },
            variables: {
              default: {
                colors: {
                  brand: '#000',
                  brandAccent: '#333'
                }
              }
            }
          }}
          theme="dark"
          providers={[]}
          redirectTo={window.location.origin}
          onlyThirdPartyProviders={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;