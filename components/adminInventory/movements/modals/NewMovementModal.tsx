'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { useMovements } from '@/hooks/useMovements';
import { useInventory } from '@/hooks/useInventory';
import { useProcesses } from '@/hooks/useProcesses';
import { SearchSelect, type SearchSelectOption } from './SearchSelect';

export interface NewMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
}

export const NewMovementModal = ({ isOpen, onClose, companyId }: NewMovementModalProps) => {
  const [productId, setProductId] = useState<string | number>('');
  const [originProcessId, setOriginProcessId] = useState<string | number>('');
  const [destinationProcessId, setDestinationProcessId] = useState<string | number>('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');

  const { useCreateMovement } = useMovements(companyId);
  const { mutate: createMovement, isPending } = useCreateMovement();

  const { useGetProducts } = useInventory(companyId);
  const { data: products = [], isLoading: isLoadingProducts } = useGetProducts();

  const { useGetAllProcesses } = useProcesses(companyId);
  const { data: processes = [], isLoading: isLoadingProcesses } = useGetAllProcesses();

  // Convert products to SearchSelect options
  const productOptions: SearchSelectOption[] = useMemo(() => {
    return products.map((product) => ({
      id: product.id_product,
      label: product.name,
      description: product.id_product,
    }));
  }, [products]);

  // Convert processes to SearchSelect options
  const processOptions: SearchSelectOption[] = useMemo(() => {
    return processes.map((process) => ({
      id: process.id_proceso,
      label: process.nombre,
      description: `ID: ${process.id_proceso}`,
    }));
  }, [processes]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId || !originProcessId || !destinationProcessId || !quantity) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    const selectedProduct = products.find(p => p.id_product === productId);
    if (!selectedProduct) {
      alert('Producto no válido');
      return;
    }

    createMovement(
      {
        codigo_producto: String(selectedProduct.id_product),
        id_proceso_origen: String(originProcessId),
        id_proceso_destino: String(destinationProcessId),
        cantidad: parseFloat(quantity),
        notas: notes || null,
        id_empresa: companyId,
      },
      {
        onSuccess: () => {
          alert('Movimiento registrado exitosamente');
          onClose();
          // Clear form
          setProductId('');
          setOriginProcessId('');
          setDestinationProcessId('');
          setQuantity('');
          setNotes('');
        },
        onError: (error) => {
          console.error("Error creating movement", error);
          alert("Error al registrar el movimiento. Por favor intente de nuevo.");
        }
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Registrar Nuevo Movimiento</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <SearchSelect
            label="Producto"
            placeholder="Selecciona un producto..."
            options={productOptions}
            value={productId}
            onChange={setProductId}
            isLoading={isLoadingProducts}
            required={true}
          />

          <div className="grid grid-cols-2 gap-4">
            <SearchSelect
              label="Proceso Origen"
              placeholder="Selecciona proceso..."
              options={processOptions}
              value={originProcessId}
              onChange={setOriginProcessId}
              isLoading={isLoadingProcesses}
              required={true}
            />
            <SearchSelect
              label="Proceso Destino"
              placeholder="Selecciona proceso..."
              options={processOptions}
              value={destinationProcessId}
              onChange={setDestinationProcessId}
              isLoading={isLoadingProcesses}
              required={true}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cantidad *
            </label>
            <input
              type="number"
              required
              min="0.01"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notas
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
              placeholder="Detalles adicionales..."
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center min-w-[120px]"
            >
              {isPending ? 'Guardando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
