
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CampaignLayout } from '@/components/CampaignLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Filter, Calendar, MapPin, Globe } from "lucide-react";
import { mockCampaigns } from '@/data/mockCampaigns';
import { Campaign, Year, City, Source, FilterType } from '@/types/campaign.types';

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('year');
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  
  const [filteredData, setFilteredData] = useState<any>({
    years: [],
    cities: [],
    sources: []
  });

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
    
    if (selectedYear) {
      const year = years.find(y => y.id === selectedYear);
      if (year) {
        cities = year.cities;
        
        if (selectedCity) {
          const city = cities.find(c => c.id === selectedCity);
          if (city) {
            sources = city.sources;
          }
        }
      }
    }
    
    setFilteredData({
      years,
      cities,
      sources
    });
  }, [campaign, selectedYear, selectedCity, selectedSource]);

  const handleYearSelect = (yearId: string) => {
    setSelectedYear(yearId);
    setSelectedCity(null);
    setSelectedSource(null);
  };

  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
    setSelectedSource(null);
  };

  const handleSourceSelect = (sourceId: string) => {
    setSelectedSource(sourceId);
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

  // Generate mock data for charts
  const generateChartData = () => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months.map(month => ({
      name: month,
      impressions: Math.floor(Math.random() * 100000),
      clicks: Math.floor(Math.random() * 10000),
      conversions: Math.floor(Math.random() * 1000),
      ctr: Math.random() * 10
    }));
  };

  const chartData = generateChartData();

  if (!campaign) {
    return (
      <CampaignLayout>
        <div className="flex justify-center items-center h-[400px]">
          <p>Cargando campaña...</p>
        </div>
      </CampaignLayout>
    );
  }

  // Calculate total stats
  const totalStats = {
    impressions: chartData.reduce((sum, item) => sum + item.impressions, 0),
    clicks: chartData.reduce((sum, item) => sum + item.clicks, 0),
    conversions: chartData.reduce((sum, item) => sum + item.conversions, 0),
    spend: Math.floor(Math.random() * 10000) / 100,
  };

  const ctr = (totalStats.clicks / totalStats.impressions) * 100;
  const conversionRate = (totalStats.conversions / totalStats.clicks) * 100;

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
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Impresiones</p>
            <p className="text-2xl font-bold">{totalStats.impressions.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Clicks</p>
            <p className="text-2xl font-bold">{totalStats.clicks.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">CTR</p>
            <p className="text-2xl font-bold">{ctr.toFixed(2)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Conversiones</p>
            <p className="text-2xl font-bold">{totalStats.conversions.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Rendimiento de la campaña</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" />
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

      {/* Filter Controls */}
      <div className="flex gap-2 mb-4">
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
          Ciudad
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
      </div>

      {/* Filter Items */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            {activeFilter === 'year' && 'Seleccionar Año'}
            {activeFilter === 'city' && 'Seleccionar Ciudad'}
            {activeFilter === 'source' && 'Seleccionar Fuente'}
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

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
                        {tag.name}
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
