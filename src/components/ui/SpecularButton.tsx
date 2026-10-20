"use client";

import React, { useRef, useState, useCallback, type CSSProperties, type ReactNode } from "react";
import "./SpecularButton.css";

export interface SpecularButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, "onClick"> {
  size?: "sm" | "md" | "lg";
  radius?: number;
  tint?: string;
  tintOpacity?: number;
  textColor?: string;
  lineColor?: string;
  baseColor?: string;
  intensity?: number;
  idleIntensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  glow?: number;
  followMouse?: boolean;
  proximity?: number;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit" | "reset";
  href?: string;
  style?: CSSProperties;
}

export const SpecularButton: React.FC<SpecularButtonProps> = ({
  size = "md",
  radius = 18,
  tint = "#ffffff",
  tintOpacity = 0.04,
  textColor = "#f5f5f5",
  lineColor = "#ffffff",
  baseColor = "#525252",
  intensity = 1,
  idleIntensity = 0.35,
  shineSize = 10,
  shineFade = 34,
  thickness = 1.2,
  glow = 1,
  followMouse = true,
  proximity = 250,
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  href,
  style,
  ...rest
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!followMouse || disabled) return;
      const el = elementRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoords({ x, y });
    },
    [followMouse, disabled]
  );

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) => {
      setIsHovered(true);
      handlePointerMove(e);
    },
    [handlePointerMove]
  );

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setCoords(null);
  }, []);

  const buttonClasses = [
    "specular-button",
    `specular-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const buttonStyles: CSSProperties = {
    "--sb-radius": `${radius}px`,
    "--sb-tint": tint,
    "--sb-tint-opacity": tintOpacity,
    "--sb-text-color": textColor,
    "--sb-line-color": lineColor,
    "--sb-base-color": baseColor,
    "--sb-thickness": `${thickness}px`,
    "--sb-intensity": isHovered ? intensity : idleIntensity,
    "--sb-glow-opacity": isHovered ? Math.min(1, glow * 0.8) : idleIntensity * 0.3,
    "--sb-x": coords ? `${coords.x}px` : "50%",
    "--sb-y": coords ? `${coords.y}px` : "50%",
    ...style,
  } as CSSProperties;

  const content = (
    <>
      {/* Structural base hairline border */}
      <span aria-hidden="true" className="specular-button__base-border" />

      {/* Dynamic specular highlight border that glides toward cursor */}
      <span aria-hidden="true" className="specular-button__specular-border" />

      {/* Ambient soft glow aura */}
      <span aria-hidden="true" className="specular-button__glow" />

      {/* Sleek diagonal glare sweep on hover */}
      <span aria-hidden="true" className="specular-button__glare" />

      {/* Interactive label and icons */}
      <span className="specular-button__label">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={elementRef as React.Ref<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={buttonClasses}
        style={buttonStyles}
        role="link"
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={elementRef as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={buttonClasses}
      style={buttonStyles}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};

export default SpecularButton;
