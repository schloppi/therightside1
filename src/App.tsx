import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { TypewriterText } from './components/TypewriterText';
import { TypingIndicator } from './components/TypingIndicator';
import { NavigationButtons } from './components/NavigationButtons';
import { ChatInput } from './components/ChatInput';
import { ServiceOverlay } from './components/ServiceOverlay';
import { ArticlesOverlay } from './components/ArticlesOverlay';
import { useChatbot } from './hooks/useChatbot';

function App() {
  const { messages, isTyping, sendMessage, addPresetMessage, hasUserSentMessage } = useChatbot();
  const [isServiceOverlayOpen, setIsServiceOverlayOpen] = useState(false);
  const [isArticlesOverlayOpen, setIsArticlesOverlayOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputSectionRef = useRef<HTMLDivElement>(null);

  const [welcomeHasSpoken, setWelcomeHasSpoken] = useState(false);

  // Auto-scroll to input field on mobile when component mounts
  useEffect(() => {
    const scrollToInput = () => {
      if (inputSectionRef.current) {
        // Small delay to ensure the page is fully rendered
        setTimeout(() => {
          inputSectionRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'end',
            inline: 'nearest'
          });
        }, 300);
      }
    };

    scrollToInput();
    
    // Also scroll on window resize
    const handleResize = () => {
      scrollToInput();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Additional effect to ensure scrolling happens after all content is loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputSectionRef.current) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleBookCall = () => {
    window.location.href = 'mailto:hello@therightside.studio';
  };

  const handleShowArticles = () => {
    setIsArticlesOverlayOpen(true);
  };

  // Initial state - centered logo and welcome message
  if (!hasUserSentMessage) {
    return (
      <div className="min-h-screen w-full flex flex-col relative overflow-hidden" style={{ backgroundColor: '#f2ebe2', maxWidth: '100vw' }}>
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-4">
          <div className="w-64 h-64 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500" style={{ backgroundColor: '#f2ebe2' }}>
            <img 
              src="/RightSide-3-2 copy copy.svg" 
              alt="The RightSide Logo" 
              className="w-40 h-40"
            />
          </div>
          
          <div className="mb-8 px-4 -mt-16 min-h-[120px] flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block">
                <TypewriterText 
                  text="The RightSide *AI and Quantum* *consulting agency*How far are you on your AI journey?"
                  isLarge={true}
                  shouldSpeak={!welcomeHasSpoken}
                  onSpeechStart={() => setWelcomeHasSpoken(true)}
                  hasShimmer={true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0" ref={inputSectionRef}>
          <NavigationButtons
            onShowServices={() => setIsServiceOverlayOpen(true)}
            onBookCall={handleBookCall}
            onShowArticles={handleShowArticles}
          />

          <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
        </div>

        <ServiceOverlay
          isOpen={isServiceOverlayOpen}
          onClose={() => setIsServiceOverlayOpen(false)}
        />

        <ArticlesOverlay
          isOpen={isArticlesOverlayOpen}
          onClose={() => setIsArticlesOverlayOpen(false)}
        />
      </div>
    );
  }

  // Chat state - normal layout with header
  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden" style={{ backgroundColor: '#f2ebe2', maxWidth: '100vw' }}>
      <div className="flex-shrink-0">
        <ChatHeader />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.filter((_, index) => index > 0).map((message, index) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              isUser={message.isUser}
            />
          ))}
          <TypingIndicator isVisible={isTyping} />
          <div ref={messagesEndRef} />
        </div>

        <div className="flex-shrink-0" ref={inputSectionRef}>
          <NavigationButtons
            onShowServices={() => setIsServiceOverlayOpen(true)}
            onBookCall={handleBookCall}
            onShowArticles={handleShowArticles}
          />

          <ChatInput onSendMessage={sendMessage} disabled={isTyping} />
        </div>
      </div>

      <ServiceOverlay
        isOpen={isServiceOverlayOpen}
        onClose={() => setIsServiceOverlayOpen(false)}
      />

      <ArticlesOverlay
        isOpen={isArticlesOverlayOpen}
        onClose={() => setIsArticlesOverlayOpen(false)}
      />
    </div>
  );
}

export default App;