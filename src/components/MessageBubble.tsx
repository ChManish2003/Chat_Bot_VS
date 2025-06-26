
import { Bot, User, File, Image } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChatMessage } from "../utils/chatUtils";

interface MessageBubbleProps {
  message: ChatMessage;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-green-600' : 'bg-blue-600'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className={`max-w-[70%] ${isUser ? 'text-right' : ''}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isUser 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-800 text-gray-100'
        }`}>
          {message.attachments && message.attachments.length > 0 && (
            <div className="mb-2 space-y-1">
              {message.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm opacity-80">
                  {attachment.type === 'image' ? (
                    <Image className="w-3 h-3" />
                  ) : (
                    <File className="w-3 h-3" />
                  )}
                  <span>{attachment.filename}</span>
                </div>
              ))}
            </div>
          )}
          
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code(props) {
                  const {children, className, ...rest} = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={`${className} bg-gray-700 px-1 py-0.5 rounded text-sm`} {...rest}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
        
        <div className={`text-xs text-gray-400 mt-1 ${isUser ? 'text-right' : ''}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
