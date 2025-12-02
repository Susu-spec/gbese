export const InfoRow = ({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string | undefined | null;
  type?: string;
}) => (
  <div className="flex justify-between w-full">
    <label className="w-2/3">{label}</label>
    <input type={type} placeholder={value || "—"} className="w-1/3" readOnly />
  </div>
);