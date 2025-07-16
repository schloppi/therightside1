import React from 'react';
import { X } from 'lucide-react';

interface ServiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceOverlay: React.FC<ServiceOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ backgroundColor: '#f2ebe2' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4" style={{ backgroundColor: '#f2ebe2' }}>
          <h2 className="text-xl font-bold" style={{ color: '#0D5EAF' }}>Our Services</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" style={{ color: '#0D5EAF' }} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <div className="p-4 rounded-lg" style={{ backgroundColor: '#f2ebe2' }}>
              <h4 className="font-semibold mb-3 text-lg" style={{ color: '#0D5EAF' }}>YOUR GUIDE, YOUR PARTNER</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#0D5EAF' }}>
                We guide you through the AI storm
              </p>
            </div>

            <div className="p-4 rounded-lg border-2 shadow-sm" style={{ backgroundColor: '#f2ebe2', borderColor: '#0D5EAF' }}>
              <h4 className="font-semibold mb-3 text-lg" style={{ color: '#0D5EAF' }}>AI Shower</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#0D5EAF' }}>
                Let's spend some time together to induct your company into the marvelous world of AI
              </p>
            </div>

            <div className="p-4 rounded-lg border-2 shadow-sm" style={{ backgroundColor: '#f2ebe2', borderColor: '#0D5EAF' }}>
              <h4 className="font-semibold mb-3 text-lg" style={{ color: '#0D5EAF' }}>AI Strategy and Action Plan</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#0D5EAF' }}>
                We support you bringing order into your AI exploration, prioritizing and selecting the best path towards growth
              </p>
            </div>

            <div className="p-4 rounded-lg border-2 shadow-sm" style={{ backgroundColor: '#f2ebe2', borderColor: '#0D5EAF' }}>
              <h4 className="font-semibold mb-3 text-lg" style={{ color: '#0D5EAF' }}>AI Upskilling Sessions</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#0D5EAF' }}>
                We'll take your talent by hands and through deep-dive sessions turn them into AI Masters
              </p>
            </div>

            <div className="p-4 rounded-lg border-2 shadow-sm" style={{ backgroundColor: '#f2ebe2', borderColor: '#0D5EAF' }}>
              <h4 className="font-semibold mb-3 text-lg" style={{ color: '#0D5EAF' }}>Killer AI Solution Design & Launch</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#0D5EAF' }}>
                Let's turn your AI ideas into action thanks to our Design&Launch proprietary approach
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};