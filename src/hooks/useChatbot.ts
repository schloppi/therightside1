import { useState, useCallback } from 'react';

// Webhook configuration
const WEBHOOK_URL = 'https://n8n.therightside.work/webhook-test/website-theightside';

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

    // Wait for the webhook response regardless of status code
    const responseText = await response.text();
    
    if (!response.ok) {
      // Only show error message if webhook returns an error status
      return "Unable to connect to server";
    }
    
    if (!responseText || responseText.trim() === '') {
      return "Unable to connect to server";
    }
    
    try {
      const data = JSON.parse(responseText);
      // Return the response from the webhook, or show error if no response
      return data.response || "Unable to connect to server";
    } catch (parseError) {
      // If we can't parse JSON, treat the raw text as the response
      return responseText.trim() || "Unable to connect to server";
    }
  } catch (error) {
    console.error('Failed to send to webhook:', error);
    return "Unable to connect to server";
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