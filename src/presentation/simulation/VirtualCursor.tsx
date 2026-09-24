import React from 'react';

export type CursorType = 'default' | 'pointer' | 'text' | 'crosshair' | 'grab' | 'grabbing';

interface VirtualCursorProps {
  x: number; // percentage (0 to 100)
  y: number; // percentage (0 to 100)
  isClicking: boolean;
  type?: CursorType;
  visible?: boolean;
  actionText?: string;
}

export const VirtualCursor: React.FC<VirtualCursorProps> = ({
  x,
  y,
  isClicking,
  type = 'default',
  visible = true,
  actionText
}) => {
  if (!visible) return null;

  const renderCursorIcon = () => {
    switch (type) {
      case 'pointer':
        // Pointer Hand Cursor
        return (
          <svg
            className="w-5 h-5 text-white filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
            viewBox="0 0 24 24"
            fill="white"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
        );

      case 'crosshair':
        // Authentic Excel Fill-Handle Crosshair Cursor (+)
        return (
          <div className="relative -top-2.5 -left-2.5">
            <svg
              className="w-5 h-5 text-black filter drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="square"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
          </div>
        );

      case 'text':
        // Text I-Beam Cursor
        return (
          <div className="relative -top-2 -left-1">
            <svg
              className="w-4 h-5 text-black filter drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="7" y1="4" x2="17" y2="4" />
              <line x1="12" y1="4" x2="12" y2="20" />
              <line x1="7" y1="20" x2="17" y2="20" />
            </svg>
          </div>
        );

      case 'grab':
      case 'grabbing':
        return (
          <svg
            className="w-5 h-5 text-white filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
            viewBox="0 0 24 24"
            fill="white"
            stroke="black"
            strokeWidth="1.5"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M6 14v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8v-3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2" />
          </svg>
        );

      case 'default':
      default:
        // Authentic Desktop Arrow Cursor
        return (
          <svg
            className="w-5 h-5 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]"
            viewBox="0 0 24 24"
            fill="none"
          >
            <polygon
              points="1,1 1,18 5.5,13.5 9.5,22 12.5,20.5 8.5,12 14.5,12"
              fill="#ffffff"
              stroke="#111827"
              strokeWidth="1.75"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className="absolute pointer-events-none z-50 select-none transition-all duration-700 ease-out"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-2px, -2px) scale(${isClicking ? 0.88 : 1})`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)'
      }}
    >
      {/* Click Wave Ripple */}
      {isClicking && (
        <span className="absolute -top-3.5 -left-3.5 w-8 h-8 rounded-full border-2 border-blue-400 bg-blue-400/30 animate-ping pointer-events-none" />
      )}

      {/* Cursor Body */}
      <div className="relative">
        {renderCursorIcon()}

        {/* Optional Action Subtitle Label */}
        {actionText && (
          <div className="absolute left-5 top-2 bg-slate-900/90 text-white border border-slate-700 px-2 py-0.5 rounded text-[10px] font-sans font-medium whitespace-nowrap shadow-lg backdrop-blur-xs flex items-center gap-1.5 animate-fade-in pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>{actionText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
