import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] bg-canvas flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}

      <div className="relative z-10 w-full max-w-lg text-center animate-fade-in flex flex-col items-center">
        {/* 404 Text */}
        <h1 className="font-display font-extrabold text-[7rem] md:text-[10rem] leading-none text-accent-strong mb-6">
          404
        </h1>

        {/* Messages */}
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">Trang không tồn tại</h2>
        <p className="text-base text-ink-2 max-w-md mx-auto mb-10 leading-relaxed px-4">
          Trang này không tồn tại hoặc đã bị gỡ. Kiểm tra lại đường dẫn hoặc về trang chủ.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[360px] mx-auto px-4">
          <Button
            fullWidth
            size="lg"
            variant="secondary"
            icon={<ArrowLeft size={20} />}
            onClick={() => navigate(-1)}
            className="order-2 sm:order-1"
          >
            Quay lại
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="primary"
            icon={<Home size={20} />}
            onClick={() => navigate('/')}
            className="order-1 sm:order-2"
          >
            Về trang chủ
          </Button>
        </div>
      </div>

      {/* Footer note */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-caption font-medium text-ink-3">© {new Date().getFullYear()} Smurfy</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
