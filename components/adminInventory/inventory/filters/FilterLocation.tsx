'use client';

interface FilterLocationProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
}

export const FilterLocation = ({
  locations,
  selectedLocation,
  onLocationChange,
}: FilterLocationProps) => {
  return (
    <div>
      <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#617589]">
        Ubicación
      </h3>
      <select
        className="w-full text-sm rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 focus:ring-primary"
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
};
