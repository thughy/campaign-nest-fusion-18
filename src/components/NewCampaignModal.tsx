
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { format } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

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

// Location type for our form
interface LocationItem {
  id: string;
  city: string;
  selectedPlatforms: string[];
}

interface NewCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCampaignModal({ open, onOpenChange }: NewCampaignModalProps) {
  const [campaignName, setCampaignName] = useState("");
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
    },
  ]);

  // Add new location
  const addLocation = () => {
    setLocations([
      ...locations,
      {
        id: `loc-${Date.now()}`,
        city: "",
        selectedPlatforms: [],
      },
    ]);
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
    
    if (!dateRange.from || !dateRange.to) {
      toast({
        title: "Error",
        description: "El rango de fechas es obligatorio",
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
      status: 'scheduled' as const,
      created: new Date().toISOString(),
      publishDate: dateRange.from.toISOString(),
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
    setDateRange({ from: undefined, to: undefined });
    setLocations([
      {
        id: `loc-${Date.now()}`,
        city: "",
        selectedPlatforms: [],
      },
    ]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Campaña</DialogTitle>
          <DialogDescription>
            Completa los detalles para crear una nueva campaña de marketing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Campaign Name */}
          <div className="space-y-2">
            <Label htmlFor="campaign-name">Nombre de la Campaña</Label>
            <Input
              id="campaign-name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="Ej: Campaña de Verano 2024"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Rango de Fechas</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal w-full sm:w-1/2",
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
                      "justify-start text-left font-normal w-full sm:w-1/2",
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
          </div>

          {/* Locations and Sources */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Ubicaciones y Fuentes</Label>
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

            {locations.map((location, locIndex) => (
              <div
                key={location.id}
                className="p-4 border rounded-md space-y-4 bg-card"
              >
                <div className="flex justify-between items-start">
                  <Label className="text-base font-medium">
                    Ubicación {locIndex + 1}
                  </Label>
                  {locations.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLocation(location.id)}
                      className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

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
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Crear Campaña</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </form>
