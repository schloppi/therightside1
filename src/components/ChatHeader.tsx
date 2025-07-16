import React from 'react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3 p-4 transition-all duration-500" style={{ backgroundColor: '#f2ebe2' }}>
      <div className="w-20 h-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#f2ebe2' }}>
        <img 
          src="/RightSide-3-2 copy copy.svg" 
          alt="The RightSide Logo" 
          className="w-14 h-14"
        />
      </div>
      <h1 className="text-xl font-bold" style={{ color: '#0D5EAF' }}>The RightSide</h1>
    </div>
  );
};