import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Timestamp } from 'firebase/firestore';
import { X } from 'lucide-react';
import {
  User,
  Gender,
  MaritalStatus,
  Generation,
  GENDER_LABELS,
  MARITAL_STATUS_LABELS,
} from '@shared/types';
import {
  Button,
  Input,
  TextArea,
  Select,
  DatePicker,
  Modal,
  SearchableSelect,
} from '@/components/ui';
import type { SearchableOption } from '@/components/ui/SearchableSelect';
import { toDate } from '@/utils/dateUtils';
import { toast } from '@/store/toastStore';
import { API_ENDPOINTS, TOAST_MESSAGES, VALIDATION } from '@/constants';
import { profileSchema, ProfileFormValues } from '@/utils/validation';
import { calculateGeneration } from '@/utils/userUtils';
import schoolsData from '@/assets/data/schools.json';
import ProfilePrivacySelector from './ProfilePrivacySelector';
import { Visibility, ProfilePrivacy } from '@shared/types';

interface EditProfileModalProps {
  user: User;
  open: boolean;
  onOpenChange: () => void;
  onSave: (data: Partial<User>) => Promise<void>;
}

const MARITAL_STATUS_OPTIONS = Object.entries(MARITAL_STATUS_LABELS).map(([value, label]) => ({
  value: value as MaritalStatus,
  label,
}));

