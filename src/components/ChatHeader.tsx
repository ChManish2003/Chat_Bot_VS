
import { Bot, Code } from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
      <Bot className="w-5 h-5 text-blue-400 mr-2" />
      <h1 className="text-sm font-semibold">AI Assistant</h1>
      <div className="ml-auto flex items-center space-x-2">
        <Code className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default ChatHeader;
