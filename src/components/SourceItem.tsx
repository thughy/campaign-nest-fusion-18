
import React from 'react';
import { Source } from '@/types/campaign.types';
import { Facebook, Instagram, Search, MessageCircle, Globe } from "lucide-react";
import { TagItem } from './TagItem';

interface SourceItemProps {
  source: Source;
}

export function SourceItem({ source }: SourceItemProps) {
  const getSourceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'google':
        return <Search className="h-4 w-4" />;
      case 'tik tok':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden transition-all-smooth">
      <div className="p-3 bg-background hover:bg-secondary/20 border-b">
        <div className="flex items-center gap-2">
          {getSourceIcon(source.name)}
          <span className="font-medium">{source.name}</span>
          <span className="text-xs text-muted-foreground">({source.platform})</span>
        </div>
      </div>
      
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {source.adTags.map((tag) => (
          <TagItem key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
}
