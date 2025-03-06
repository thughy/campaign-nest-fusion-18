
import React, { useState } from 'react';
import { Source } from '@/types/campaign.types';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Globe, Facebook, Instagram, Search, MessageCircle } from "lucide-react";
import { TagItem } from './TagItem';

interface SourceItemProps {
  source: Source;
}

export function SourceItem({ source }: SourceItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <div className="border rounded-lg overflow-hidden ml-6 transition-all-smooth">
      <div 
        className="flex items-center justify-between p-2.5 bg-background hover:bg-secondary/20 border-b cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {getSourceIcon(source.name)}
          <span>{source.name}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-2 animate-fade-in">
          {source.adTags.map((tag) => (
            <TagItem key={tag.id} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
