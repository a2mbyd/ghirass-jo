import { GraduationCap } from 'lucide-react';
import React from 'react'

interface FormCardHeaderProps {
    title: string;
    icon?: React.ReactNode;
}
const FormCardHeader = ({ title, icon }: FormCardHeaderProps) => {
  return (
    <div className="flex items-center gap-3 border-b border-border px-6 py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
          {icon
            ? <>
            {icon}
            </>
            : (
              <GraduationCap className="h-4 w-4 text-primary-500" />
          )}
      </div>
      <h2 className="font-semibold text-text">
          {title}
      </h2>
    </div>
  )
}

export default FormCardHeader