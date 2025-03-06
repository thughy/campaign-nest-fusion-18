
import React, { useState } from 'react';
import { City } from '@/types/campaign.types';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { SourceItem } from './SourceItem';

interface CityItemProps {
  city: City;
}

export function CityItem({ city }: CityItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden ml-4 transition-all-smooth">
      <div 
        className="flex items-center justify-between p-3 bg-background hover:bg-secondary/30 border-b cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{city.name}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="p-3 space-y-2 animate-fade-in">
          {city.sources.map((source) => (
            <SourceItem key={source.id} source={source} />
          ))}
        </div>
      )}
    </div>
  );
}
