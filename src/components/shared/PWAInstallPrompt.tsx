import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 3 seconds (let them see the intro first)
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowPrompt(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again this session
    sessionStorage.setItem('pwa-prompt-dismissed', 'true');
  };

  // Don't show if already dismissed this session
  if (sessionStorage.getItem('pwa-prompt-dismissed')) {
    return null;
  }

  return (
    <AnimatePresence>
      {showPrompt && deferredPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50"
        >
          <div
            className="p-4 rounded-xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #ffc8dd 0%, #ffafcc 100%)',
              border: '3px solid rgba(255, 255, 255, 0.8)',
            }}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl">💕</div>
              <div className="flex-1">
                <h3
                  className="text-lg font-bold mb-1"
                  style={{
                    fontFamily: 'Pixelify Sans, sans-serif',
                    color: '#5d4037',
                  }}
                >
                  Add to Home Screen
                </h3>
                <p
                  className="text-sm mb-3"
                  style={{
                    fontFamily: 'Pixelify Sans, sans-serif',
                    color: '#6d4c41',
                  }}
                >
                  Install this app to revisit our memories anytime!
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleInstall}
                    className="px-4 py-2 rounded-lg text-sm font-bold"
                    style={{
                      background: 'white',
                      color: '#ff6b9d',
                      fontFamily: 'Pixelify Sans, sans-serif',
                    }}
                  >
                    Install
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-2 rounded-lg text-sm"
                    style={{
                      background: 'rgba(255, 255, 255, 0.5)',
                      color: '#5d4037',
                      fontFamily: 'Pixelify Sans, sans-serif',
                    }}
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
