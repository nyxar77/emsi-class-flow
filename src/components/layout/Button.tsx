import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "ghost"
  | "warning"
  | "success"
  | "outline";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses: Record<ButtonVariant, string> = {
    primary: [
      "bg-[#8839ef] text-[#eff1f5] hover:bg-[#7527d7]",
      "shadow-[0_2px_12px_0_rgba(136,57,239,0.25)] hover:shadow-[0_4px_18px_0_rgba(136,57,239,0.38)]",
      "dark:bg-[#cba6f7] dark:text-[#11111b] dark:hover:bg-[#b48ef0]",
      "dark:shadow-[0_2px_12px_0_rgba(203,166,247,0.18)] dark:hover:shadow-[0_4px_18px_0_rgba(203,166,247,0.30)]",
    ].join(" "),

    secondary: [
      "bg-[#1e66f5] text-[#eff1f5] hover:bg-[#1a56d6]",
      "shadow-[0_2px_12px_0_rgba(30,102,245,0.22)] hover:shadow-[0_4px_18px_0_rgba(30,102,245,0.34)]",
      "dark:bg-[#89b4fa] dark:text-[#11111b] dark:hover:bg-[#74a8f7]",
      "dark:shadow-[0_2px_12px_0_rgba(137,180,250,0.15)] dark:hover:shadow-[0_4px_18px_0_rgba(137,180,250,0.26)]",
    ].join(" "),

    danger: [
      "bg-[#d20f39] text-[#eff1f5] hover:bg-[#b80d30]",
      "shadow-[0_2px_12px_0_rgba(210,15,57,0.22)] hover:shadow-[0_4px_18px_0_rgba(210,15,57,0.35)]",
      "dark:bg-[#f38ba8] dark:text-[#11111b] dark:hover:bg-[#ee7a97]",
      "dark:shadow-[0_2px_12px_0_rgba(243,139,168,0.15)] dark:hover:shadow-[0_4px_18px_0_rgba(243,139,168,0.26)]",
    ].join(" "),

    warning: [
      "bg-[#df8e1d] text-[#eff1f5] hover:bg-[#c47d18]",
      "shadow-[0_2px_12px_0_rgba(223,142,29,0.22)] hover:shadow-[0_4px_18px_0_rgba(223,142,29,0.34)]",
      "dark:bg-[#f9e2af] dark:text-[#11111b] dark:hover:bg-[#f5d898]",
      "dark:shadow-[0_2px_12px_0_rgba(249,226,175,0.14)] dark:hover:shadow-[0_4px_18px_0_rgba(249,226,175,0.24)]",
    ].join(" "),

    success: [
      "bg-[#40a02b] text-[#eff1f5] hover:bg-[#368f25]",
      "shadow-[0_2px_12px_0_rgba(64,160,43,0.22)] hover:shadow-[0_4px_18px_0_rgba(64,160,43,0.34)]",
      "dark:bg-[#a6e3a1] dark:text-[#11111b] dark:hover:bg-[#93dc8d]",
      "dark:shadow-[0_2px_12px_0_rgba(166,227,161,0.14)] dark:hover:shadow-[0_4px_18px_0_rgba(166,227,161,0.24)]",
    ].join(" "),

    ghost: [
      "bg-transparent text-[#5c5f77] hover:bg-[#ccd0da] hover:text-[#4c4f69]",
      "dark:bg-transparent dark:text-[#a6adc8] dark:hover:bg-[#313244] dark:hover:text-[#cdd6f4]",
    ].join(" "),

    outline: [
      "bg-transparent border border-[#9ca0b0] text-[#4c4f69]",
      "hover:border-[#8839ef] hover:text-[#8839ef] hover:bg-[#8839ef0d]",
      "dark:bg-transparent dark:border-[#6c7086] dark:text-[#cdd6f4]",
      "dark:hover:border-[#cba6f7] dark:hover:text-[#cba6f7] dark:hover:bg-[#cba6f70d]",
    ].join(" "),
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
    md: "text-sm px-4 py-2 gap-2 rounded-xl",
    lg: "text-base px-6 py-2.5 gap-2.5 rounded-xl",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center select-none",
        "font-semibold tracking-wide leading-none",
        "transition-all duration-200 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-[#8839ef] dark:focus-visible:ring-[#cba6f7]",
        "focus-visible:ring-offset-[#eff1f5] dark:focus-visible:ring-offset-[#1e1e2e]",
        "active:scale-[0.97] active:brightness-95",
        isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className="shrink-0 w-4 h-4">{icon}</span>
      )}

      <span>{children}</span>

      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0 w-4 h-4">{icon}</span>
      )}
    </button>
  );
}

export default Button;
