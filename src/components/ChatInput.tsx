
import { useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileAttachment from "./FileAttachment";
import FileSearchDropdown from "./FileSearchDropdown";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onSend: () => void;
  attachedFiles: any[];
  onRemoveFile: (index: number) => void;
  showFileSearch: boolean;
  mockFiles: any[];
  onFileSelect: (file: any) => void;
}

const ChatInput = ({
  input,
  onInputChange,
  onKeyPress,
  onSend,
  attachedFiles,
  onRemoveFile,
  showFileSearch,
  mockFiles,
  onFileSelect
}: ChatInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* File Attachments */}
      {attachedFiles.length > 0 && (
        <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
          <div className="flex flex-wrap gap-2">
            {attachedFiles.map((file, index) => (
              <FileAttachment 
                key={index} 
                file={file} 
                onRemove={() => onRemoveFile(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 bg-gray-800 border-t border-gray-700 relative">
        {showFileSearch && (
          <FileSearchDropdown files={mockFiles} onFileSelect={onFileSelect} />
        )}
        
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={onInputChange}
              onKeyPress={onKeyPress}
              placeholder="Ask me anything or type algorithm names (palindrome, prime, fibonacci, etc.)..."
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
            />
          </div>
          <Button
            onClick={onSend}
            disabled={!input.trim() && attachedFiles.length === 0}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
