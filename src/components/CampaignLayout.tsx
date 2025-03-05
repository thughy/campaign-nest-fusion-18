
import React from 'react';
import { cn } from "@/lib/utils";

interface CampaignLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function CampaignLayout({ children, className }: CampaignLayoutProps) {
  return (
    <div className={cn(
      "min-h-screen bg-background flex flex-col items-center",
      className
    )}>
      <main className="flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
}
