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
      <img
        src="/logo.svg"
        alt="Smurfy"
        className="h-24 w-24 object-contain animate-fade-in-up motion-reduce:animate-none"
      />
      <h1
        className="font-display font-extrabold text-3xl text-ink mt-5 tracking-tight animate-fade-in motion-reduce:animate-none"
        style={{ animationDelay: '200ms', animationFillMode: 'both' }}
      >
        Smurfy
      </h1>
      <div className="w-40 h-1 mt-9 overflow-hidden rounded-full bg-surface-3">
        <div className="h-full w-full rounded-full bg-gradient-to-r from-transparent via-accent to-transparent bg-[length:200%_100%] animate-shimmer motion-reduce:animate-none" />
      </div>
    </div>
  );
};

export default SplashScreen;
