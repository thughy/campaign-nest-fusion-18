
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

// Define available cities and platforms for selection
const availableCities = [
  "Los Angeles",
  "New York",
  "Miami",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas"
];

const availablePlatforms = [
  "Facebook",
  "Instagram",
  "TikTok",
  "YouTube",
  "Google",
  "Twitter",
  "Pinterest",
  "LinkedIn",
  "Snapchat"
];

const legalLines = [
  "Visa Turista",
  "Visa Estudiante",
  "Visa Trabajo",
  "Visa Familiar",
  "Visa Residencia"
];

// Location type for our form
interface LocationItem {
  id: string;
  city: string;
  selectedPlatforms: string[];
  expanded: boolean;
}

interface NewCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCampaignModal({ open, onOpenChange }: NewCampaignModalProps) {
  const [campaignName, setCampaignName] = useState("");
  const [legalLine, setLegalLine] = useState("");
  const [description, setDescription] = useState("");
  const [neverEnds, setNeverEnds] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [locations, setLocations] = useState<LocationItem[]>([
    {
      id: `loc-${Date.now()}`,
      city: "",
      selectedPlatforms: [],
      expanded: true
    },
  ]);

  // Add new location
  const addLocation = () => {
    // Collapse previous locations if they have data
    const updatedLocations = locations.map(loc => ({
      ...loc,
      expanded: !loc.city || loc.selectedPlatforms.length === 0
    }));
    
    setLocations([
      ...updatedLocations,
      {
        id: `loc-${Date.now()}`,
        city: "",
        selectedPlatforms: [],
        expanded: true
      },
    ]);
  };

  // Toggle location expanded state
  const toggleLocationExpand = (locationId: string) => {
    setLocations(
      locations.map(loc => 
        loc.id === locationId ? { ...loc, expanded: !loc.expanded } : loc
      )
    );
  };

  // Remove location
  const removeLocation = (locationId: string) => {
    if (locations.length === 1) return; // Keep at least one location
    setLocations(locations.filter((loc) => loc.id !== locationId));
  };

  // Update city for a location
  const updateCity = (locationId: string, city: string) => {
    setLocations(
      locations.map((loc) =>
        loc.id === locationId ? { ...loc, city } : loc
      )
    );
  };

  // Update platforms for a location
  const updatePlatforms = (locationId: string, platform: string) => {
    setLocations(
      locations.map((loc) => {
        if (loc.id === locationId) {
          const platforms = loc.selectedPlatforms.includes(platform)
            ? loc.selectedPlatforms.filter(p => p !== platform)
            : [...loc.selectedPlatforms, platform];
          return { ...loc, selectedPlatforms: platforms };
        }
        return loc;
      })
    );
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!campaignName.trim()) {
      toast({
        title: "Error",
        description: "El nombre de la campaña es obligatorio",
        variant: "destructive",
      });
      return;
    }
    
    if (!legalLine) {
      toast({
        title: "Error",
        description: "Debe seleccionar un tipo de visa",
        variant: "destructive",
      });
      return;
    }
    
    if (!neverEnds && (!dateRange.from || !dateRange.to)) {
      toast({
        title: "Error",
        description: "El rango de fechas es obligatorio si la campaña no es permanente",
        variant: "destructive",
      });
      return;
    }
    
    // Check if all locations have cities selected
    const invalidLocation = locations.find(loc => !loc.city);
    if (invalidLocation) {
      toast({
        title: "Error",
        description: "Todas las ubicaciones deben tener una ciudad seleccionada",
        variant: "destructive",
      });
      return;
    }
    
    // Check if all locations have at least one platform selected
    const invalidSource = locations.find(loc => 
      loc.selectedPlatforms.length === 0
    );
    if (invalidSource) {
      toast({
        title: "Error",
        description: "Todas las ubicaciones deben tener al menos una plataforma seleccionada",
        variant: "destructive",
      });
      return;
    }

