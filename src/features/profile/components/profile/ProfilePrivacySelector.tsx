import React from 'react';
import { Visibility } from '@shared/types';
import { Globe, Users, Lock } from 'lucide-react';

interface ProfilePrivacySelectorProps {
  value: Visibility;
  onChange: (value: Visibility) => void;
  label?: string;
}

const ProfilePrivacySelector: React.FC<ProfilePrivacySelectorProps> = ({
  value,
  onChange,
  label,
}) => {
  const options = [
    { value: Visibility.PUBLIC, icon: Globe, label: 'Công khai', color: 'text-accent-strong' },
    { value: Visibility.FRIENDS, icon: Users, label: 'Bạn bè', color: 'text-accent-strong' },
    { value: Visibility.PRIVATE, icon: Lock, label: 'Chỉ mình tôi', color: 'text-ink-3' },
  ];

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-xs text-ink-3 font-bold ml-1 uppercase tracking-tighter">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1 bg-surface-2 p-1 rounded-control border border-line w-fit">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              title={opt.label}
              className={`p-1.5 rounded-control transition-all duration-200 ${
                isActive
                  ? `bg-surface shadow-sm border border-line ${opt.color}`
                  : 'text-ink-3 hover:text-ink-2'
              }`}
            >
              <Icon size={14} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePrivacySelector;
