type Props = {
  items: readonly string[] | string[];
  label?: string;
};

export function PillRow({ items, label }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
      {label && <div className="eyebrow shrink-0">{label}</div>}
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
