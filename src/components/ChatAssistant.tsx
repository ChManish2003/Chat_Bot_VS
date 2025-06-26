
import { useState, useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import {
  ChatMessage,
  checkForAlgorithmMatch,
  checkForGreeting,
  generateAlgorithmResponse,
  generateGreetingResponse,
  generateAIResponse,
  createInitialMessage
} from "../utils/chatUtils";

const ChatAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([createInitialMessage()]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showFileSearch, setShowFileSearch] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockFiles = [
    { name: "App.tsx", type: "text", path: "/src/App.tsx" },
    { name: "index.css", type: "text", path: "/src/index.css" },
    { name: "package.json", type: "text", path: "/package.json" },
    { name: "README.md", type: "text", path: "/README.md" },
    { name: "login.png", type: "image", path: "/assets/login.png" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Check for @ syntax
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
      setShowFileSearch(true);
    } else {
      setShowFileSearch(false);
    }
  };

  const handleFileSelect = (file: any) => {
    setAttachedFiles([...attachedFiles, file]);
    setInput(input.replace(/@$/, `@${file.name} `));
    setShowFileSearch(false);
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if (!input.trim() && attachedFiles.length === 0) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      attachments: attachedFiles.length > 0 ? attachedFiles.map(f => ({
        filename: f.name,
        type: f.type,
        metadata: { path: f.path }
      })) : undefined,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Check for greeting first
    if (checkForGreeting(input)) {
      const greetingResponse = generateGreetingResponse();
      setMessages(prev => [...prev, greetingResponse]);
      setInput("");
      setAttachedFiles([]);
      return;
    }

    // Check for algorithm match
    const algorithmMatch = checkForAlgorithmMatch(input);
    if (algorithmMatch) {
      const algorithmResponse = generateAlgorithmResponse(algorithmMatch);
      setMessages(prev => [...prev, algorithmResponse]);
      setInput("");
      setAttachedFiles([]);
      return;
    }

    setInput("");
    setAttachedFiles([]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseContent = generateAIResponse(input, attachedFiles);
      if (responseContent) {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: responseContent,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, aiResponse]);
      }
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <ChatHeader />
      
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
        ref={messagesEndRef}
      />

      <ChatInput
        input={input}
        onInputChange={handleInputChange}
        onKeyPress={handleKeyPress}
        onSend={handleSend}
        attachedFiles={attachedFiles}
        onRemoveFile={handleRemoveFile}
        showFileSearch={showFileSearch}
        mockFiles={mockFiles}
        onFileSelect={handleFileSelect}
      />
    </div>
  );
};

export default ChatAssistant;
