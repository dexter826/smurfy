import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

/** Skeleton hiển thị khi đang tải tin nhắn */
export const ChatBoxSkeleton: React.FC = () => (
  <div className="flex flex-col gap-5 px-3 md:px-4 py-4 h-full overflow-hidden">
    {/* Received */}
    <div className="flex items-end gap-2 max-w-[72%]">
      <Skeleton variant="circle" width={30} height={30} className="flex-shrink-0 mb-0.5" />
      <div className="space-y-1.5">
        <Skeleton height={38} width={200} className="rounded-card rounded-bl-[5px]" />
        <Skeleton height={38} width={140} className="rounded-card rounded-bl-[5px] opacity-70" />
      </div>
    </div>

    {/* Sent */}
    <div className="flex flex-col items-end gap-1.5 max-w-[72%] ml-auto">
      <Skeleton height={44} width={220} className="rounded-card rounded-br-[5px] bg-accent/15" />
    </div>

    {/* Received */}
    <div className="flex items-end gap-2 max-w-[72%]">
      <Skeleton variant="circle" width={30} height={30} className="flex-shrink-0 mb-0.5" />
      <Skeleton height={38} width={160} className="rounded-card rounded-bl-[5px]" />
    </div>

    {/* Sent Image Like */}
    <div className="flex flex-col items-end gap-1.5 max-w-[72%] ml-auto">
      <Skeleton height={140} width={220} className="rounded-card rounded-br-[5px] bg-accent/15" />
    </div>

    {/* Received */}
    <div className="flex items-end gap-2 max-w-[72%]">
      <Skeleton variant="circle" width={30} height={30} className="flex-shrink-0 mb-0.5" />
      <Skeleton height={38} width={180} className="rounded-card rounded-bl-[5px]" />
    </div>

    {/* Sent */}
    <div className="flex flex-col items-end gap-1.5 max-w-[72%] ml-auto">
      <Skeleton height={38} width={160} className="rounded-card rounded-br-[5px] bg-accent/15" />
    </div>
  </div>
);
