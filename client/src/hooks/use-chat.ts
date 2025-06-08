import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Message } from "@shared/schema";

// Generate a unique session ID for this chat session
const generateSessionId = () => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export function useChat() {
  const [sessionId] = useState(() => generateSessionId());
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<Message[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const queryClient = useQueryClient();

  // Get merchant name from URL params
  const merchantName = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('merchant') || 'IRCTC E-ticketing';
  }, []);

  // Send message mutation using the new /query endpoint
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      setIsTyping(true);
      setError(null);
      
      const response = await apiRequest("POST", "/query", {
        question: content,
        merchant: merchantName,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Add user message and bot response to local state
      const userMessage: Message = {
        id: Date.now(),
        content: data.question || "User message",
        sender: "user",
        timestamp: new Date(),
        sessionId: sessionId,
      };
      
      const botMessage: Message = {
        id: Date.now() + 1,
        content: data.response || "No response received",
        sender: "bot", 
        timestamp: new Date(),
        sessionId: sessionId,
      };
      
      setMessages(prev => [...prev, userMessage, botMessage]);
      setIsTyping(false);
    },
    onError: (error) => {
      setIsTyping(false);
      setError("Failed to send message. Please try again.");
    },
  });

  // Search messages - simplified to search local messages
  const searchMessagesMutation = useMutation({
    mutationFn: async (query: string) => {
      // Search through local messages
      const filtered = messages.filter(msg => 
        msg.content.toLowerCase().includes(query.toLowerCase())
      );
      return filtered;
    },
    onSuccess: (results) => {
      setSearchResults(results);
    },
    onError: (error) => {
      setError("Failed to search messages. Please try again.");
    },
  });

  const sendMessage = (content: string) => {
    sendMessageMutation.mutate(content);
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchResults(null);
    }
  };

  const searchMessages = (query: string) => {
    if (query.trim()) {
      searchMessagesMutation.mutate(query);
    } else {
      setSearchResults(null);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
  };

  return {
    sessionId,
    messages,
    isLoading: false,
    isTyping,
    sendMessage,
    searchVisible,
    toggleSearch,
    searchMessages,
    searchResults,
    clearSearch,
    error,
  };
}