const GENDER_OPTIONS = Object.entries(GENDER_LABELS).map(([value, label]) => ({
  value: value as Gender,
  label,
}));

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  user,
  open,
  onOpenChange,
  onSave,
}) => {
  const [saving, setSaving] = useState(false);
  const [provinces, setProvinces] = useState<SearchableOption[]>([]);

  const schoolOptions = useMemo<SearchableOption[]>(
    () => schoolsData.map((s) => ({ value: s.name, label: s.name, code: s.code })),
    [],
  );
  const [interestInput, setInterestInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName,
      bio: user.bio || '',
      location: user.location || '',
      gender: (user.gender || '') as any,
      dob: user.dob ? toDate(user.dob)?.getTime() : undefined,
      school: user.school || '',
      maritalStatus: (user.maritalStatus || '') as any,
      interests: user.interests || [],
      generation: user.generation || Generation.UNKNOWN,
      profilePrivacy: user.profilePrivacy || {
        email: Visibility.PRIVATE,
        dob: Visibility.FRIENDS,
        gender: Visibility.FRIENDS,
        location: Visibility.FRIENDS,
        school: Visibility.FRIENDS,
        maritalStatus: Visibility.FRIENDS,
      },
    },
  });

  const formData = watch();

  useEffect(() => {
    if (!open) return;
    reset({
      fullName: user.fullName,
      bio: user.bio || '',
      location: user.location || '',
      gender: (user.gender || '') as any,
      dob: user.dob ? toDate(user.dob)?.getTime() : undefined,
      school: user.school || '',
      maritalStatus: (user.maritalStatus || '') as any,
      interests: user.interests || [],
      generation: user.generation || Generation.UNKNOWN,
      profilePrivacy: user.profilePrivacy || {
        email: Visibility.PRIVATE,
        dob: Visibility.FRIENDS,
        gender: Visibility.FRIENDS,
        location: Visibility.FRIENDS,
        school: Visibility.FRIENDS,
        maritalStatus: Visibility.FRIENDS,
      },
    });
    setInterestInput('');
    fetch(API_ENDPOINTS.PROVINCES)
      .then((r) => r.json())
      .then((data: { name: string }[]) =>
        setProvinces(data.map((p) => ({ value: p.name, label: p.name }))),
      )
      .catch(() => {
        /* silent */
      });
  }, [open, user, reset]);

  const handleAddInterest = useCallback(() => {
    const tag = interestInput.trim();
    if (!tag) return;
    const current = formData.interests ?? [];
    if (current.includes(tag) || current.length >= VALIDATION.INTEREST_MAX_COUNT) return;
    setValue('interests', [...current, tag], { shouldDirty: true });
    setInterestInput('');
  }, [interestInput, formData.interests, setValue]);

  const handleRemoveInterest = useCallback(
    (tag: string) => {
      setValue(
        'interests',
        (formData.interests ?? []).filter((t) => t !== tag),
        { shouldDirty: true },
      );
    },
    [formData.interests, setValue],
  );

  const handleInterestKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddInterest();
      }
    },
    [handleAddInterest],
  );

  const handleSave = async (data: ProfileFormValues) => {
    setSaving(true);
    try {
      const payload: Partial<User> = {
        fullName: data.fullName,
        bio: data.bio || '',
        location: data.location || '',
        school: data.school || '',
        interests: data.interests || [],
        generation: data.generation || Generation.UNKNOWN,
        profilePrivacy: data.profilePrivacy,
        ...(!!data.gender && { gender: data.gender as Gender }),
        ...(data.dob && { dob: Timestamp.fromDate(new Date(data.dob)) }),
        ...(!!data.maritalStatus && { maritalStatus: data.maritalStatus as MaritalStatus }),
      };
      await onSave(payload);
      toast.success(TOAST_MESSAGES.PROFILE.UPDATE_SUCCESS);
      onOpenChange();
    } catch {
      toast.error(TOAST_MESSAGES.PROFILE.UPDATE_FAILED);
    } finally {
      setSaving(false);
    }
  };

  const onInvalid = (errs: typeof errors) => {
    const firstError = Object.values(errs)[0];
    if (firstError?.message) toast.error(firstError.message as string);
  };

  const FieldWrapper: React.FC<{
    label: string;
    privacyKey: keyof ProfilePrivacy;
    children: React.ReactNode;
    required?: boolean;
    error?: string;
  }> = ({ label, privacyKey, children, required, error }) => (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center px-1">
        <label className="text-xs font-semibold text-secondary cursor-pointer">
          {label} {required && '*'}
        </label>
        <ProfilePrivacySelector
          value={formData.profilePrivacy?.[privacyKey] || Visibility.FRIENDS}
          onChange={(val) =>
            setValue('profilePrivacy', { ...formData.profilePrivacy, [privacyKey]: val } as any, {
              shouldDirty: true,
            })
          }
        />
      </div>
      {children}
      {error && <p className="text-xs text-danger px-1 mt-0.5">{error}</p>}
    </div>
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Chỉnh sửa trang cá nhân"
      size="2xl"
      fullScreen="mobile"
      footer={
        <>
          <Button variant="secondary" onClick={onOpenChange} disabled={saving}>
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit(handleSave, onInvalid)}
            isLoading={saving}
            disabled={saving}
          >
            Lưu thay đổi
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full name */}
          <div className="col-span-1 sm:col-span-2">
            <Input
              label="Tên hiển thị *"
              {...register('fullName')}
              error={errors.fullName?.message}
              placeholder="Nhập họ và tên"
              size="lg"
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <TextArea
              label="Giới thiệu"
              {...register('bio')}
              onChange={(e) =>
                setValue('bio', e.target.value.slice(0, VALIDATION.BIO_MAX_LENGTH), {
                  shouldDirty: true,
                })
              }
              error={errors.bio?.message}
              placeholder="Nhập vài dòng giới thiệu về bản thân..."
              rows={2}
              rightElement={
                <div className="text-xs text-muted pr-2 pb-2 pointer-events-none">
                  {formData.bio?.length || 0}/{VALIDATION.BIO_MAX_LENGTH}
                </div>
              }
            />
          </div>

          <div>
            <FieldWrapper label="Email" privacyKey="email">
              <Input value={user.email || ''} disabled size="lg" />
            </FieldWrapper>
          </div>

          <div>
            <FieldWrapper
              label="Tỉnh/Thành phố"
              privacyKey="location"
              error={errors.location?.message}
            >
              <SearchableSelect
                value={formData.location || ''}
                onChange={(val) => setValue('location', val, { shouldDirty: true })}
                options={provinces}
                placeholder="Chọn tỉnh/thành phố"
                searchPlaceholder="Tìm tỉnh/thành phố..."
                error={errors.location?.message}
                size="lg"
              />
            </FieldWrapper>
          </div>

          <div>
            <FieldWrapper label="Giới tính" privacyKey="gender" error={errors.gender?.message}>
              <Select
                value={formData.gender || ''}
                onChange={(val) => setValue('gender', val as Gender, { shouldDirty: true })}
                options={GENDER_OPTIONS}
                placeholder="Chọn giới tính"
                error={errors.gender?.message}
                size="lg"
              />
            </FieldWrapper>
          </div>

          <div>
            <FieldWrapper label="Ngày sinh" privacyKey="dob" error={errors.dob?.message}>
              <DatePicker
                value={formData.dob}
                onChange={(ts) => {
                  setValue('dob', ts, { shouldDirty: true });
                  if (ts) {
                    const gen = calculateGeneration(ts);
                    setValue('generation', gen, { shouldDirty: true });
                  }
                }}
                placeholder="Chọn ngày sinh"
                size="lg"
                error={errors.dob?.message}
              />
            </FieldWrapper>
          </div>

          <div>
            <FieldWrapper
              label="Tình trạng hôn nhân"
              privacyKey="maritalStatus"
              error={errors.maritalStatus?.message}
            >
              <Select
                value={formData.maritalStatus || ''}
                onChange={(val) =>
                  setValue('maritalStatus', val as MaritalStatus, { shouldDirty: true })
                }
                options={MARITAL_STATUS_OPTIONS}
                placeholder="Chọn tình trạng"
                error={errors.maritalStatus?.message}
                size="lg"
              />
            </FieldWrapper>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <FieldWrapper
              label="Trường học / Nơi học"
              privacyKey="school"
              error={errors.school?.message}
            >
              <SearchableSelect
                value={formData.school || ''}
                onChange={(val) => setValue('school', val, { shouldDirty: true })}
                options={schoolOptions}
                placeholder="Chọn hoặc tìm trường học"
                searchPlaceholder="Tìm theo tên trường hoặc mã (VD: BKA)..."
                error={errors.school?.message}
                size="lg"
              />
            </FieldWrapper>
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs font-semibold text-secondary px-1">
              Sở thích (tối đa {VALIDATION.INTEREST_MAX_COUNT})
            </label>
            <div className="flex gap-2 mt-1.5">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
                placeholder="Nhập sở thích rồi nhấn Enter..."
                maxLength={VALIDATION.INTEREST_MAX_LENGTH}
                className="flex-1 px-3.5 py-2 text-sm rounded-xl border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleAddInterest}
                disabled={(formData.interests?.length ?? 0) >= VALIDATION.INTEREST_MAX_COUNT}
              >
                Thêm
              </Button>
            </div>
            {errors.interests?.message && (
              <p className="text-xs text-danger px-1 mt-1">{errors.interests.message}</p>
            )}
            {(formData.interests?.length ?? 0) > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {formData.interests?.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(tag)}
                      className="hover:text-primary/60 transition-colors"
                      aria-label={`Xóa ${tag}`}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
