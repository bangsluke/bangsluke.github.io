import React, { useEffect, useState } from 'react';
import OfflinePopup from '@site/src/components/OfflinePopup';

export default function Root({children}) {
  const [offlineStatus, setOfflineStatus] = useState(null); // 'downloading' | 'ready' | null

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // 1. Check if we are forcibly testing offline mode via URL
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const isOfflineTest = params.get('offlineMode') === 'true';

    // Helper to set status if not already ready
    const setStatus = (status) => {
        setOfflineStatus(prev => (prev === 'ready' ? 'ready' : status));
    };

    if (isOfflineTest && !navigator.serviceWorker.controller) {
        setStatus('downloading');
    }

    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) return;

      // Polling fallback: Docusaurus PWA plugin can sometimes be tricky with events.
      const pollForController = setInterval(() => {
        // If we found a controller, we are ready.
        if (navigator.serviceWorker.controller) {
          setStatus('ready');
          clearInterval(pollForController);
        } else {
            // If we are NOT controlled, but the worker is activated, we might need to wait for a reload
            // OR we can assume ready if enough time passed? No, that's risky.
            // Let's check reg.active
            if (reg.active && reg.active.state === 'activated') {
                // We are active, but not controlling.
                // This usually means we need to claim clients.
                // But Docusaurus PWA does this.
                // Force ready if active exists?
                // setStatus('ready'); // OPTIONAL: aggressive fallback
            }
        }
      }, 500);

      const handleInstalling = (worker) => {
        if (!worker) return;
        
        if ((worker.state === 'installing' || worker.state === 'parsed') && !navigator.serviceWorker.controller) {
             setStatus('downloading');
        }
        
        worker.addEventListener('statechange', () => {
           if (worker.state === 'activated' || worker.state === 'installed') {
               // When activated, check controller
               if (navigator.serviceWorker.controller) {
                   setStatus('ready');
               }
           }
        });
      };

      if (reg.installing) handleInstalling(reg.installing);
      if (reg.waiting) handleInstalling(reg.waiting);

      reg.addEventListener('updatefound', () => {
         handleInstalling(reg.installing);
      });
      
      // Cleanup interval on unmount
      return () => clearInterval(pollForController);
    });

    const onControllerChange = () => {
      // Service Worker has taken control. We are ready.
      setStatus('ready');
    };

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  return (
    <>
      {children}
      {offlineStatus && (
        <OfflinePopup 
          status={offlineStatus} 
          onClose={() => setOfflineStatus(null)} 
        />
      )}
    </>
  );
}
