import { Icon, Zap } from 'lucide-react';
import React from 'react'

interface BadgeProps {
    text: string;
    icon?: React.ReactNode;
}
const Badge = ({ text, icon }: BadgeProps) => {
  return (  <div className="hero-anim-1 flex w-fit items-center gap-2 rounded-md border border-primary-200 bg-primary-50 px-3 py-1.5">
          {icon && icon}
    <span className="text-[11px] font-semibold tracking-widest text-primary-600 uppercase">
        {text}
    </span>
    </div>);
}

export default Badge