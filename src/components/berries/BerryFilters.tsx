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
        theme-card
        space-y-6
        rounded-xl
        p-6
        sm:p-7
        shadow-sm
        backdrop-blur-md
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
