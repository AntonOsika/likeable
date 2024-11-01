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
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-light">Sign in to continue</DialogTitle>
          <DialogDescription>
            Please sign in or create an account to use the HTML generator.
          </DialogDescription>
        </DialogHeader>
        <Auth
          supabaseClient={supabase}
          appearance={{ 
            theme: ThemeSupa,
            style: {
              button: { background: '#000', color: 'white' },
              anchor: { color: '#666' }
            }
          }}
          theme="dark"
          providers={[]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;