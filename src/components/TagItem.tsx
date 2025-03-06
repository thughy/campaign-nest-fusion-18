
import React from 'react';
import { AdTag } from '@/types/campaign.types';
import { Tag } from "lucide-react";

interface TagItemProps {
  tag: AdTag;
}

export function TagItem({ tag }: TagItemProps) {
  return (
    <div className="border rounded-lg p-2 flex items-center gap-2 bg-secondary/10 hover:bg-secondary/30 transition-all-smooth">
      <Tag className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-sm">{tag.name}</span>
      <span className="text-xs text-muted-foreground ml-auto">{tag.type}</span>
    </div>
  );
}
