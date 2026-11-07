import React from 'react';

export type ContactsTab = 'all' | 'requests' | 'sent' | 'suggestions';

export interface TabConfigItem {
  id: ContactsTab;
  label: string;
  mobileLabel: string;
  icon: React.ReactNode;
  count?: number;
  badge?: boolean;
}
