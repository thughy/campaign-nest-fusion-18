
import React from 'react';
import { Campaign } from '@/types/campaign.types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, Calendar, User, MapPin, Share2 } from "lucide-react";
import { formatDistanceToNow, format } from 'date-fns';
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
    spend: Math.random() * 5000,
    leadsRegistered: Math.floor(Math.random() * 500)
  };

  const created = new Date(campaign.created);
  const timeAgo = formatDistanceToNow(created, { addSuffix: true, locale: es });
  const formattedCreationDate = format(created, 'dd MMM yyyy', { locale: es });
  
  // Format publish date if available
  const publishDate = campaign.publishDate ? format(new Date(campaign.publishDate), 'dd MMM yyyy', { locale: es }) : 'No publicada';

  // Get unique sources and locations
  const allSources = new Set<string>();
  const allLocations = new Set<string>();
  
  campaign.years.forEach(year => {
    year.cities.forEach(city => {
      allLocations.add(city.name);
      city.sources.forEach(source => {
        allSources.add(source.name);
      });
    });
  });

  return (
    <Card className="w-full mb-4 overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer group">
      <Link to={`/campaign/${campaign.id}`} className="block">
        <CardHeader className="p-4 sm:p-6 bg-card border-b">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
            <div className="space-y-3 flex-1">
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Creación: </span>
                    <span>{formattedCreationDate}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Publicación: </span>
                    <span>{publishDate}</span>
                  </div>
                </div>
                
                {campaign.createdBy && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Creado por: </span>
                      <span>{campaign.createdBy}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Sources: </span>
                    <span>{allSources.size > 0 ? Array.from(allSources).slice(0, 2).join(', ') + (allSources.size > 2 ? '...' : '') : 'Ninguno'}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <span className="text-muted-foreground">Locations: </span>
                    <span>{allLocations.size > 0 ? Array.from(allLocations).slice(0, 2).join(', ') + (allLocations.size > 2 ? '...' : '') : 'Ninguna'}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sm:min-w-[250px] sm:border-l sm:pl-4 pt-2 sm:pt-0">
              <div className="grid grid-cols-2 gap-2">
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
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Leads</p>
                  <p className="font-medium">{stats.leadsRegistered?.toLocaleString() || '0'}</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full mt-3 group-hover:bg-primary/10 transition-all"
              >
                Ver detalles
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Link>
    </Card>
  );
}
