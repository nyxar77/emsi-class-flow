import type { ReactNode } from "react";

// ── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = "mauve" | "blue" | "red" | "yellow" | "green" | "peach" | "teal" | "surface";

const badgeStyles: Record<BadgeVariant, string> = {
  mauve:
    "bg-[#8839ef1a] text-[#8839ef] border border-[#8839ef33] dark:bg-[#cba6f71a] dark:text-[#cba6f7] dark:border-[#cba6f733]",
  blue: "bg-[#1e66f51a] text-[#1e66f5] border border-[#1e66f533] dark:bg-[#89b4fa1a] dark:text-[#89b4fa] dark:border-[#89b4fa33]",
  red: "bg-[#d20f391a] text-[#d20f39] border border-[#d20f3933] dark:bg-[#f38ba81a] dark:text-[#f38ba8] dark:border-[#f38ba833]",
  yellow:
    "bg-[#df8e1d1a] text-[#df8e1d] border border-[#df8e1d33] dark:bg-[#f9e2af1a] dark:text-[#f9e2af] dark:border-[#f9e2af33]",
  green:
    "bg-[#40a02b1a] text-[#40a02b] border border-[#40a02b33] dark:bg-[#a6e3a11a] dark:text-[#a6e3a1] dark:border-[#a6e3a133]",
  peach:
    "bg-[#fe640b1a] text-[#fe640b] border border-[#fe640b33] dark:bg-[#fab3871a] dark:text-[#fab387] dark:border-[#fab38733]",
  teal: "bg-[#1792991a] text-[#179299] border border-[#17929933] dark:bg-[#94e2d51a] dark:text-[#94e2d5] dark:border-[#94e2d533]",
  surface:
    "bg-[#ccd0da] text-[#5c5f77] border border-[#bcc0cc] dark:bg-[#313244] dark:text-[#a6adc8] dark:border-[#45475a]",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}
export function Badge({ variant = "surface", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold tracking-wide ${badgeStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ── Card ─────────────────────────────────────────────────────────────────────
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}
export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`
      bg-[#e6e9ef] dark:bg-[#181825]
      border border-[#ccd0da] dark:border-[#313244]
      rounded-2xl p-5
      ${hover ? "transition-all duration-200 hover:border-[#8839ef] dark:hover:border-[#cba6f7] hover:shadow-[0_0_0_1px_#8839ef22] dark:hover:shadow-[0_0_0_1px_#cba6f722] cursor-pointer" : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
}

// ── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  variant?: BadgeVariant;
  trend?: string;
}
export function StatCard({ label, value, icon, variant = "mauve", trend }: StatCardProps) {
  const iconBg: Record<BadgeVariant, string> = {
    mauve: "bg-[#8839ef1a] text-[#8839ef] dark:bg-[#cba6f71a] dark:text-[#cba6f7]",
    blue: "bg-[#1e66f51a] text-[#1e66f5] dark:bg-[#89b4fa1a] dark:text-[#89b4fa]",
    red: "bg-[#d20f391a] text-[#d20f39] dark:bg-[#f38ba81a] dark:text-[#f38ba8]",
    yellow: "bg-[#df8e1d1a] text-[#df8e1d] dark:bg-[#f9e2af1a] dark:text-[#f9e2af]",
    green: "bg-[#40a02b1a] text-[#40a02b] dark:bg-[#a6e3a11a] dark:text-[#a6e3a1]",
    peach: "bg-[#fe640b1a] text-[#fe640b] dark:bg-[#fab3871a] dark:text-[#fab387]",
    teal: "bg-[#1792991a] text-[#179299] dark:bg-[#94e2d51a] dark:text-[#94e2d5]",
    surface: "bg-[#ccd0da] text-[#5c5f77] dark:bg-[#313244] dark:text-[#a6adc8]",
  };
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca0b0] dark:text-[#6c7086] mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-[#4c4f69] dark:text-[#cdd6f4] leading-none">
            {value}
          </p>
          {trend && (
            <p className="text-xs text-[#40a02b] dark:text-[#a6e3a1] mt-1.5 font-medium">{trend}</p>
          )}
        </div>
        <div className={`p-2.5 rounded-xl ${iconBg[variant]}`}>{icon}</div>
      </div>
    </Card>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}
export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-lg font-bold text-[#4c4f69] dark:text-[#cdd6f4]">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-[#9ca0b0] dark:text-[#6c7086] mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-[#4c4f69] dark:text-[#cdd6f4] mb-1">{title}</h3>
      <p className="text-sm text-[#9ca0b0] dark:text-[#6c7086] max-w-xs mb-4">{description}</p>
      {action}
    </div>
  );
}

// ── Divider ───────────────────────────────────────────────────────────────────
export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-[#ccd0da] dark:border-[#313244] ${className}`} />;
}

export function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-sm bg-[#eff1f5] dark:bg-[#1e1e2e] border border-[#ccd0da] dark:border-[#313244] rounded-2xl shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export function SmLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#9ca0b0] dark:text-[#6c7086] mb-1">
      {children}
    </label>
  );
}

export function SmInput({
  type = "text",
  value,
  onChange,
  placeholder,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-xl text-sm bg-[#e6e9ef] dark:bg-[#181825] border border-[#ccd0da] dark:border-[#313244] text-[#4c4f69] dark:text-[#cdd6f4] placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086] focus:outline-none focus:border-[#8839ef] dark:focus:border-[#cba6f7] transition-all"
    />
  );
}
