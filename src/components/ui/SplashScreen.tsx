import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  isReady?: boolean;
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isReady, onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMinTimeElapsed(true);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady && isMinTimeElapsed) {
      setIsFadingOut(true);
      const finishTimer = setTimeout(() => {
        onFinish?.();
      }, 500);
      return () => clearTimeout(finishTimer);
    }
  }, [isReady, isMinTimeElapsed, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-toast flex flex-col items-center justify-center bg-canvas transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <img src="/logo.svg" alt="Smurfy" className="h-28 w-28 object-contain" />
      <h1 className="font-display font-extrabold text-4xl text-ink mt-4 tracking-tight">Smurfy</h1>
      <div className="w-24 h-1.5 mt-8 overflow-hidden rounded-full bg-surface-3">
        <div className="h-full w-1/2 rounded-full bg-accent animate-shimmer" />
      </div>
    </div>
  );
};

export default SplashScreen;
