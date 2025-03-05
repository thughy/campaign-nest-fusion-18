
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface CampaignHeaderProps {
  className?: string;
}

export function CampaignHeader({ className }: CampaignHeaderProps) {
  return (
    <header className={cn(
      "w-full py-6 mb-8 border-b transition-all-smooth",
      className
    )}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1 animate-slide-in-left">
          <h1 className="text-3xl font-medium tracking-tight">Campañas</h1>
          <p className="text-muted-foreground">
            Administra todas tus campañas de manera organizada
          </p>
        </div>
        <Button className="animate-slide-in-right flex items-center gap-2 transition-all hover:scale-105">
          <PlusCircle className="h-4 w-4" />
          <span>Nueva Campaña</span>
        </Button>
      </div>
    </header>
  );
}
