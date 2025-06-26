
import { Paperclip } from "lucide-react";

interface FileSearchDropdownProps {
  files: Array<{
    name: string;
    type: 'text' | 'image';
    path: string;
  }>;
  onFileSelect: (file: any) => void;
}

const FileSearchDropdown = ({ files, onFileSelect }: FileSearchDropdownProps) => {
  return (
    <div className="absolute bottom-full left-4 right-4 bg-gray-700 rounded-lg shadow-lg border border-gray-600 mb-2 max-h-40 overflow-y-auto">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center px-3 py-2 hover:bg-gray-600 cursor-pointer transition-colors"
          onClick={() => onFileSelect(file)}
        >
          <Paperclip className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">{file.name}</span>
          <span className="text-xs text-gray-400 ml-auto">{file.type}</span>
        </div>
      ))}
    </div>
  );
};

export default FileSearchDropdown;
