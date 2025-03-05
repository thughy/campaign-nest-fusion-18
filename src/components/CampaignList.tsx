
import React from 'react';
import { Campaign } from '@/types/campaign.types';
import { CampaignCard } from './CampaignCard';

interface CampaignListProps {
  campaigns: Campaign[];
}

export function CampaignList({ campaigns }: CampaignListProps) {
  return (
    <div className="space-y-2 animate-fade-in">
      {campaigns.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay campañas disponibles</p>
        </div>
      ) : (
        campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))
      )}
    </div>
  );
}
