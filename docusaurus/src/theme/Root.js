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
      // We ONLY want to poll if we are actively expecting a change (i.e. we are downloading).
      // We don't want to poll just because we are already offline ready (visited before).
      const pollForController = setInterval(() => {
        setOfflineStatus(prevStatus => {
            if (prevStatus === 'downloading' && navigator.serviceWorker.controller) {
                return 'ready';
            }
            return prevStatus;
        });
      }, 1000);

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
      // Service Worker has taken control. 
      // Only set to ready if we were downloading (avoid showing on every reload if already controlled)
      setOfflineStatus(prev => (prev === 'downloading' ? 'ready' : prev));
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
