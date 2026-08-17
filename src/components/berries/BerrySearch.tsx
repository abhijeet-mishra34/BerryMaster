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
        htmlFor="berry-search"
        className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-300 light:text-slate-700"
      >
        🔍 Search Berries
      </label>

      <input
        id="berry-search"
        type="text"
        placeholder="Search by name, ID or tags..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-800
          light:border-slate-300
          bg-slate-950/80
          light:bg-white
          px-5
          py-3.5
          text-base
          text-white
          light:text-slate-900
          placeholder:text-slate-500
          light:placeholder:text-slate-400
          outline-none
          backdrop-blur-sm
          transition-all
          duration-200
          focus:border-emerald-500/60
          focus:ring-2
          focus:ring-emerald-500/20
        "
      />
    </div>
  );
}
