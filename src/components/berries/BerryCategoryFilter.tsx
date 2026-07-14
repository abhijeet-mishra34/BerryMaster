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
        "
      >
        🍓 Browse by Category
      </h3>

      <div className="flex flex-wrap gap-2">

        {categories.map((category) => (

          <button
            key={category}
            type="button"
            onClick={() =>
              onCategoryChange(category)
            }
            className={`
              rounded-full
              px-4
              py-2
              text-sm
              font-medium
              transition-all
              duration-200

              ${
                selectedCategory === category
                  ? "scale-105 bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:scale-105"
              }
            `}
          >
            {category}
          </button>

        ))}

      </div>

    </div>
  );
}