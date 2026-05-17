"use client";

import {
  cloneElement,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useState,
} from "react";
import { createPortal } from "react-dom";

const POINTER_OFFSET = 12;

type PointerTooltipProps = {
  label: string;
  children: ReactNode;
};

export default function PointerTooltip({
  label,
  children,
}: PointerTooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    setCoords({
      x: clientX + POINTER_OFFSET,
      y: clientY + POINTER_OFFSET,
    });
  }, []);

  if (!isValidElement(children)) {
    return children;
  }

  const child = children as ReactElement<{
    onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
    onMouseMove?: (event: MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  }>;

  const trigger = cloneElement(child, {
    onMouseEnter: (event: MouseEvent<HTMLElement>) => {
      updatePosition(event.clientX, event.clientY);
      setVisible(true);
      child.props.onMouseEnter?.(event);
    },
    onMouseMove: (event: MouseEvent<HTMLElement>) => {
      updatePosition(event.clientX, event.clientY);
      child.props.onMouseMove?.(event);
    },
    onMouseLeave: (event: MouseEvent<HTMLElement>) => {
      setVisible(false);
      child.props.onMouseLeave?.(event);
    },
  });

  return (
    <>
      {trigger}
      {visible &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-50 w-fit max-w-xs animate-in fade-in-0 zoom-in-95 rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background"
            style={{ left: coords.x, top: coords.y }}
          >
            {label}
          </div>,
          document.body,
        )}
    </>
  );
}
