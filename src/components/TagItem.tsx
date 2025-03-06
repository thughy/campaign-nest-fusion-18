
import React from 'react';
import { AdTag } from '@/types/campaign.types';
import { Tag } from "lucide-react";

interface TagItemProps {
  tag: AdTag;
}

export function TagItem({ tag }: TagItemProps) {
  return (
    <div className="border rounded-full overflow-hidden px-3 py-1 mb-2 flex items-center gap-1.5 bg-secondary/20 hover:bg-secondary/40 transition-all-smooth shadow-sm">
      <Tag className="h-3 w-3 text-muted-foreground" />
      <span className="text-xs font-medium">{tag.name}</span>
    </div>
  );
}
