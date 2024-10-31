import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

interface CodeBoxProps {
  showCode: boolean;
  setShowCode: (show: boolean) => void;
}

const CodeBox = ({ showCode, setShowCode }: CodeBoxProps) => {
  return (
    <Button
      className="w-full p-4 h-auto bg-[#18181B] hover:bg-[#27272A] border border-zinc-800 rounded-lg flex items-center justify-between gap-2 my-4"
      onClick={() => setShowCode(!showCode)}
    >
      <span className="text-sm text-gray-400">
        {showCode ? "Click to show preview" : "Click to show HTML code"}
      </span>
      <Code className="h-4 w-4 text-gray-400" />
    </Button>
  );
};

export default CodeBox;