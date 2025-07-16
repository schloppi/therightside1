import React from 'react';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

interface ArticleDetailOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

export const ArticleDetailOverlay: React.FC<ArticleDetailOverlayProps> = ({ 
  isOpen, 
  onClose, 
  article 
}) => {
  if (!article) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ backgroundColor: '#f2ebe2' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 p-4 border-b border-gray-200" style={{ backgroundColor: '#f2ebe2' }}>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1">Article</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <div className="p-4 rounded-lg border-2 mb-6" style={{ backgroundColor: '#f2ebe2', borderColor: '#0D5EAF' }}>
                <p className="font-medium text-base leading-relaxed" style={{ color: '#0D5EAF' }}>
                  {article.excerpt}
                </p>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-sm">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg border mt-8" style={{ backgroundColor: '#f2ebe2', borderColor: '#0D5EAF' }}>
              <h3 className="font-semibold mb-2" style={{ color: '#0D5EAF' }}>About The RightSide</h3>
              <p className="text-sm" style={{ color: '#0D5EAF' }}>
                The RightSide is an AI and Quantum consulting agency operating across Europe. 
                We help businesses implement cutting-edge artificial intelligence and quantum solutions 
                through strategic planning, reskilling, and comprehensive implementation support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};