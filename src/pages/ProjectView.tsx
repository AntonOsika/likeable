import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProjectView = () => {
  const { projectName } = useParams<{ projectName: string }>();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['project', projectName],
    queryFn: async () => {
      if (!projectName) throw new Error("Project name is required");
      
      const { data, error } = await supabase
        .from('published_projects')
        .select('html_content')
        .eq('project_name', projectName)
        .single();
      
      if (error) {
        if (error.message.includes("JSON object requested, multiple (or no) rows returned")) {
          throw new Error("Project not found");
        }
        throw error;
      }
      
      return data;
    },
    enabled: !!projectName,
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
      <div className="flex items-center justify-center h-screen bg-white">
        <h1 className="text-2xl text-gray-900">
          {error?.message || "Project not found"}
        </h1>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-screen"
      dangerouslySetInnerHTML={{ __html: project.html_content }}
    />
  );
};

export default ProjectView;