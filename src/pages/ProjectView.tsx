import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProjectView = () => {
  const { projectName } = useParams();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('published_projects')
        .select('html_content')
        .eq('project_name', projectName)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <h1 className="text-2xl text-gray-900">Project not found</h1>
      </div>
    );
  }

  return (
    <iframe
      srcDoc={project.html_content}
      className="w-full h-screen border-0"
      sandbox="allow-scripts"
      title="Published Project Preview"
    />
  );
};

export default ProjectView;