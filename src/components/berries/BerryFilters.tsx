import BerrySearch from "./BerrySearch";
import BerryCategoryFilter from "./BerryCategoryFilter";

import type { BerryCategory } from "../../types/BerryCategories";

type BerryFiltersProps = {
  search: string;

  onSearchChange: (value: string) => void;

  categories: ("All" | BerryCategory)[];

  selectedCategory: "All" | BerryCategory;

  onCategoryChange: (
    category: "All" | BerryCategory
  ) => void;
};

export default function BerryFilters({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: BerryFiltersProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-700
        bg-slate-900/70
        p-5
        shadow-lg
        backdrop-blur-sm
        space-y-5
      "
    >
      <BerrySearch
        search={search}
        onSearchChange={onSearchChange}
      />

      <BerryCategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />
    </div>
  );
}