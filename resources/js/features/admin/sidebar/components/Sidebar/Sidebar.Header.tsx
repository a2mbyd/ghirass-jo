import { Link } from '@inertiajs/react';
import { GraduationCap , ChevronLeft, ChevronRight } from 'lucide-react';

import React from 'react'

interface SidebarHeaderProps {
    collapsed: boolean;
    setMobileOpen: (open: boolean) => void;
    setCollapsed: (collapsed: boolean) => void;
}

const SidebarHeader = ({ collapsed, setMobileOpen, setCollapsed }: SidebarHeaderProps) => {
  return (
      <div
          className={`flex min-h-[60px] items-center border-b border-border ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}
      >
          {!collapsed && (
              <Link href={'/'} className="flex items-center gap-2">
                  <span className="rounded-md bg-primary-500 p-1 text-base font-bold tracking-tight text-white">
                      <GraduationCap className="h-4 w-4" />
                  </span>
                  <span className="text-base font-bold tracking-tight text-primary-500">
                      غراس
                  </span>
              </Link>
          )}
          <button
              onClick={() => {
                  if (window.innerWidth < 768) {
                      setMobileOpen(false);
                  } else {
                      setCollapsed(!collapsed);
                  }
              }}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border bg-surface-alt text-text-muted transition-colors hover:bg-primary-50 hover:text-primary-500"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
              {collapsed ? (
                  <ChevronRight className="h-4 w-4" />
              ) : (
                  <ChevronLeft className="h-4 w-4" />
              )}
          </button>
      </div>
  );
}

export default SidebarHeader