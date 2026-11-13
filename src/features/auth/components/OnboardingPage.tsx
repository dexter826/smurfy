import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, X, SkipForward } from 'lucide-react';
import { useAuthStore } from '@/features/auth';
import { Button, SearchableSelect, Input } from '@/components/ui';
import type { SearchableOption } from '@/components/ui/SearchableSelect';
import { onboardingSchema, OnboardingFormValues } from '@/utils/validation';
import { toast } from '@/store/toastStore';
import { API_ENDPOINTS, VALIDATION, INTEREST_SUGGESTIONS, TOAST_MESSAGES } from '@/constants';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interestInput, setInterestInput] = useState('');
  const [provinces, setProvinces] = useState<SearchableOption[]>([]);
  const [provincesLoaded, setProvincesLoaded] = useState(false);

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      location: user?.location || '',
      interests: user?.interests || [],
    },
  });

  const formData = watch();

  /**
   * Tải danh sách tỉnh thành từ API
   */
  React.useEffect(() => {
    let isMounted = true;
    if (provincesLoaded) return;
    fetch(API_ENDPOINTS.PROVINCES)
      .then((res) => res.json())
      .then((data: { name: string }[]) => {
        if (!isMounted) return;
        setProvinces(data.map((p) => ({ value: p.name, label: p.name })));
        setProvincesLoaded(true);
      })
      .catch(() => {
        /* silent */
      });
    return () => {
      isMounted = false;
    };
  }, [provincesLoaded]);

  const handleAddInterest = useCallback(
    (tag: string) => {
      const current = formData.interests ?? [];
      if (current.includes(tag)) return;

      if (current.length >= VALIDATION.INTEREST_MAX_COUNT) {
        toast.error(TOAST_MESSAGES.PROFILE.INTEREST_LIMIT(VALIDATION.INTEREST_MAX_COUNT));
        return;
      }

      setValue('interests', [...current, tag]);
    },
    [formData.interests, setValue],
  );

  const handleRemoveInterest = useCallback(
    (tag: string) => {
      setValue(
        'interests',
        (formData.interests ?? []).filter((t) => t !== tag),
      );
    },
    [formData.interests, setValue],
  );

  const handleInterestInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = interestInput.trim();
      if (val) {
        handleAddInterest(val);
        setInterestInput('');
      }
    }
  };

  const handleSkip = async () => {
    try {
      setIsSubmitting(true);
      await completeOnboarding({});
      navigate('/', { replace: true });
    } catch {
      navigate('/', { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    setIsSubmitting(true);
    try {
      await completeOnboarding({
        location: data.location,
        interests: data.interests,
      });
      toast.success(TOAST_MESSAGES.PROFILE.ONBOARDING_SUCCESS);
      navigate('/', { replace: true });
    } catch {
      toast.error(TOAST_MESSAGES.PROFILE.ONBOARDING_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background selection:bg-accent/20 flex flex-col">
      <header className="h-14 flex-shrink-0 bg-surface border-b border-line flex items-center px-4 gap-3">
        <img src="/logo.svg" alt="Smurfy" className="h-8 w-8 object-contain" />
        <span className="font-display font-extrabold text-ink">Smurfy</span>
      </header>

      <main className="flex-1 overflow-y-auto flex flex-col animate-fade-in">
        <div className="w-full max-w-[480px] mx-auto flex flex-col flex-1 p-6">
          {/* Header */}
          <div className="mb-8 flex-shrink-0">
            <h1 className="text-2xl font-bold text-ink mb-1">Chào mừng bạn!</h1>
            <p className="text-sm text-ink-2 leading-relaxed">
              Cập nhật nơi ở và sở thích của bạn.
            </p>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto scroll-hide px-0.5">
            <div className="space-y-8 pb-4 px-1.5">
              {/* Location Selection */}
              <SearchableSelect
                label="Bạn đang ở đâu?"
                value={formData.location || ''}
                onChange={(val) => setValue('location', val)}
                options={provinces}
                placeholder="Chọn thành phố của bạn"
                searchPlaceholder="Tìm kiếm thành phố..."
                error={errors.location?.message}
                size="lg"
              />

              {/* Interests Section */}
              <div className="space-y-6">
                {/* Input Field */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-sm font-semibold text-ink">Sở thích của bạn</label>
                    <span className="text-caption font-bold text-ink-3 bg-surface-2 px-2 py-0.5 rounded-full border border-line">
                      {formData.interests?.length ?? 0}/{VALIDATION.INTEREST_MAX_COUNT}
                    </span>
                  </div>
                  <Input
                    value={interestInput}
                    onChange={(e) => setInterestInput(e.target.value)}
                    onKeyDown={handleInterestInput}
                    placeholder="Âm nhạc, Du lịch, Gaming..."
                    error={errors.interests?.message}
                    rightElement={<Sparkles size={18} className="text-ink-3" />}
                  />
                </div>

                {/* Suggestions Cloud */}
                <div className="space-y-3">
                  <p className="text-caption font-bold text-ink-3 uppercase tracking-wider ml-1">
                    Gợi ý cho bạn
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_SUGGESTIONS.filter((s) => !(formData.interests ?? []).includes(s))
                      .slice(0, 15)
                      .map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleAddInterest(tag)}
                          className={`px-3 py-1.5 rounded-full text-caption font-semibold border transition-all
                            ${
                              (formData.interests?.length ?? 0) >= VALIDATION.INTEREST_MAX_COUNT
                                ? 'border-line bg-surface-2 text-ink-3 cursor-pointer'
                                : 'border-line bg-surface text-ink-2 hover:border-accent hover:text-accent-strong hover:bg-accent-soft'
                            }`}
                        >
                          + {tag}
                        </button>
                      ))}
                  </div>
                </div>

                {/* Selected Tags Display */}
                {formData.interests && formData.interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-dashed border-line animate-fade-in">
                    {formData.interests.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-caption font-bold bg-accent text-on-accent animate-fade-in"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveInterest(tag)}
                          className="hover:bg-on-accent/10 rounded-full p-0.5 transition-colors"
                        >
                          <X size={12} strokeWidth={3} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer - Sticky/Fixed */}
          <div className="mt-auto pt-6 border-t border-line bg-surface flex-shrink-0">
            <div className="space-y-4">
              <Button
                fullWidth
                size="lg"
                onClick={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                className="h-12"
              >
                Tiếp tục vào trang chủ
              </Button>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSkip}
                  disabled={isSubmitting}
                  className="group flex items-center gap-2 text-xs font-bold text-ink-3 hover:text-accent-strong transition-all py-1"
                >
                  BỎ QUA BƯỚC NÀY
                  <SkipForward
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingPage;
