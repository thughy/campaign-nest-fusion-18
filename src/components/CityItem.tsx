
import React from 'react';
import { City } from '@/types/campaign.types';
import { MapPin } from "lucide-react";
import { TagItem } from './TagItem';

interface CityItemProps {
  city: City;
}

export function CityItem({ city }: CityItemProps) {
  return (
    <div className="border rounded-lg overflow-hidden transition-all-smooth">
      <div className="p-3 bg-secondary/50 border-b">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{city.name}</span>
        </div>
      </div>
      
      <div className="p-3 space-y-2">
        {city.sources.map((source) => (
          <div key={source.id} className="border rounded-lg p-2 bg-background/80">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">{source.name}</span>
              <span className="text-xs text-muted-foreground">({source.platform})</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {source.adTags.map((tag) => (
                <TagItem key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
