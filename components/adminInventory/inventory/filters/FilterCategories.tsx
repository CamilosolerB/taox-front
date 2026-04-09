'use client';

interface FilterCategoriesProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

export const FilterCategories = ({
  categories,
  selectedCategories,
  onCategoryChange,
}: FilterCategoriesProps) => {
  return (
    <div>
      <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#617589]">
        Categorías
      </h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-3 cursor-pointer group">
            <input
              className="rounded border-gray-300 text-primary focus:ring-primary"
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onCategoryChange(category)}
            />
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
