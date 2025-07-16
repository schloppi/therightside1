import React from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  isLarge?: boolean;
  shouldSpeak?: boolean;
  onSpeechStart?: () => void;
  hasShimmer?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 30, 
  isLarge = false,
  hasShimmer = false
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [showCursor, setShowCursor] = React.useState(true);
  const [showShimmer, setShowShimmer] = React.useState(false);

  // Parse the text to identify italic sections and their positions
  const parseText = (text: string) => {
    const segments = [];
    const parts = text.split(/(\*[^*]+\*)/g);
    let currentPos = 0;
    
    for (const part of parts) {
      if (part.startsWith('*') && part.endsWith('*')) {
        const content = part.slice(1, -1);
        segments.push({ type: 'break', start: currentPos, end: currentPos });
        segments.push({ type: 'italic', content, start: currentPos, end: currentPos + content.length });
        currentPos += content.length;
        if (content === 'consulting agency') {
          segments.push({ type: 'break', start: currentPos, end: currentPos });
        }
      } else if (part) {
        if (part === 'The RightSide') {
          segments.push({ type: 'light', content: part, start: currentPos, end: currentPos + part.length });
        } else if (part === 'How far are you on your AI journey?') {
          segments.push({ type: 'small', content: part, start: currentPos, end: currentPos + part.length });
        } else {
          segments.push({ type: 'normal', content: part, start: currentPos, end: currentPos + part.length });
        }
        currentPos += part.length;
      }
    }
    
    return segments;
  };

  const segments = parseText(text);
  const totalLength = segments.reduce((acc, seg) => acc + (seg.content?.length || 0), 0);

  // Function to render the current state based on typing progress
  const renderCurrentText = () => {
    let renderedLength = 0;
    const elements = [];
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      
      if (segment.type === 'break') {
        elements.push(<br key={`br-${i}`} />);
        continue;
      }
      
      const segmentLength = segment.content?.length || 0;
      const segmentEnd = renderedLength + segmentLength;
      
      if (currentIndex >= renderedLength) {
        const visibleLength = Math.min(currentIndex - renderedLength, segmentLength);
        const visibleText = segment.content?.substring(0, visibleLength) || '';
        
        if (visibleText) {
          if (segment.type === 'italic') {
            elements.push(
              <strong 
                key={i} 
                style={{ 
                  fontFamily: 'Adobe Baskerville, Baskerville, serif', 
                  fontWeight: '300',
                  fontStyle: 'italic' 
                }}
              >
                {visibleText}
              </strong>
            );
          } else if (segment.type === 'light') {
            elements.push(
              <span key={i} style={{ fontWeight: '900', fontSize: isLarge ? '2.5rem' : '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {visibleText}
              </span>
            );
          } else if (segment.type === 'small') {
            const isComplete = visibleLength === segmentLength && currentIndex >= totalLength;
            elements.push(
              <span 
                key={i} 
                className={isComplete && hasShimmer ? 'bg-gradient-to-r bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_6s_ease-in-out_infinite]' : ''}
                style={{ 
                  fontSize: isLarge ? '1.25rem' : '0.75rem',
                  fontWeight: '600',
                  color: isComplete && hasShimmer ? 'transparent' : '#0D5EAF',
                  backgroundImage: isComplete && hasShimmer ? `linear-gradient(to right, #0D5EAF, #f2ebe2, #0D5EAF)` : 'none'
                }}
              >
                {visibleText}
              </span>
            );
          } else {
            elements.push(<span key={i}>{visibleText}</span>);
          }
        }
      }
      
      renderedLength = segmentEnd;
      
      if (currentIndex < segmentEnd) {
        break;
      }
    }
    
    return elements;
  };

  React.useEffect(() => {
    setCurrentIndex(0);
    setShowCursor(true);
    setShowShimmer(false);
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < totalLength) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setShowCursor(false);
          if (hasShimmer) {
            setShowShimmer(true);
          }
          return prev;
        }
      });
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [text, speed, hasShimmer, totalLength]);

  return (
    <p className={`leading-relaxed ${isLarge ? 'text-2xl font-medium' : 'text-lg'}`}
    style={{
      color: '#0D5EAF'
    }}>
      {renderCurrentText()}
      {showCursor && (
        <span 
          className={`inline-block ml-1 animate-pulse ${isLarge ? 'w-1 h-6' : 'w-0.5 h-5'}`}
          style={{ backgroundColor: '#0D5EAF' }}
        />
      )}
    </p>
  );
};