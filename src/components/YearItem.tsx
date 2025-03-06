
import React from 'react';
import { Year } from '@/types/campaign.types';
import { Calendar } from "lucide-react";
import { CityItem } from './CityItem';

interface YearItemProps {
  year: Year;
}

export function YearItem({ year }: YearItemProps) {
  return (
    <div className="border rounded-lg overflow-hidden transition-all-smooth">
      <div className="p-3 bg-secondary/50 border-b">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{year.year}</span>
        </div>
      </div>
      
      <div className="p-3 space-y-3">
        {year.cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}
