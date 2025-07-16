import React from 'react';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isTyping?: boolean;
  isCentered?: boolean;
  isLargeText?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  content, 
  isUser, 
  isTyping = false, 
  isCentered = false,
  isLargeText = false 
}) => {
  // Lazy load TypewriterText only for assistant messages
  const [TypewriterComponent, setTypewriterComponent] = React.useState<React.ComponentType<any> | null>(null);

  // Function to render text with markdown-style italics
  const renderTextWithItalics = (text: string) => {
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <strong key={index} style={{ fontFamily: 'Adobe Baskerville, Baskerville, serif', fontWeight: 'bold', fontStyle: 'italic' }}>{part.slice(1, -1)}</strong>;
      }
      return part;
    });
  };

  React.useEffect(() => {
    if (!isUser) {
      import('./TypewriterText').then(module => {
        setTypewriterComponent(() => module.TypewriterText);
      });
    }
  }, [isUser]);

  if (isCentered) {
    return (
      <div className="text-center">
        <div className="inline-block">
          {TypewriterComponent ? (
            <TypewriterComponent text={content} isLarge={isLargeText} />
          ) : (
            <p className={`leading-relaxed text-gray-700 ${isLargeText ? 'text-2xl font-medium' : 'text-sm'}`}>
              {renderTextWithItalics(content)}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'rounded-br-md'
            : 'border-2 rounded-bl-md shadow-sm'
        }`}
        style={isUser 
          ? { backgroundColor: '#0D5EAF', color: '#f2ebe2' }
          : { backgroundColor: '#f2ebe2', color: '#0D5EAF', borderColor: '#0D5EAF' }
        }
      >
        {isUser ? (
          <p className="text-lg leading-relaxed">{renderTextWithItalics(content)}</p>
        ) : (
          TypewriterComponent ? (
            <TypewriterComponent text={content} />
          ) : (
            <p className="text-lg leading-relaxed">{renderTextWithItalics(content)}</p>
          )
        )}
      </div>
    </div>
  );
};