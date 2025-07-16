import React from 'react';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="flex justify-start mb-4">
      <div className="border-2 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm" style={{ backgroundColor: '#f2ebe2', borderColor: '#0D5EAF' }}>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0D5EAF' }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0D5EAF', animationDelay: '0.1s' }} />
          <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#0D5EAF', animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
};