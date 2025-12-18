import { useState, useMemo, lazy, Suspense } from "react";
import { ClientOnly } from "vite-react-ssg";
import { Button } from "@/components/ui/button";
import { ContactForm } from "./ContactForm";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Plane,
  Train,
  Car,
  GraduationCap,
  ShoppingBag,
  Building,
  Hospital,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Lazy load map component to avoid SSR issues
const MapComponent = lazy(() => import("./MapComponent"));

// Godrej Woods Thanisandra coordinates
const GODREJ_WOODS_COORDS: [number, number] = [13.107796452469358, 77.63383147471383];

interface Location {
  id: number;
  name: string;
  category: string;
  distance: string;
  coords: [number, number];
  icon: any;
  color: string;
}

export const LocationSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const locations: Location[] = [
    // Transportation
    { id: 1, name: "Kempegowda International Airport", category: "Transportation", distance: "25–30 min", coords: [13.1986, 77.7066], icon: Plane, color: "#B9105E" },
    { id: 2, name: "Thanisandra Railway Station", category: "Transportation", distance: "5 min", coords: [13.0528, 77.6195], icon: Train, color: "#B9105E" },
    { id: 3, name: "Outer Ring Road", category: "Transportation", distance: "Access within minutes", coords: [13.0520, 77.6350], icon: Car, color: "#B9105E" },
    { id: 4, name: "Hebbal Junction", category: "Transportation", distance: "15 min", coords: [13.0358, 77.5970], icon: Car, color: "#B9105E" },

    // Work
    { id: 5, name: "Manyata Tech Park", category: "Work", distance: "10 min", coords: [13.0458, 77.6197], icon: Building, color: "#3777C5" },
    { id: 6, name: "BCM Vertex", category: "Work", distance: "2.3 km", coords: [13.0620, 77.6350], icon: Building, color: "#3777C5" },

    // Education
    { id: 7, name: "REVA College", category: "Education", distance: "On New Airport Road", coords: [13.0650, 77.6280], icon: GraduationCap, color: "#56A7E0" },
    { id: 8, name: "Vidyashilp Academy", category: "Education", distance: "10-15 min", coords: [13.0380, 77.6380], icon: GraduationCap, color: "#56A7E0" },

    // Healthcare
    { id: 9, name: "Columbia Asia Hospital", category: "Healthcare", distance: "10–15 min", coords: [13.0470, 77.5950], icon: Hospital, color: "#E85D75" },
    { id: 10, name: "Aster CMI Hospital", category: "Healthcare", distance: "10–15 min", coords: [13.0280, 77.6380], icon: Hospital, color: "#E85D75" },

    // Shopping
    { id: 11, name: "Phoenix Market City", category: "Shopping", distance: "20 km", coords: [12.9952, 77.6980], icon: ShoppingBag, color: "#FFA726" },
    { id: 12, name: "Local Markets", category: "Shopping", distance: "Walkable", coords: [13.0580, 77.6195], icon: ShoppingBag, color: "#FFA726" },

    // Neighborhoods
    { id: 13, name: "Nagawara", category: "Neighborhoods", distance: "5–10 min", coords: [13.0420, 77.6090], icon: MapPin, color: "#9C27B0" },
    { id: 14, name: "Kammanahalli", category: "Neighborhoods", distance: "5–10 min", coords: [13.0150, 77.6380], icon: MapPin, color: "#9C27B0" },
  ];

  const categories = ["All", "Transportation", "Work", "Education", "Healthcare", "Shopping", "Neighborhoods"];

  const filteredLocations = useMemo(() => {
    return selectedCategory === "All"
      ? locations
      : locations.filter(loc => loc.category === selectedCategory);
  }, [selectedCategory, locations]);

  return (
    <>
      <section id="location-advantages" ref={ref} className={`pt-16 pb-16 bg-[#F6F8FB] transition-opacity duration-700 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-primary">Godrej Thanisandra</span>
              <br />Location
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover the prime location benefits of Godrej Thanisandra, offering unmatched connectivity and convenience in North Bangalore.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Map and Locations Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Interactive Map */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[500px] lg:h-[600px]">
              <ClientOnly fallback={<div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>}>
                {() => (
                  <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>}>
                    <MapComponent
                      center={GODREJ_WOODS_COORDS}
                      filteredLocations={filteredLocations}
                      selectedLocationId={selectedLocationId}
                    />
                  </Suspense>
                )}
              </ClientOnly>
            </div>

            {/* Categorized Locations List */}
            <div className="space-y-4 overflow-y-auto max-h-[500px] lg:max-h-[600px] pr-2 custom-scrollbar">
              {Object.entries(
                filteredLocations.reduce((acc, loc) => {
                  if (!acc[loc.category]) acc[loc.category] = [];
                  acc[loc.category].push(loc);
                  return acc;
                }, {} as Record<string, Location[]>)
              ).map(([category, locs]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-primary flex items-center gap-2">
                    {category}
                    <Badge variant="secondary">{locs.length}</Badge>
                  </h3>
                  <div className="space-y-3">
                    {locs.map((loc) => {
                      const Icon = loc.icon;
                      return (
                        <div
                          key={loc.id}
                          onClick={() => setSelectedLocationId(loc.id)}
                          className="flex items-start gap-3 bg-white rounded-xl shadow-md p-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                        >
                          <div
                            className="w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0"
                            style={{ background: loc.color }}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-base mb-1 text-gray-800">{loc.name}</h4>
                            <p className="text-gray-600 text-sm">{loc.distance}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Benefits Summary */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Why <span className="text-primary">Thanisandra</span> is the Perfect Choice
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Thanisandra offers the perfect blend of urban convenience and peaceful living, making it one of North Bangalore's most sought-after residential destinations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-primary mb-2">25 min</div>
                <div className="text-sm text-muted-foreground">To Airport</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-secondary mb-2">15 min</div>
                <div className="text-sm text-muted-foreground">To IT Hubs</div>
              </div>
              <div className="text-center p-6 bg-background rounded-xl shadow-sm">
                <div className="text-2xl font-bold text-accent mb-2">5 min</div>
                <div className="text-sm text-muted-foreground">To Schools & Hospitals</div>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="default"
                size="lg"
                className="gap-2 !bg-[#B9105E] !text-white !border-none hover:!bg-[#a00d4e] !text-[24px] !h-[68px]"
                onClick={() => setIsFormOpen(true)}
              >
                Book Your Dream Home Now
              </Button>
            </div>
          </div>
        </div>
      </section>
      <ContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Location - Book Your Dream Home"
      />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #B9105E;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a00d4e;
        }
        .leaflet-container {
          font-family: inherit;
        }
        .custom-marker {
          background: transparent;
          border: none;
        }
      `}</style>
    </>
  );
};