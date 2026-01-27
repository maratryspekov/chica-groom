import { type ReactNode, type MouseEventHandler } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "sm";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
};

function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  className,
  ...rest
}: ButtonProps) {
  const composedClassName = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      className={composedClassName}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
