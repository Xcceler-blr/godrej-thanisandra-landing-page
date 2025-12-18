import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { Badge } from "@/components/ui/badge";
import L from "leaflet";
import "../lib/leaflet-icons";

interface Location {
    id: number;
    name: string;
    category: string;
    distance: string;
    coords: [number, number];
    icon: any;
    color: string;
}

interface MapComponentProps {
    center: [number, number];
    filteredLocations: Location[];
    selectedLocationId?: number | null;
}

// Helper component to handle map interactions
function MapController({ selectedLocationId, locations, propertyCoords }: {
    selectedLocationId?: number | null,
    locations: Location[],
    propertyCoords: [number, number]
}) {
    const map = useMap();

    useEffect(() => {
        if (selectedLocationId) {
            const location = locations.find(loc => loc.id === selectedLocationId);
            if (location) {
                // Calculate bounds that include both property and selected location
                const bounds = L.latLngBounds([propertyCoords, location.coords]);
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13, duration: 1.5 });
            }
        }
    }, [selectedLocationId, locations, map, propertyCoords]);

    return null;
}

const createCustomIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });
};

export default function MapComponent({ center, filteredLocations, selectedLocationId }: MapComponentProps) {
    const markerRefs = useRef<{ [key: number]: L.Marker }>({});
    const [routeLine, setRouteLine] = useState<[number, number][] | null>(null);

    useEffect(() => {
        if (selectedLocationId) {
            const location = filteredLocations.find(loc => loc.id === selectedLocationId);
            if (location) {
                // Set route line from property to selected location
                setRouteLine([center, location.coords]);

                // Open popup for selected marker
                if (markerRefs.current[selectedLocationId]) {
                    setTimeout(() => {
                        markerRefs.current[selectedLocationId].openPopup();
                    }, 1600); // Delay to let map animation complete
                }
            }
        } else {
            setRouteLine(null);
        }
    }, [selectedLocationId, filteredLocations, center]);

    return (
        <MapContainer
            center={center}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController selectedLocationId={selectedLocationId} locations={filteredLocations} propertyCoords={center} />

            {/* Route line from property to selected location */}
            {routeLine && (
                <Polyline
                    positions={routeLine}
                    pathOptions={{
                        color: '#B9105E',
                        weight: 3,
                        opacity: 0.7,
                        dashArray: '10, 10'
                    }}
                />
            )}

            {/* Godrej Woods Main Marker */}
            <Marker position={center} icon={createCustomIcon('#10B981')}>
                <Popup>
                    <div className="text-center p-2">
                        <h3 className="font-bold text-lg text-primary mb-1">Godrej Woods Thanisandra</h3>
                        <p className="text-sm text-gray-600">Your Future Home</p>
                    </div>
                </Popup>
            </Marker>

            {/* Location Markers */}
            {filteredLocations.map((location) => (
                <Marker
                    key={location.id}
                    position={location.coords}
                    icon={createCustomIcon(location.color)}
                    ref={(ref) => {
                        if (ref) {
                            markerRefs.current[location.id] = ref as unknown as L.Marker;
                        }
                    }}
                    eventHandlers={{
                        add: (e) => {
                            const marker = e.target;
                            if (selectedLocationId === location.id) {
                                setTimeout(() => marker.openPopup(), 100);
                            }
                        }
                    }}
                >
                    <Popup>
                        <div className="p-2">
                            <h4 className="font-bold text-sm mb-1">{location.name}</h4>
                            <p className="text-xs text-gray-600">{location.distance}</p>
                            <Badge className="mt-1 text-xs" style={{ backgroundColor: location.color }}>
                                {location.category}
                            </Badge>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
