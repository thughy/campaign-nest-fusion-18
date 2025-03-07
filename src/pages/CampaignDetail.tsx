
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CampaignLayout } from '@/components/CampaignLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  ArrowLeft, 
  Filter, 
  Calendar, 
  MapPin, 
  Globe, 
  Tag, 
  DollarSign, 
  Users, 
  Target, 
  PieChart as PieChartIcon, 
  BarChart as BarChartIcon
} from "lucide-react";
import { mockCampaigns } from '@/data/mockCampaigns';
import { Campaign, Year, City, Source, FilterType, AdTag } from '@/types/campaign.types';
import { format, parseISO, subDays } from 'date-fns';
import { es } from 'date-fns/locale';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('year');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedDateRange, setSelectedDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  
  const [filteredData, setFilteredData] = useState<any>({
    years: [],
    cities: [],
    sources: [],
    tags: []
  });

  const [activeMetricTab, setActiveMetricTab] = useState('overview');

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const foundCampaign = mockCampaigns.find(c => c.id === id);
    if (foundCampaign) {
      setCampaign(foundCampaign);
      
      // Initialize with first year selected if available
      if (foundCampaign.years.length > 0) {
        setSelectedYear(foundCampaign.years[0].id);
      }
    }
  }, [id]);

  useEffect(() => {
    if (!campaign) return;
    
    // Filter data based on selections
    const years = campaign.years;
    
    let cities: City[] = [];
    let sources: Source[] = [];
    let tags: AdTag[] = [];
    
    if (selectedYear) {
      const year = years.find(y => y.id === selectedYear);
      if (year) {
        cities = year.cities;
        
        if (selectedCity) {
          const city = cities.find(c => c.id === selectedCity);
          if (city) {
            sources = city.sources;
            
            if (selectedSource) {
              const source = sources.find(s => s.id === selectedSource);
              if (source) {
                tags = source.adTags;
              }
            }
          }
        }
      }
    }
    
    setFilteredData({
      years,
      cities,
      sources,
      tags
    });
  }, [campaign, selectedYear, selectedCity, selectedSource]);

  const handleYearSelect = (yearId: string) => {
    setSelectedYear(yearId);
    setSelectedCity(null);
    setSelectedSource(null);
    setSelectedTag(null);
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    setSelectedSource(null);
    setSelectedTag(null);
  };

  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId);
    setSelectedTag(null);
  };

  const handleTagSelect = (tagId: string) => {
    setSelectedTag(tagId);
  };

  const handleDateRangeSelect = (range: '7d' | '30d' | '90d' | 'all') => {
    setSelectedDateRange(range);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'inactive':
        return 'bg-slate-100 text-slate-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  // Generate mock data for charts based on date range
  const generateChartData = () => {
    let days: number;
    switch (selectedDateRange) {
      case '7d':
        days = 7;
        break;
      case '30d':
        days = 30;
        break;
      case '90d':
        days = 90;
        break;
      default:
        days = 30; // Default to 30 days
    }

    return Array.from({ length: days }).map((_, i) => {
      const date = subDays(new Date(), days - i - 1);
      const formattedDate = format(date, 'dd MMM', { locale: es });
      return {
        date: formattedDate,
        impressions: Math.floor(Math.random() * 10000),
        clicks: Math.floor(Math.random() * 1000),
        conversions: Math.floor(Math.random() * 100),
        spend: Math.floor(Math.random() * 300),
        cpa: Math.floor(Math.random() * 50) + 5,
        roi: Math.floor(Math.random() * 300) + 100
      };
    });
  };

  const chartData = generateChartData();

  // Generate source distribution data for pie chart
  const generateSourceDistribution = () => {
    const sources = ['Facebook', 'Instagram', 'Google', 'TikTok', 'Other'];
    return sources.map(source => ({
      name: source,
      value: Math.floor(Math.random() * 100) + 10
    }));
  };

  const sourceDistribution = generateSourceDistribution();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'];

  // Generate conversion funnel data
  const generateFunnelData = () => {
    const impressions = Math.floor(Math.random() * 100000) + 50000;
    const clicks = Math.floor(impressions * (Math.random() * 0.1 + 0.05));
    const leads = Math.floor(clicks * (Math.random() * 0.3 + 0.1));
    const customers = Math.floor(leads * (Math.random() * 0.2 + 0.05));
    
    return [
      { name: 'Impresiones', value: impressions },
      { name: 'Clicks', value: clicks },
      { name: 'Leads', value: leads },
      { name: 'Clientes', value: customers }
    ];
  };

  const funnelData = generateFunnelData();

  if (!campaign) {
    return (
      <CampaignLayout>
        <div className="flex justify-center items-center h-[400px]">
          <p>Cargando campaña...</p>
        </div>
      </CampaignLayout>
    );
  }

  // Calculate total stats based on current filters
  const totalStats = {
    impressions: chartData.reduce((sum, item) => sum + item.impressions, 0),
    clicks: chartData.reduce((sum, item) => sum + item.clicks, 0),
    conversions: chartData.reduce((sum, item) => sum + item.conversions, 0),
    spend: chartData.reduce((sum, item) => sum + item.spend, 0),
    leads: Math.floor(chartData.reduce((sum, item) => sum + item.conversions, 0) * 0.7),
  };

  const ctr = (totalStats.clicks / totalStats.impressions) * 100;
  const conversionRate = (totalStats.conversions / totalStats.clicks) * 100;
  const cpa = totalStats.spend / totalStats.conversions;
  const roi = (totalStats.conversions * 100 - totalStats.spend) / totalStats.spend * 100;

  return (
    <CampaignLayout>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Volver a campañas
        </Link>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(campaign.status)}>
                {getStatusLabel(campaign.status)}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold">{campaign.name}</h1>
            {campaign.description && (
              <p className="text-muted-foreground mt-1">{campaign.description}</p>
            )}
          </div>
          
          {/* Date Range Selector */}
          <div className="flex items-center gap-2">
            <Button 
              variant={selectedDateRange === '7d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleDateRangeSelect('7d')}
            >
              7 días
            </Button>
            <Button 
              variant={selectedDateRange === '30d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleDateRangeSelect('30d')}
            >
              30 días
            </Button>
            <Button 
              variant={selectedDateRange === '90d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleDateRangeSelect('90d')}
            >
              90 días
            </Button>
            <Button 
              variant={selectedDateRange === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleDateRangeSelect('all')}
            >
              Todo
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Impresiones</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{totalStats.impressions.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Clicks</p>
              <Target className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">CTR</p>
              <BarChartIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{ctr.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">Leads</p>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">{totalStats.leads.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 flex-nowrap">
        <Button 
          variant={activeFilter === 'date' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('date')}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Fecha
        </Button>
        <Button 
          variant={activeFilter === 'year' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('year')}
          className="flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Año
        </Button>
        <Button 
          variant={activeFilter === 'city' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('city')}
          className="flex items-center gap-2"
          disabled={!selectedYear}
        >
          <MapPin className="h-4 w-4" />
          Ubicación
        </Button>
        <Button 
          variant={activeFilter === 'source' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('source')}
          className="flex items-center gap-2"
          disabled={!selectedCity}
        >
          <Globe className="h-4 w-4" />
          Fuente
        </Button>
        <Button 
          variant={activeFilter === 'tag' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveFilter('tag')}
          className="flex items-center gap-2"
          disabled={!selectedSource}
        >
          <Tag className="h-4 w-4" />
          Tag
        </Button>
      </div>

      {/* Selected Filters Display */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedYear && (
          <Badge variant="outline" className="bg-muted flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {filteredData.years.find((y: Year) => y.id === selectedYear)?.year}
          </Badge>
        )}
        {selectedCity && (
          <Badge variant="outline" className="bg-muted flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {filteredData.cities.find((c: City) => c.id === selectedCity)?.name}
          </Badge>
        )}
        {selectedSource && (
          <Badge variant="outline" className="bg-muted flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {filteredData.sources.find((s: Source) => s.id === selectedSource)?.name}
          </Badge>
        )}
        {selectedTag && (
          <Badge variant="outline" className="bg-muted flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {filteredData.tags.find((t: AdTag) => t.id === selectedTag)?.name}
          </Badge>
        )}
      </div>

      {/* Filter Items */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {activeFilter === 'date' && 'Seleccionar Rango de Fechas'}
            {activeFilter === 'year' && 'Seleccionar Año'}
            {activeFilter === 'city' && 'Seleccionar Ubicación'}
            {activeFilter === 'source' && 'Seleccionar Fuente'}
            {activeFilter === 'tag' && 'Seleccionar Tag'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeFilter === 'date' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Button
                variant={selectedDateRange === '7d' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => handleDateRangeSelect('7d')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Últimos 7 días
              </Button>
              <Button
                variant={selectedDateRange === '30d' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => handleDateRangeSelect('30d')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Últimos 30 días
              </Button>
              <Button
                variant={selectedDateRange === '90d' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => handleDateRangeSelect('90d')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Últimos 90 días
              </Button>
              <Button
                variant={selectedDateRange === 'all' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => handleDateRangeSelect('all')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Todo el tiempo
              </Button>
            </div>
          )}

          {activeFilter === 'year' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredData.years.map((year: Year) => (
                <Button
                  key={year.id}
                  variant={selectedYear === year.id ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => handleYearSelect(year.id)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {year.year}
                </Button>
              ))}
            </div>
          )}

          {activeFilter === 'city' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredData.cities.map((city: City) => (
                <Button
                  key={city.id}
                  variant={selectedCity === city.id ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => handleCitySelect(city.id)}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {city.name}
                </Button>
              ))}
            </div>
          )}

          {activeFilter === 'source' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredData.sources.map((source: Source) => (
                <Button
                  key={source.id}
                  variant={selectedSource === source.id ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => handleSourceSelect(source.id)}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  {source.name}
                </Button>
              ))}
            </div>
          )}

          {activeFilter === 'tag' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {filteredData.tags.map((tag: AdTag) => (
                <Button
                  key={tag.id}
                  variant={selectedTag === tag.id ? 'default' : 'outline'}
                  className="justify-start"
                  onClick={() => handleTagSelect(tag.id)}
                >
                  <Tag className="mr-2 h-4 w-4" />
                  {tag.name}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Metrics Tabs */}
      <Tabs defaultValue="overview" value={activeMetricTab} onValueChange={setActiveMetricTab} className="w-full">
        <TabsList className="w-full grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          <TabsTrigger value="sources">Distribución</TabsTrigger>
          <TabsTrigger value="conversion">Conversión</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Métricas de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Impresiones</p>
                  <p className="text-2xl font-bold">{totalStats.impressions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clicks</p>
                  <p className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversiones</p>
                  <p className="text-2xl font-bold">{totalStats.conversions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leads</p>
                  <p className="text-2xl font-bold">{totalStats.leads.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CTR</p>
                  <p className="text-2xl font-bold">{ctr.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tasa de Conversión</p>
                  <p className="text-2xl font-bold">{conversionRate.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPA</p>
                  <p className="text-2xl font-bold">${cpa.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-2xl font-bold">{roi.toFixed(2)}%</p>
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="impressions" name="Impresiones" stroke="#8884d8" />
                    <Line type="monotone" dataKey="clicks" name="Clicks" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="conversions" name="Conversiones" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Métricas de Rendimiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Gasto Total</p>
                  <p className="text-2xl font-bold">${totalStats.spend.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CPA</p>
                  <p className="text-2xl font-bold">${cpa.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">ROI</p>
                  <p className="text-2xl font-bold">{roi.toFixed(2)}%</p>
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="spend" name="Gasto ($)" stroke="#8884d8" />
                    <Line yAxisId="right" type="monotone" dataKey="cpa" name="CPA ($)" stroke="#82ca9d" />
                    <Line yAxisId="right" type="monotone" dataKey="roi" name="ROI (%)" stroke="#ff7300" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Distribución por Fuentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} impresiones`, 'Volumen']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Embudos de Conversión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={funnelData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Cantidad']} />
                    <Bar dataKey="value" fill="#8884d8">
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Impresiones a Clicks</p>
                  <p className="text-xl font-bold">{ctr.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Clicks a Leads</p>
                  <p className="text-xl font-bold">
                    {((funnelData[2].value / funnelData[1].value) * 100).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Leads a Clientes</p>
                  <p className="text-xl font-bold">
                    {((funnelData[3].value / funnelData[2].value) * 100).toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tasa de Conversión</p>
                  <p className="text-xl font-bold">
                    {((funnelData[3].value / funnelData[0].value) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Item Details */}
      {selectedSource && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Detalles de la fuente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Ad Tags</h3>
                <div className="space-y-2">
                  {filteredData.sources
                    .find((s: Source) => s.id === selectedSource)?.adTags
                    .map((tag: any) => (
                      <Badge key={tag.id} variant="outline" className="mr-2">
                        {tag.name} - {tag.type}
                      </Badge>
                    ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Estadísticas</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Impresiones</p>
                    <p className="font-bold">{Math.floor(Math.random() * 50000).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Clicks</p>
                    <p className="font-bold">{Math.floor(Math.random() * 5000).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CTR</p>
                    <p className="font-bold">{(Math.random() * 10).toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Conv.</p>
                    <p className="font-bold">{Math.floor(Math.random() * 500).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CPA</p>
                    <p className="font-bold">${(Math.random() * 50 + 5).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ROI</p>
                    <p className="font-bold">{(Math.random() * 200 + 50).toFixed(2)}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </CampaignLayout>
  );
};

export default CampaignDetail;
