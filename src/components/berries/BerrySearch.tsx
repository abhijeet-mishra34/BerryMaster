type BerrySearchProps = {
  search: string;

  onSearchChange: (value: string) => void;
};

export default function BerrySearch({
  search,
  onSearchChange,
}: BerrySearchProps) {
  return (
    <div>

      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-slate-300
        "
      >
        🔍 Search Berries
      </label>

      <input
        type="text"
        placeholder="Search by name, ID or tags..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        className="
          w-full
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          px-5
          py-3.5
          text-white
          placeholder:text-slate-500
          outline-none
          transition-all
          duration-200

          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-500/30
          focus:shadow-lg
          focus:shadow-emerald-500/10
        "
      />

    </div>
  );
}