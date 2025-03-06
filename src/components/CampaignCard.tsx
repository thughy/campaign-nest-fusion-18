
import React, { useState } from 'react';
import { Campaign, CampaignTab } from '@/types/campaign.types';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronUp, Clock, Calendar, MapPin, Globe } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { SourceItem } from './SourceItem';
import { CityItem } from './CityItem';
import { YearItem } from './YearItem';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<CampaignTab>("years");

  // Helper functions for getting all cities and sources across years
  const getAllCities = () => {
    const cities = [];
    for (const year of campaign.years) {
      cities.push(...year.cities);
    }
    return cities;
  };

  const getAllSources = () => {
    const sources = [];
    for (const year of campaign.years) {
      for (const city of year.cities) {
        sources.push(...city.sources);
      }
    }
    return sources;
  };

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

  const created = new Date(campaign.created);
  const timeAgo = formatDistanceToNow(created, { addSuffix: true, locale: es });

  return (
    <Card className={`w-full mb-4 overflow-hidden transition-all-smooth ${isExpanded ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}>
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
          <Button
            variant="ghost"
            size="sm"
            className="self-start sm:self-center transition-all hover:bg-secondary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent 
          className="p-0 animate-slide-in-bottom"
        >
          <Tabs 
            defaultValue="years" 
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as CampaignTab)}
            className="p-4 sm:p-6"
          >
            <TabsList className="mb-4 grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="years" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Años
              </TabsTrigger>
              <TabsTrigger value="cities" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Ciudades
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Fuentes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="years" className="space-y-4 animate-fade-in">
              {campaign.years.map((year) => (
                <YearItem key={year.id} year={year} />
              ))}
            </TabsContent>
            
            <TabsContent value="cities" className="space-y-4 animate-fade-in">
              {getAllCities().map((city) => (
                <CityItem key={city.id} city={city} />
              ))}
            </TabsContent>
            
            <TabsContent value="sources" className="space-y-4 animate-fade-in">
              {getAllSources().map((source) => (
                <SourceItem key={source.id} source={source} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
}
