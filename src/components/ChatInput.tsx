import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  // Auto-focus the input field when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  return (
    <div className="p-4 border-t border-gray-200 rounded-t-2xl w-full" style={{ backgroundColor: '#0D5EAF', maxWidth: '100vw', boxSizing: 'border-box' }}>
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        <div className="flex-1 relative min-w-0">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask me anything about The Rightside..."
            className="w-full resize-none rounded-full px-4 py-3 focus:outline-none text-sm max-h-[120px] overflow-y-auto transition-all duration-200 box-border"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#f2ebe2',
              minWidth: 0,
              maxWidth: '100%'
            }}
            rows={1}
            disabled={disabled}
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="w-10 h-10 rounded-full flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex-shrink-0 ml-2"
          style={{ 
            backgroundColor: message.trim() && !disabled ? '#f2ebe2' : '#9ca3af',
            color: message.trim() && !disabled ? '#0D5EAF' : '#ffffff'
          }}
          onMouseEnter={(e) => {
            if (message.trim() && !disabled) {
              e.currentTarget.style.backgroundColor = '#e8ddd4';
              e.currentTarget.style.color = '#0D5EAF';
            }
          }}
          onMouseLeave={(e) => {
            if (message.trim() && !disabled) {
              e.currentTarget.style.backgroundColor = '#f2ebe2';
              e.currentTarget.style.color = '#0D5EAF';
            }
          }}
        >
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      </form>
    </div>
  );
};