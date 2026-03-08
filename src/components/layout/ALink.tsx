import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router";
// import { replace, useNavigate } from "react-router";

type LinkVariant = "primary" | "secondary" | "danger" | "warning" | "success" | "muted" | "base";

interface LinkProps extends React.ComponentProps<typeof Link> {
  variant?: LinkVariant;
  underline?: "none" | "hover" | "always";
  children: ReactNode;
}

export function ALink({
  variant = "primary",
  underline = "hover",
  children,
  className = "",
  ...props
}: LinkProps) {
  const variantClasses: Record<LinkVariant, string> = {
    primary: "text-[#8839ef] hover:text-[#7527d7] dark:text-[#cba6f7] dark:hover:text-[#b48ef0]",
    secondary: "text-[#1e66f5] hover:text-[#1a56d6] dark:text-[#89b4fa] dark:hover:text-[#74a8f7]",
    danger: "text-[#d20f39] hover:text-[#b80d30] dark:text-[#f38ba8] dark:hover:text-[#ee7a97]",
    warning: "text-[#df8e1d] hover:text-[#c47d18] dark:text-[#f9e2af] dark:hover:text-[#f5d898]",
    success: "text-[#40a02b] hover:text-[#368f25] dark:text-[#a6e3a1] dark:hover:text-[#93dc8d]",
    muted: "text-[#5c5f77] hover:text-[#4c4f69] dark:text-[#a6adc8] dark:hover:text-[#cdd6f4]",
    base: "text-[#4c4f69] hover:text-[#8839ef] dark:text-[#cdd6f4] dark:hover:text-[#cba6f7]", // Default text color that highlights primary on hover
  };

  const underlineClasses = {
    none: "no-underline",
    hover: "no-underline hover:underline",
    always: "underline",
  };

  return (
    <Link
      className={[
        "inline-flex items-center gap-1 font-medium",
        "transition-colors duration-200 ease-out cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm",
        "focus-visible:ring-[#8839ef] dark:focus-visible:ring-[#cba6f7]",
        "focus-visible:ring-offset-[#eff1f5] dark:focus-visible:ring-offset-[#1e1e2e]",
        variantClasses[variant],
        underlineClasses[underline],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Link>
  );
}
