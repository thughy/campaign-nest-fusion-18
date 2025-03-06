
import React, { useState } from 'react';
import { Campaign } from '@/types/campaign.types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, BarChart } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'react-router-dom';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      case 'inactive':
        return 'bg-slate-100 text-slate-800 hover:bg-slate-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'completed':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'inactive':
        return 'Inactiva';
      case 'scheduled':
        return 'Programada';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  };

  // Generate random stats preview if none exists
  const stats = campaign.stats || {
    impressions: Math.floor(Math.random() * 100000),
    clicks: Math.floor(Math.random() * 10000),
    conversions: Math.floor(Math.random() * 1000),
    ctr: Math.random() * 10,
    conversionRate: Math.random() * 5,
    spend: Math.random() * 5000
  };

  const created = new Date(campaign.created);
  const timeAgo = formatDistanceToNow(created, { addSuffix: true, locale: es });

  return (
    <Card className="w-full mb-4 overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group">
      <Link to={`/campaign/${campaign.id}`} className="block">
        <CardHeader className="p-4 sm:p-6 bg-card border-b">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(campaign.status)}`}>
                  {getStatusLabel(campaign.status)}
                </Badge>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{timeAgo}</span>
                </div>
              </div>
              <h3 className="font-medium text-xl">{campaign.name}</h3>
              {campaign.description && (
                <p className="text-sm text-muted-foreground">{campaign.description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex gap-6 mr-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Impresiones</p>
                  <p className="font-medium">{stats.impressions.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Clicks</p>
                  <p className="font-medium">{stats.clicks.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">CTR</p>
                  <p className="font-medium">{stats.ctr.toFixed(2)}%</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto group-hover:bg-primary/10 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Link>
    </Card>
  );
}
