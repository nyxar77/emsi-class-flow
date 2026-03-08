import type { ReactNode } from "react";
import { NavLink as RouterNavLink } from "react-router";

type NavVariant = "primary" | "secondary" | "danger" | "warning" | "success";

// We omit className here to explicitly type it as a string for the consumer,
// while we handle the function logic internally.
interface CustomNavLinkProps extends Omit<React.ComponentProps<typeof RouterNavLink>, "className"> {
  variant?: NavVariant;
  className?: string;
  children:
    | ReactNode
    | ((props: { isActive: boolean; isPending: boolean; isTransitioning: boolean }) => ReactNode);
}

export function Navlink({
  variant = "primary",
  className = "",
  children,
  ...props
}: CustomNavLinkProps) {
  // These are the vibrant colors applied only when the link matches the current route
  const activeClasses: Record<NavVariant, string> = {
    primary: "text-[#8839ef] bg-[#8839ef]/10 dark:text-[#cba6f7] dark:bg-[#cba6f7]/10",
    secondary: "text-[#1e66f5] bg-[#1e66f5]/10 dark:text-[#89b4fa] dark:bg-[#89b4fa]/10",
    danger: "text-[#d20f39] bg-[#d20f39]/10 dark:text-[#f38ba8] dark:bg-[#f38ba8]/10",
    warning: "text-[#df8e1d] bg-[#df8e1d]/10 dark:text-[#f9e2af] dark:bg-[#f9e2af]/10",
    success: "text-[#40a02b] bg-[#40a02b]/10 dark:text-[#a6e3a1] dark:bg-[#a6e3a1]/10",
  };

  // Muted text that brightens and gets a subtle background on hover
  const inactiveClasses = [
    "text-[#5c5f77] hover:text-[#4c4f69] hover:bg-[#ccd0da]/50",
    "dark:text-[#a6adc8] dark:hover:text-[#cdd6f4] dark:hover:bg-[#313244]/50",
  ].join(" ");

  return (
    <RouterNavLink
      className={({ isActive, isPending, isTransitioning }) =>
        [
          // Base styles for alignment, spacing, and focus states
          "inline-flex items-center gap-2 px-3 py-2 font-medium rounded-lg",
          "transition-all duration-200 ease-out select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "focus-visible:ring-[#8839ef] dark:focus-visible:ring-[#cba6f7]",
          "focus-visible:ring-offset-[#eff1f5] dark:focus-visible:ring-offset-[#1e1e2e]",

          // State-based styles
          isActive ? activeClasses[variant] : inactiveClasses,
          isPending ? "opacity-60 animate-pulse cursor-wait" : "",
          isTransitioning ? "opacity-80" : "",

          // Any custom overrides passed by the user
          className,
        ]
          .filter(Boolean)
          .join(" ")
      }
      {...props}
    >
      {/* This supports both standard children (text/elements) 
        and the render-prop pattern if you need state inside the element 
      */}
      {children}
    </RouterNavLink>
  );
}

export default Navlink;
