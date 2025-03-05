
import React, { useState } from 'react';
import { Year } from '@/types/campaign.types';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { CityItem } from './CityItem';

interface YearItemProps {
  year: Year;
}

export function YearItem({ year }: YearItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden transition-all-smooth">
      <div 
        className="flex items-center justify-between p-3 bg-secondary/50 border-b cursor-pointer hover:bg-secondary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{year.year}</span>
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
        <div className="p-3 space-y-3 animate-fade-in">
          {year.cities.map((city) => (
            <CityItem key={city.id} city={city} />
          ))}
        </div>
      )}
    </div>
  );
}
