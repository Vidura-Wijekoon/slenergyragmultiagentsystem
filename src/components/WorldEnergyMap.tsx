
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Info } from 'lucide-react';

// This is a temporary approach. In a production environment,
// you would store this key in environment variables or get it from a backend API
const MAPBOX_TOKEN = "pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2tlaTJiNnN1MDBnajJ5bXR6Z2Y0NXFrdiJ9.Isdoe3cBZQmxzPLk3fAltw";

// Country data for the map (simplified for this demo)
const countryData = {
  'USA': { demand: 3.34, renewable: 21, co2: 13.68, color: '#E49B0F' },
  'Canada': { demand: 2.86, renewable: 65, co2: 15.52, color: '#E49B0F' },
  'Brazil': { demand: 0.56, renewable: 83, co2: 2.25, color: '#F0DE36' },
  'Argentina': { demand: 0.65, renewable: 30, co2: 4.61, color: '#F0DE36' },
  'United Kingdom': { demand: 0.85, renewable: 43, co2: 5.55, color: '#F0DE36' },
  'France': { demand: 1.05, renewable: 19, co2: 4.97, color: '#F0DE36' },
  'Germany': { demand: 1.25, renewable: 41, co2: 8.52, color: '#F0DE36' },
  'Norway': { demand: 2.56, renewable: 98, co2: 8.28, color: '#D2001A' },
  'Sweden': { demand: 2.12, renewable: 56, co2: 4.54, color: '#D2001A' },
  'Russia': { demand: 1.73, renewable: 18, co2: 11.44, color: '#E49B0F' },
  'China': { demand: 0.86, renewable: 28, co2: 7.38, color: '#FFFF00' },
  'India': { demand: 0.21, renewable: 38, co2: 1.91, color: '#FFFF00' },
  'Japan': { demand: 1.34, renewable: 18, co2: 8.39, color: '#F0DE36' },
  'Australia': { demand: 2.08, renewable: 24, co2: 15.22, color: '#E49B0F' },
  'South Africa': { demand: 0.81, renewable: 11, co2: 7.51, color: '#FFFF00' },
  'Sri Lanka': { demand: 0.18, renewable: 52, co2: 1.02, color: '#FFFF00' },
};

// Map modes
const mapModes = [
  { value: 'demand', label: 'Electricity Demand', unit: 'GW per million people' },
  { value: 'renewable', label: 'Renewable %', unit: 'of total energy mix' },
  { value: 'co2', label: 'CO₂ Emissions', unit: 'tons per capita annually' }
];

const WorldEnergyMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapMode, setMapMode] = useState('demand');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [mapToken, setMapToken] = useState<string>(MAPBOX_TOKEN);
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Initialize map
    mapboxgl.accessToken = mapToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 1.5,
        center: [80.7718, 7.8731], // Sri Lanka coordinates
        pitch: 45,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Disable scroll zoom for smoother experience
      map.current.scrollZoom.disable();

      // Add atmosphere and fog effects
      map.current.on('style.load', () => {
        if (!map.current) return;
        
        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });
        
        setMapLoaded(true);
        
        // Add Sri Lanka highlight
        map.current.addSource('sri-lanka', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [80.7718, 7.8731]
            },
            properties: {}
          }
        });
        
        map.current.addLayer({
          id: 'sri-lanka-pulse',
          type: 'circle',
          source: 'sri-lanka',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 0, 4, 6, 12],
            'circle-color': '#8B5CF6',
            'circle-opacity': 0.8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
          }
        });
      });

      // Rotation animation settings
      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
      function spinGlobe() {
        if (!map.current) return;
        
        const zoom = map.current.getZoom();
        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
      }

      // Event listeners for interaction
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
        spinGlobe();
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
        spinGlobe();
      });

      map.current.on('moveend', () => {
        spinGlobe();
      });

      // Start the globe spinning
      spinGlobe();
    } catch (error) {
      console.error('Error initializing map:', error);
      setShowTokenInput(true);
    }

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapToken]);

  // Handle map token update
  const handleTokenUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const token = new FormData(form).get('mapbox-token') as string;
    if (token) {
      setMapToken(token);
      setShowTokenInput(false);
    }
  };

  const getColorScale = (value: number, mode: string) => {
    let min = 0;
    let max = 1;
    
    // Set scale based on mode
    if (mode === 'demand') {
      min = 0.1;
      max = 3.5;
    } else if (mode === 'renewable') {
      min = 10;
      max = 100;
    } else if (mode === 'co2') {
      min = 1;
      max = 16;
    }
    
    // Normalize the value
    const normalized = Math.max(0, Math.min(1, (value - min) / (max - min)));
    
    // Color scale from yellow to orange to red
    const colors = ['#FFFF00', '#FFC300', '#FF9500', '#FF5733', '#C70039', '#900C3F', '#581845'];
    const colorIndex = Math.floor(normalized * (colors.length - 1));
    return colors[colorIndex];
  };

  const formatValue = (value: number, mode: string) => {
    if (mode === 'renewable') {
      return `${value}%`;
    } else if (mode === 'co2') {
      return `${value} tons`;
    }
    return value.toFixed(2);
  };

  const currentMode = mapModes.find(m => m.value === mapMode) || mapModes[0];

  return (
    <div className="w-full py-8 bg-gradient-to-b from-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Global Energy Map
          </h2>
          <p className="mt-2 text-gray-600">
            Explore and compare energy metrics across different countries
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="w-full h-[500px] shadow-md overflow-hidden">
              {showTokenInput ? (
                <div className="h-full flex flex-col items-center justify-center p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-medium">Map Token Required</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Please provide a valid Mapbox token to display the map
                    </p>
                  </div>
                  <form onSubmit={handleTokenUpdate} className="w-full max-w-md">
                    <input 
                      type="text" 
                      name="mapbox-token"
                      placeholder="Enter your Mapbox token"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                    />
                    <Button type="submit" className="w-full">
                      Update Token
                    </Button>
                  </form>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>You can get a token from <a href="https://www.mapbox.com/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">mapbox.com</a></p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0" ref={mapContainer} />
                  <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
                    <Tabs value={mapMode} onValueChange={setMapMode} className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                      <TabsList className="grid grid-cols-3">
                        {mapModes.map(mode => (
                          <TabsTrigger key={mode.value} value={mode.value}>
                            {mode.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-2 rounded shadow-sm text-xs">
                    <div className="flex items-center">
                      <div className="font-medium mr-2">{currentMode.label} ({currentMode.unit})</div>
                      <Info className="w-3 h-3 text-gray-500" />
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="w-full h-2 rounded bg-gradient-to-r from-yellow-300 via-orange-500 to-red-800"></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
          
          <div>
            <Card className="h-full shadow-md">
              <CardHeader>
                <CardTitle>Countries Comparison</CardTitle>
                <CardDescription>
                  View and compare energy metrics for different countries
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!mapLoaded ? (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Selected Country Data</h3>
                        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
                          <CardContent className="p-4">
                            {selectedCountry ? (
                              <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">Country</span>
                                  <span className="font-medium">{selectedCountry}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">Electricity Demand</span>
                                  <span className="font-medium">{countryData[selectedCountry as keyof typeof countryData]?.demand} GW/M</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">Renewable Energy</span>
                                  <span className="font-medium">{countryData[selectedCountry as keyof typeof countryData]?.renewable}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500">CO₂ Emissions</span>
                                  <span className="font-medium">{countryData[selectedCountry as keyof typeof countryData]?.co2} tons</span>
                                </div>
                              </div>
                            ) : (
                              <div className="py-4 text-center text-gray-500">
                                <p>Select a country on the map to view its data</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Sri Lanka Comparison</h3>
                        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0">
                          <CardContent className="p-4">
                            <div className="space-y-3 pt-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Electricity Demand</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">0.18 GW/M</span>
                                  {selectedCountry && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100">
                                      {(0.18 / countryData[selectedCountry as keyof typeof countryData]?.demand * 100).toFixed(0)}% of {selectedCountry}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Renewable Energy</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">52%</span>
                                  {selectedCountry && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100">
                                      {(52 / countryData[selectedCountry as keyof typeof countryData]?.renewable * 100).toFixed(0)}% of {selectedCountry}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">CO₂ Emissions</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">1.02 tons</span>
                                  {selectedCountry && (
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100">
                                      {(1.02 / countryData[selectedCountry as keyof typeof countryData]?.co2 * 100).toFixed(0)}% of {selectedCountry}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Global Rankings</h3>
                      <div className="text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span>1. Norway</span>
                          <span className="font-medium">98% Renewable</span>
                        </div>
                        <div className="flex justify-between">
                          <span>2. Brazil</span>
                          <span className="font-medium">83% Renewable</span>
                        </div>
                        <div className="flex justify-between">
                          <span>3. Sweden</span>
                          <span className="font-medium">56% Renewable</span>
                        </div>
                        <div className="flex justify-between">
                          <span>4. Sri Lanka</span>
                          <span className="font-medium">52% Renewable</span>
                        </div>
                        <div className="flex justify-between">
                          <span>5. United Kingdom</span>
                          <span className="font-medium">43% Renewable</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldEnergyMap;
