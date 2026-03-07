import { Inbox } from 'lucide-react';
import React from 'react';

 const EmptyState = ({ label }: { label: string }) => (
    <div className="animate-fade-in flex flex-col items-center justify-center gap-3 py-14 text-center">
        <Inbox className="h-10 w-10 text-text-subtle opacity-50" />
        <p className="text-sm font-medium text-text-subtle">
            لا يوجد {label} متاح حالياً
        </p>
    </div>
);

export default EmptyState;
