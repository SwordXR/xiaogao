import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CyberAnimationProps {
  onComplete: () => void;
}

export default function CyberAnimation({ onComplete }: CyberAnimationProps) {
  const [hasWatched, setHasWatched] = useState(false);

  useEffect(() => {
    // Check if watched before
    if (localStorage.getItem('hasWatchedAnimation') === 'true') {
      setHasWatched(true);
    }

    const handleMessage = (event: MessageEvent) => {
      // Allow any origin since iframe loaded from same host, just check data
      if (event.data === 'animation_complete') {
        localStorage.setItem('hasWatchedAnimation', 'true');
        onComplete();
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const iframe = document.querySelector('iframe');
        iframe?.contentWindow?.postMessage('trigger_flash', '*');
      }
    };
    
    window.addEventListener('message', handleMessage);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="fixed inset-0 z-[9999] bg-white pointer-events-none"
    >
      <iframe 
        src={`/cyber.html?hasWatched=${hasWatched}`}
        className="w-full h-full border-none pointer-events-auto"
        title="Cyber Sequence"
        sandbox="allow-scripts allow-same-origin"
      />
    </motion.div>
  );
}
