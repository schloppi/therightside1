import React from 'react';

// Webhook configuration
const WEBHOOK_URL = 'https://n8n.therightside.work/webhook-test/website-theightside';

// Function to send data to webhook
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
  }
};

// Generate a session ID that persists until page refresh
const SESSION_ID = 'web_chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

interface NavigationButtonsProps {
  onShowServices: () => void;
  onBookCall: () => void;
  onShowArticles: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onShowServices,
  onBookCall,
  onShowArticles
}) => {
  const handleServicesClick = () => {
    logEventToWebhook({
      type: 'button_click',
      button: 'services',
      timestamp: new Date().toISOString(),
      sessionId: SESSION_ID,
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    onShowServices();
  };

  const handleBookCallClick = () => {
    logEventToWebhook({
      type: 'button_click',
      button: 'book_call',
      timestamp: new Date().toISOString(),
      sessionId: SESSION_ID,
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    onBookCall();
  };

  const handleArticlesClick = () => {
    logEventToWebhook({
      type: 'button_click',
      button: 'articles',
      timestamp: new Date().toISOString(),
      sessionId: SESSION_ID,
      userAgent: navigator.userAgent,
      url: window.location.href
    });
    onShowArticles();
  };

  return (
    <div className="flex gap-2 p-4" style={{ backgroundColor: '#f2ebe2' }}>
      <button
        onClick={handleServicesClick}
        className="flex-1 px-4 py-2 text-sm font-medium border-2 rounded-full transition-colors"
        style={{ 
          color: '#0D5EAF', 
          borderColor: '#0D5EAF'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0D5EAF';
          e.currentTarget.style.color = '#f2ebe2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#0D5EAF';
        }}
      >
        Services
      </button>
      <button
        onClick={handleBookCallClick}
        className="flex-1 px-4 py-2 text-sm font-medium border-2 rounded-full transition-colors"
        style={{ 
          backgroundColor: '#0D5EAF',
          borderColor: '#0D5EAF',
          color: '#f2ebe2'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0A4A8A';
          e.currentTarget.style.borderColor = '#0A4A8A';
          e.currentTarget.style.color = '#f2ebe2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0D5EAF';
          e.currentTarget.style.borderColor = '#0D5EAF';
          e.currentTarget.style.color = '#f2ebe2';
        }}
      >
        Book a Call
      </button>
      <button
        onClick={handleArticlesClick}
        className="flex-1 px-4 py-2 text-sm font-medium border-2 rounded-full transition-colors"
        style={{ 
          color: '#0D5EAF', 
          borderColor: '#0D5EAF'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0D5EAF';
          e.currentTarget.style.color = '#f2ebe2';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#0D5EAF';
        }}
      >
        Articles
      </button>
    </div>
  );
};