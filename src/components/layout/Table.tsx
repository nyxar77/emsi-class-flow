import { Badge } from "./Shared";

function InfoRow({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  const colors: Record<string, string> = {
    blue: "text-[#1e66f5] dark:text-[#89b4fa] bg-[#1e66f51a] dark:bg-[#89b4fa1a]",
    mauve: "text-[#8839ef] dark:text-[#cba6f7] bg-[#8839ef1a] dark:bg-[#cba6f71a]",
    teal: "text-[#179299] dark:text-[#94e2d5] bg-[#1792991a] dark:bg-[#94e2d51a]",
    yellow: "text-[#df8e1d] dark:text-[#f9e2af] bg-[#df8e1d1a] dark:bg-[#f9e2af1a]",
  };
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${colors[accent] ?? colors.blue}`}
      >
        <span className="w-3.5 h-3.5">{icon}</span>
      </span>
      <span className="text-xs text-[#9ca0b0] dark:text-[#6c7086] w-24 shrink-0">{label}</span>
      <span className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">{value}</span>
    </div>
  );
}

function ReservationRow({
  room,
  purpose,
  date,
  time,
  status,
}: {
  room: string;
  purpose: string;
  date: string;
  time: string;
  status: "approved" | "pending" | "rejected";
}) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244]">
      <div>
        <p className="text-sm font-semibold text-[#4c4f69] dark:text-[#cdd6f4]">{room}</p>
        <p className="text-xs text-[#9ca0b0] dark:text-[#6c7086]">
          {purpose} · {date} {time}
        </p>
      </div>
      <Badge variant={status === "approved" ? "green" : status === "pending" ? "yellow" : "red"}>
        {status === "approved" ? "Validée" : status === "pending" ? "En attente" : "Refusée"}
      </Badge>
    </div>
  );
}

export { ReservationRow, InfoRow };
