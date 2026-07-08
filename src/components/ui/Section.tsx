type SectionProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}