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
        className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-slate-300"
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
          border-white/[0.08]
          bg-white/[0.04]
          px-6
          py-5
          text-base
          text-white
          placeholder:text-slate-500
          outline-none
          backdrop-blur-sm
          transition-all
          duration-200
          hover:border-white/[0.12]
          focus:border-emerald-500/60
          focus:ring-2
          focus:ring-emerald-500/20
          focus:bg-white/[0.06]
        "
      />
    </div>
  );
}
