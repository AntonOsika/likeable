import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  htmlContent: string | null;
}

const PublishDialog = ({ open, onOpenChange, htmlContent }: PublishDialogProps) => {
  const [projectName, setProjectName] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!projectName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    if (!htmlContent) {
      toast({
        title: "Error",
        description: "No content to publish",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('published_projects')
        .insert([
          { user_id: user.id, project_name: projectName, html_content: htmlContent }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Project published successfully",
      });
      
      onOpenChange(false);
      navigate(`/${projectName}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message === "duplicate key value violates unique constraint \"published_projects_project_name_key\""
          ? "Project name already exists"
          : "Failed to publish project",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Enter project name..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPublishing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
            >
              {isPublishing ? "Publishing..." : "Publish"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishDialog;