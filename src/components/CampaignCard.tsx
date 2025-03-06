
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
  TrendingUp
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-3.5 w-3.5" />;
      case 'completed':
        return <CheckCircle className="h-3.5 w-3.5" />;
      case 'scheduled':
        return <Clock className="h-3.5 w-3.5" />;
      default:
        return <XCircle className="h-3.5 w-3.5" />;
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
  const timeAgo = formatDistanceToNow(created, { addSuffix: true, locale: es });
  const formattedCreatedDate = format(created, 'dd MMM yyyy', { locale: es });
  
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
    <Card className={`w-full mb-4 overflow-hidden transition-all-smooth ${
      isExpanded ? 'shadow-md' : 'shadow-sm hover:shadow-md'
    }`}>
      <CardHeader className="p-4 sm:p-6 bg-card border-b">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={`${getStatusColor(campaign.status)} flex items-center gap-1`}>
                  {getStatusIcon(campaign.status)}
                  {getStatusLabel(campaign.status)}
                </Badge>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{timeAgo}</span>
                </div>
              </div>
              <h3 className="font-semibold text-xl">{campaign.name}</h3>
              {campaign.description && (
                <p className="text-sm text-muted-foreground">{campaign.description}</p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Performance Chart */}
              <div className="w-full sm:w-48 h-24 bg-white/50 rounded-lg p-2 border">
                <div className="text-xs font-medium mb-1 flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>Rendimiento</span>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={performanceData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={false}
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
              
              <Button
                variant="ghost"
                size="sm"
                className="self-start transition-all hover:bg-secondary"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Campaign info and social networks */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <User className="h-3.5 w-3.5" />
              <span className="font-medium">Creator:</span>
              <span>{campaign.creator || 'Admin'}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium">Creada:</span>
              <span>{formattedCreatedDate}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-medium">Publicada:</span>
              <span>{campaign.publishedDate ? format(new Date(campaign.publishedDate), 'dd MMM yyyy', { locale: es }) : 'Pendiente'}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span className="font-medium">Leads:</span>
              <span>{campaign.leads?.toLocaleString() || '0'}</span>
            </div>
          </div>
          
          {/* Social networks */}
          {campaign.socialNetworks && campaign.socialNetworks.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {campaign.socialNetworks.map((network, idx) => (
                <Badge 
                  key={idx}
                  variant="outline" 
                  className="flex items-center gap-1.5 px-2 py-1 bg-secondary/10 hover:bg-secondary/20"
                >
                  {getSocialIcon(network)}
                  <span className="text-xs">{network}</span>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent 
          className="p-0 animate-slide-in-bottom"
        >
          <div className="p-4 sm:p-6 space-y-4">
            {campaign.years.map((year) => (
              <YearItem key={year.id} year={year} />
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
