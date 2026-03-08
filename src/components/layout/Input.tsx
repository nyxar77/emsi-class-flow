import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";
type InputState = "default" | "error" | "success";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: InputSize;
  inputState?: InputState;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inputSize = "md",
      inputState = "default",
      iconLeft,
      iconRight,
      fullWidth = false,
      helperText,
      className = "",
      disabled,
      ...props
    },
    ref,
  ) => {
    const sizeClasses: Record<InputSize, string> = {
      sm: "text-xs px-3 py-1.5 rounded-lg",
      md: "text-sm px-4 py-2 rounded-xl",
      lg: "text-base px-6 py-2.5 rounded-xl",
    };

    const stateClasses: Record<InputState, string> = {
      default: [
        "border-[#ccd0da] dark:border-[#313244]",
        "focus-visible:border-[#8839ef] dark:focus-visible:border-[#cba6f7]",
        "focus-visible:ring-[#8839ef] dark:focus-visible:ring-[#cba6f7]",
      ].join(" "),

      error: [
        "border-[#d20f39] dark:border-[#f38ba8]",
        "focus-visible:border-[#d20f39] dark:focus-visible:border-[#f38ba8]",
        "focus-visible:ring-[#d20f39] dark:focus-visible:ring-[#f38ba8]",
      ].join(" "),

      success: [
        "border-[#40a02b] dark:border-[#a6e3a1]",
        "focus-visible:border-[#40a02b] dark:focus-visible:border-[#a6e3a1]",
        "focus-visible:ring-[#40a02b] dark:focus-visible:ring-[#a6e3a1]",
      ].join(" "),
    };

    const helperTextColors: Record<InputState, string> = {
      default: "text-[#5c5f77] dark:text-[#a6adc8]",
      error: "text-[#d20f39] dark:text-[#f38ba8]",
      success: "text-[#40a02b] dark:text-[#a6e3a1]",
    };

    return (
      <div className={`inline-flex flex-col gap-1.5 ${fullWidth ? "w-full" : "w-auto"}`}>
        <div className="relative inline-flex items-center w-full">
          {iconLeft && (
            <span className="absolute left-3 flex items-center justify-center shrink-0 w-4 h-4 text-[#5c5f77] dark:text-[#a6adc8] pointer-events-none">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={[
              "w-full appearance-none outline-none border bg-transparent",
              "text-[#4c4f69] dark:text-[#cdd6f4]",
              "placeholder:text-[#9ca0b0] dark:placeholder:text-[#6c7086]",
              "transition-all duration-200 ease-out",
              "focus-visible:ring-1", // Using ring-1 for inputs usually looks cleaner than ring-2
              disabled
                ? "opacity-50 cursor-not-allowed bg-[#eff1f5] dark:bg-[#11111b]"
                : "bg-white dark:bg-[#1e1e2e]",
              stateClasses[inputState],
              sizeClasses[inputSize],
              iconLeft ? "pl-9" : "",
              iconRight ? "pr-9" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {iconRight && (
            <span className="absolute right-3 flex items-center justify-center shrink-0 w-4 h-4 text-[#5c5f77] dark:text-[#a6adc8] pointer-events-none">
              {iconRight}
            </span>
          )}
        </div>

        {helperText && (
          <span className={`text-xs ${helperTextColors[inputState]} pl-1`}>{helperText}</span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
