
import React, { useState } from 'react';
import { Campaign } from '@/types/campaign.types';
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Calendar, 
  User, 
  Users, 
  CheckCircle, 
  XCircle,
  Link,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  TrendingUp,
  MoreVertical
} from "lucide-react";
import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { YearItem } from './YearItem';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        return 'Publicada';
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

  const getSocialIcon = (network: string) => {
    switch (network.toLowerCase()) {
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const created = new Date(campaign.created);
  const formattedCreatedDate = format(created, 'dd MMMM yyyy', { locale: es });
  
  // Default performance data if none exists
  const performanceData = campaign.performance || [
    { date: '01/01', value: 0 },
    { date: '01/02', value: 10 },
    { date: '01/03', value: 5 },
    { date: '01/04', value: 15 },
    { date: '01/05', value: 10 },
    { date: '01/06', value: 20 },
    { date: '01/07', value: 15 },
  ];

  return (
    <Card className="w-full mb-4 overflow-hidden transition-all shadow-sm hover:shadow-md rounded-xl">
      <CardHeader className="p-4 sm:p-6 bg-white">
        <div className="flex flex-col space-y-4">
          {/* Header with title and status badge */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Badge variant="outline" className={`rounded-full px-3 py-1 ${getStatusColor(campaign.status)}`}>
                {getStatusLabel(campaign.status)}
              </Badge>
              <h3 className="font-bold text-xl">{campaign.name}</h3>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Info rows with icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Creador</span>
                <span className="font-medium">{campaign.creator || 'Admin'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Fecha de creación</span>
                <span className="font-medium">{formattedCreatedDate}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Leads generados</span>
                <span className="font-medium">{campaign.leads?.toLocaleString() || '0'} leads</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                <Globe className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Redes sociales</span>
                <div className="flex gap-1">
                  {campaign.socialNetworks && campaign.socialNetworks.length > 0 ? (
                    campaign.socialNetworks.map((network, idx) => (
                      <div key={idx} className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                        {getSocialIcon(network)}
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground">Ninguna</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Performance chart */}
          <div className="mt-4 p-4 border rounded-lg bg-white/50">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>Rendimiento</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full transition-all hover:bg-secondary"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={true}
                    activeDot={{ r: 6 }}
                  />
                  <CartesianGrid stroke="hsla(var(--muted-foreground)/0.1)" strokeDasharray="5 5" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 10 }} 
                    stroke="hsl(var(--muted-foreground)/0.5)"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }} 
                    stroke="hsl(var(--muted-foreground)/0.5)"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--popover))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                    }} 
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent 
          className="p-0 animate-slide-in-bottom border-t"
        >
          <div className="p-4 sm:p-6 space-y-4 bg-slate-50">
            {campaign.years.map((year) => (
              <YearItem key={year.id} year={year} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
