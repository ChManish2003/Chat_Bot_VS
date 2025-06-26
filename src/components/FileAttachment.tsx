
import { X, File, Image, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileAttachmentProps {
  file: {
    name: string;
    type: 'text' | 'image';
    path: string;
  };
  onRemove: () => void;
  showDownload?: boolean;
}

const FileAttachment = ({ file, onRemove, showDownload = false }: FileAttachmentProps) => {
  const handleDownload = () => {
    // Create a mock download for demonstration
    const content = file.type === 'text' 
      ? `// Mock content for ${file.name}\nconsole.log('Hello from ${file.name}');`
      : 'Mock image data';
    
    const blob = new Blob([content], { 
      type: file.type === 'text' ? 'text/plain' : 'image/png' 
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-1.5 text-sm">
      {file.type === 'image' ? (
        <Image className="w-4 h-4 text-blue-400" />
      ) : (
        <File className="w-4 h-4 text-green-400" />
      )}
      <span className="text-gray-200">{file.name}</span>
      
      {showDownload && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="h-auto p-0 hover:bg-gray-600"
          title="Download file"
        >
          <Download className="w-3 h-3" />
        </Button>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-auto p-0 hover:bg-gray-600"
        title="Remove file"
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default FileAttachment;
