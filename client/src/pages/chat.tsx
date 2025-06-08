import { useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import ChatHeader from "@/components/chat/chat-header";
import ChatMessages from "@/components/chat/chat-messages";
import ChatInput from "@/components/chat/chat-input";
import { useToast } from "@/hooks/use-toast";

export default function Chat() {
  const { 
    messages, 
    isLoading, 
    isTyping, 
    sendMessage, 
    searchVisible, 
    toggleSearch, 
    searchMessages, 
    searchResults,
    clearSearch,
    error 
  } = useChat();
  
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader 
        searchVisible={searchVisible}
        onToggleSearch={toggleSearch}
        onSearch={searchMessages}
        onClearSearch={clearSearch}
        searchResults={searchResults}
      />
      
      <ChatMessages 
        messages={searchResults || messages}
        isLoading={isLoading}
        isTyping={isTyping}
        isSearchMode={!!searchResults}
      />
      
      <ChatInput 
        onSendMessage={sendMessage}
        disabled={isLoading}
      />
    </div>
  );
}
