
import { forwardRef } from "react";
import { ChatMessage } from "../utils/chatUtils";
import MessageBubble from "./MessageBubble";
import FileAttachment from "./FileAttachment";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isTyping }, ref) => {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.attachments && message.attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2 ml-11">
                {message.attachments.map((attachment, index) => (
                  <FileAttachment 
                    key={index} 
                    file={{
                      name: attachment.filename,
                      type: attachment.type,
                      path: (attachment.metadata as any).path || ''
                    }}
                    onRemove={() => {}}
                    showDownload={true}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={ref} />
      </div>
    );
  }
);

MessageList.displayName = "MessageList";

export default MessageList;
