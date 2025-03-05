
import React from 'react';
import { CampaignLayout } from '@/components/CampaignLayout';
import { CampaignHeader } from '@/components/CampaignHeader';
import { CampaignList } from '@/components/CampaignList';
import { mockCampaigns } from '@/data/mockCampaigns';

const Index = () => {
  return (
    <CampaignLayout>
      <CampaignHeader />
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Todas las campañas</h2>
          <div className="flex gap-2 text-sm">
            <span className="text-muted-foreground">Total: {mockCampaigns.length}</span>
          </div>
        </div>
        <CampaignList campaigns={mockCampaigns} />
      </div>
    </CampaignLayout>
  );
};

export default Index;
