
export interface AdTag {
  id: string;
  name: string;
  type: string;
}

export interface Source {
  id: string;
  name: string;
  platform: string;
  adTags: AdTag[];
}

export interface City {
  id: string;
  name: string;
  sources: Source[];
}

export interface Year {
  id: string;
  year: number;
  cities: City[];
}

export interface CampaignStats {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number; // Click-through rate (percentage)
  conversionRate: number; // Conversion rate (percentage)
  spend: number; // In dollars
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive' | 'scheduled' | 'completed';
  created: string;
  years: Year[];
  stats?: CampaignStats;
}

export type FilterType = 'year' | 'city' | 'source';