    // Create new campaign object
    const newCampaign = {
      id: `campaign-${Date.now()}`,
      name: campaignName,
      description: description,
      legalLine: legalLine,
      neverEnds: neverEnds,
      status: 'scheduled' as const,
      created: new Date().toISOString(),
      publishDate: neverEnds ? null : dateRange.from?.toISOString(),
      endDate: neverEnds ? null : dateRange.to?.toISOString(),
      createdBy: "Usuario Actual", // In a real app, get this from auth
      years: [
        {
          id: `year-${new Date().getFullYear()}`,
          year: new Date().getFullYear(),
          cities: locations.map(loc => ({
            id: `city-${Date.now()}-${loc.city.replace(/\s+/g, '-').toLowerCase()}`,
            name: loc.city,
            sources: loc.selectedPlatforms.map(platform => ({
              id: `source-${Date.now()}-${platform.replace(/\s+/g, '-').toLowerCase()}`,
              name: platform,
              platform: platform.toLowerCase(),
              adTags: [
                {
                  id: `tag-${Date.now()}`,
                  name: "Ad - Tag",
                  type: "conversion"
                }
              ]
            }))
          }))
        }
      ],
      stats: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        ctr: 0,
        conversionRate: 0,
        spend: 0,
        leadsRegistered: 0
      }
    };

    // Here you would typically dispatch this to your state management or API
    console.log("New Campaign:", newCampaign);
    
    // Show success toast
    toast({
      title: "Campaña creada",
      description: `La campaña "${campaignName}" ha sido creada exitosamente`,
    });

    // Reset form and close modal
    setCampaignName("");
    setLegalLine("");
    setDescription("");
    setNeverEnds(false);
    setDateRange({ from: undefined, to: undefined });
    setLocations([
      {
        id: `loc-${Date.now()}`,
        city: "",
        selectedPlatforms: [],
        expanded: true
      },
    ]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full h-[90vh] p-0 overflow-hidden">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle className="text-xl">Nueva Campaña</DialogTitle>
            <DialogDescription>
              Completa los detalles para crear una nueva campaña de marketing.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="flex flex-1 overflow-hidden">
            {/* Left Panel - Campaign Details */}
            <div className="w-full lg:w-[30%] p-6 border-r overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Nombre de la Campaña</Label>
                  <Input
                    id="campaign-name"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="Ej: Campaña de Verano 2024"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legal-line">Legal Line (Tipo de Visa)</Label>
                  <Select
                    value={legalLine}
                    onValueChange={setLegalLine}
                  >
                    <SelectTrigger id="legal-line">
                      <SelectValue placeholder="Seleccionar Tipo de Visa" />
                    </SelectTrigger>
                    <SelectContent>
                      {legalLines.map((line) => (
                        <SelectItem key={line} value={line}>
                          {line}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción de la Campaña</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe el objetivo y detalles de esta campaña..."
                    className="min-h-[120px]"
                  />
                </div>
              </div>
            </div>

            {/* Right Panel - Locations and Dates */}
            <div className="w-full lg:w-[70%] p-6 space-y-6 overflow-y-auto">
              {/* Date Range with Toggle */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Duración de la Campaña</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="never-ends" className="text-sm cursor-pointer">
                      Campaña Permanente
                    </Label>
                    <Switch
                      id="never-ends"
                      checked={neverEnds}
                      onCheckedChange={setNeverEnds}
                    />
                  </div>
                </div>

                {!neverEnds && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal w-full",
                            !dateRange.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.from ? (
                            format(dateRange.from, "PPP")
                          ) : (
                            <span>Fecha de inicio</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) =>
                            setDateRange({ ...dateRange, from: date })
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal w-full",
                            !dateRange.to && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange.to ? (
                            format(dateRange.to, "PPP")
                          ) : (
                            <span>Fecha final</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange({ ...dateRange, to: date })}
                          disabled={(date) =>
                            date < new Date() ||
                            (dateRange.from ? date < dateRange.from : false)
                          }
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              {/* Locations Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-lg font-medium">Ubicaciones</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addLocation}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Agregar Ubicación</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {locations.map((location, locIndex) => {
                    const isConfigured = location.city && location.selectedPlatforms.length > 0;
                    return (
                      <Card key={location.id} className="overflow-hidden transition-all duration-200">
                        <div 
                          className={cn(
                            "flex justify-between items-center p-3 cursor-pointer",
                            isConfigured && !location.expanded ? "border-b" : ""
                          )}
                          onClick={() => isConfigured && toggleLocationExpand(location.id)}
                        >
                          <div className="flex items-center">
                            <span className="font-medium text-sm">
                              Ubicación {locIndex + 1}: 
                            </span>
                            {location.city && (
                              <span className="ml-2 text-sm">
                                {location.city} 
                                {location.selectedPlatforms.length > 0 && (
                                  <span className="text-muted-foreground ml-2">
                                    ({location.selectedPlatforms.length} plataformas)
                                  </span>
                                )}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            {locations.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeLocation(location.id);
                                }}
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                            {isConfigured && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleLocationExpand(location.id);
                                }}
                                className="h-7 w-7 p-0"
                              >
                                {location.expanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                        
                        {location.expanded && (
                          <CardContent className="p-3 pt-3">
                            <div className="space-y-4">
                              {/* City Selection */}
                              <div className="space-y-2">
                                <Label htmlFor={`city-${location.id}`}>Ciudad</Label>
                                <Select
                                  value={location.city}
                                  onValueChange={(value) => updateCity(location.id, value)}
                                >
                                  <SelectTrigger id={`city-${location.id}`}>
                                    <SelectValue placeholder="Seleccionar Ciudad" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableCities.map((city) => (
                                      <SelectItem key={city} value={city}>
                                        {city}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Multi-select Platforms */}
                              <div className="space-y-2">
                                <Label>Plataformas</Label>
                                <div className="flex flex-wrap gap-2">
                                  {availablePlatforms.map((platform) => (
                                    <Button
                                      key={platform}
                                      type="button"
                                      size="sm"
                                      variant={location.selectedPlatforms.includes(platform) ? "default" : "outline"}
                                      onClick={() => updatePlatforms(location.id, platform)}
                                      className="transition-colors"
                                    >
                                      {platform}
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </form>
          
          <DialogFooter className="px-6 py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>Crear Campaña</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
