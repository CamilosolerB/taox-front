'use client';

import { ProviderCard } from './ProviderCard';
import type { ProviderItem } from '@/data/providersData';

export interface ProvidersGridProps {
  providers: ProviderItem[];
  onViewContracts?: (id: string) => void;
  onMore?: (id: string) => void;
}

export const ProvidersGrid = ({ providers, onViewContracts, onMore }: ProvidersGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          onViewContracts={onViewContracts}
          onMore={onMore}
        />
      ))}
    </div>
  );
};
