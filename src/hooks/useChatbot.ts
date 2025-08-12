import { useState, useCallback } from 'react';

// Webhook configuration
const WEBHOOK_URL = 'https://root.therightside.work/webhook/website-theightside';

// Function to log events to webhook
const logEventToWebhook = async (data: any) => {
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to send to webhook:', error);
    // Fail silently to not disrupt user experience
  }
};

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

// Function to send message to webhook and get response
const sendToWebhook = async (message: string): Promise<string> => {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'user_message',
        message: message,
        timestamp: new Date().toISOString(),
        sessionId: 'web_chat_' + Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const responseData = await response.json();
    
    // Extract just the content/output from the response
    if (responseData && typeof responseData === 'object') {
      // Try common response field names
      const content = responseData.output || responseData.content || responseData.message || responseData.response || responseData.text;
      if (content && typeof content === 'string') {
        return content;
      }
      // If no standard field found, convert the whole object to string
      return JSON.stringify(responseData);
    }
    
    // If it's already a string, return it
    return typeof responseData === 'string' ? responseData : "No response received from server";
  } catch (error) {
    console.error('Failed to send to webhook:', error);
    return "I'm having trouble connecting to the server right now. Please try again in a moment.";
  }
};

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "The RightSide *AI and Quantum* *consulting agency*",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setHasUserSentMessage(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Get response from webhook
    const aiResponse = await sendToWebhook(content);

    const aiMessage: Message = {
      id: Date.now().toString() + '-ai',
      content: aiResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);

  }, []);

  const addPresetMessage = useCallback(async (content: string) => {
    setHasUserSentMessage(true);

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Get response from webhook for preset messages too
    const aiResponse = await sendToWebhook(content);

    const aiMessage: Message = {
      id: Date.now().toString() + '-ai',
      content: aiResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  }, []);

  return {
    messages,
    isTyping,
    hasUserSentMessage,
    sendMessage,
    addPresetMessage
  };
};