import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const ProjectView = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const navigate = useNavigate();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectName],
    queryFn: async () => {
      if (!projectName) throw new Error("Project name is required");
      
      const { data, error } = await supabase
        .from('published_projects')
        .select('html_content')
        .eq('project_name', projectName)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error("Project not found");
      
      return data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white gap-4">
        <h1 className="text-2xl text-gray-900">
          {error?.message || "Project not found"}
        </h1>
        <Button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full"
      dangerouslySetInnerHTML={{ __html: project.html_content }}
    />
  );
};

export default ProjectView;