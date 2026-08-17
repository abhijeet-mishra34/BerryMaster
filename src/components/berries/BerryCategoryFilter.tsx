import type { BerryCategory } from "../../types/BerryCategories";

type BerryCategoryFilterProps = {
categories: ("All" | BerryCategory)[];

selectedCategory: "All" | BerryCategory;

onCategoryChange: (
category: "All" | BerryCategory
) => void;
};

export default function BerryCategoryFilter({
categories,
selectedCategory,
onCategoryChange,
}: BerryCategoryFilterProps) {
return (
  <div>
    <h3
      className="
        mb-3
        flex
        items-center
        gap-2
        text-sm
        font-semibold
        text-slate-300
        light:text-slate-700
      "
    >
      🍓 Browse by Category
    </h3>

    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              cursor-pointer
              ${
                isSelected
                  ? "scale-105 bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 font-bold"
                  : "bg-slate-800 light:bg-slate-100 text-slate-300 light:text-slate-700 hover:bg-slate-700 light:hover:bg-slate-200 hover:text-white light:hover:text-slate-900 border border-slate-700 light:border-slate-300 shadow-xs"
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  </div>
);
}
