
import { Sidebar } from '@/components/adminInventory/utils';
import {
    LocationBreadcrumb,
    LocationPageHeader,
    LocationStatsGrid,
    LocationTable,
    TankIndicatorsGrid,
} from '@/components/adminInventory/locations';
import {
    breadcrumbItems,
    locationPageData,
    capacityData,
    skusData,
    alertsData,
    locationItems,
    tanks,
    auditInfo,
} from '@/data/locationsData';

const LocationsPage = () => {
    return (
        <Sidebar>
            <main className="flex-1 flex flex-col overflow-hidden">
                <LocationBreadcrumb items={breadcrumbItems} />
                <div className="flex-1 overflow-y-auto p-8">
                    <LocationPageHeader
                        title={locationPageData.title}
                        description={locationPageData.description}
                    />
                    <LocationStatsGrid
                        capacityUsage={capacityData.usage}
                        capacityAvailable={capacityData.available}
                        capacityIcon={capacityData.icon}
                        totalSkus={skusData.total}
                        subLocations={skusData.subLocations}
                        skusIcon={skusData.icon}
                        lowStockAlerts={alertsData.count}
                        alertsIcon={alertsData.icon}
                    />
                    <LocationTable
                        title="Distribución de Stock (STOCK_UBICACION)"
                        items={locationItems}
                        auditInfo={auditInfo}
                    />
                    <TankIndicatorsGrid title="Indicadores de Nivel del Tanque en Vivo" tanks={tanks} />
                </div>
            </main>
        </Sidebar>
    );
};

export default LocationsPage;