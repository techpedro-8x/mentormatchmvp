import { useState, InputHTMLAttributes, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextField = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className="group">
        <label
          htmlFor={inputId}
          className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-ink/60 mb-2"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-paper border border-ink/10 rounded-2xl px-5 py-4 text-base text-ink placeholder:text-ink/35",
            "transition-all duration-300",
            "focus:outline-none focus:border-electric focus:ring-4 focus:ring-electric/15",
            "hover:border-ink/25",
            error && "border-destructive focus:border-destructive focus:ring-destructive/15",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  },
);
TextField.displayName = "TextField";

export const PasswordField = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = id || props.name;
    return (
      <div className="group">
        <label
          htmlFor={inputId}
          className="block text-[10px] uppercase tracking-[0.18em] font-semibold text-ink/60 mb-2"
        >
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={show ? "text" : "password"}
            className={cn(
              "w-full bg-paper border border-ink/10 rounded-2xl pl-5 pr-14 py-4 text-base text-ink placeholder:text-ink/35",
              "transition-all duration-300",
              "focus:outline-none focus:border-electric focus:ring-4 focus:ring-electric/15",
              "hover:border-ink/25",
              error && "border-destructive focus:border-destructive focus:ring-destructive/15",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full flex items-center justify-center text-ink/50 hover:text-electric hover:bg-electric/10 transition-all"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  },
);
PasswordField.displayName = "PasswordField";

export const GoogleButton = ({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl border border-ink/15 bg-paper hover:bg-softgray hover:border-ink/30 transition-all duration-300 text-sm font-semibold text-ink group disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <svg
      className="size-5 transition-transform group-hover:scale-110"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
    <span>{label}</span>
  </button>
);

export const Divider = ({ label = "ou" }: { label?: string }) => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 h-px bg-ink/10" />
    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-ink/40">
      {label}
    </span>
    <div className="flex-1 h-px bg-ink/10" />
  </div>
);