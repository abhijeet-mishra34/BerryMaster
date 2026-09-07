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
        border-white/10
        light:border-slate-200
        bg-[#151829]/70
        light:bg-white
        space-y-5
        p-5
        sm:p-6
        shadow-lg
        shadow-black/10
        backdrop-blur-xl
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
