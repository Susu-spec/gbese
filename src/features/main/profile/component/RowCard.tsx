export const InfoRow = ({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string | undefined | null;
  type?: string;
}) => (
  <div className="flex w-full justify-between items-center">
    <label className="w-1/3 md:2/3">{label}</label>
    <input placeholder={value || "—"} type={type} className="cursor-default w-2/3 md:w-1/3 overflow-x-auto whitespace-nowrap hide-scrollbar text-right md:text-left" readOnly />
  </div>

);