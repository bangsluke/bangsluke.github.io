import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './OfflinePopup.css';

export default function OfflinePopup({ status, onClose }) {
  const isDownloading = status === 'downloading';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  // Use a portal to render outside the Docusaurus DOM tree -> direct to Body
  return ReactDOM.createPortal(
    (
      <div 
        className="offline-popup" 
        role="alert" 
        data-status={status}
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 999999, // Super high z-index
            backgroundColor: isDownloading ? '#f5f5f5' : '#e6fffa', // Fallback colors if CSS fails
            border: isDownloading ? '1px solid #ccc' : '1px solid #00a400',
            color: '#000',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            maxWidth: '350px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        <div className="offline-popup-content" style={{ fontWeight: 600 }}>
          {isDownloading ? 'Downloading for offline use...' : 'Ready for offline use'}
        </div>
        {!isDownloading && (
          <button 
            className="offline-popup-close" 
            onClick={onClose}
            aria-label="Close"
            style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                lineHeight: 1,
                padding: '0 4px',
            }}
          >
            ×
          </button>
        )}
      </div>
    ),
    document.body
  );
}
