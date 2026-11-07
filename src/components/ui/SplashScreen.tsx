import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface SplashScreenProps {
  isReady?: boolean;
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ isReady, onFinish }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);

  useEffect(() => {
    fetch('/static/animations/splash.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Lỗi tải splash animation:', err));

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
      className={`fixed inset-0 z-toast flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <img src="/logo.svg" alt="Smurfy" className="h-28 w-28 object-contain" />
      <h1 className="font-display font-extrabold text-3xl text-foreground mt-4 tracking-tight">Smurfy</h1>
      <div className="w-24 h-1.5 mt-8 overflow-hidden rounded-full bg-surface-sunken">
        <div className="h-full w-1/2 rounded-full bg-primary animate-shimmer" />
      </div>
    </div>
  );
};

export default SplashScreen;
