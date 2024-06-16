"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useCallback, useRef, useState } from "react";

import { cn } from "../lib/utils";

interface OverlayProps {
  children?: ReactNode;
}

export const Overlay: FC<OverlayProps> = (props) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const ref = useRef<any>();
  const pathname = usePathname();

  const enableFocusMode = useCallback(() => {
    clearTimeout(ref.current);
    setIsFocusMode(false);
    ref.current = setTimeout(() => {
      setIsFocusMode(true);
    }, 2000);
  }, [setIsFocusMode]);

  return (
    <div
      className={cn(
        "group/overlay",
        isFocusMode ? "focus" : "",
        `fixed inset-0 z-10 bg-black`,
      )}
      onMouseMove={() => enableFocusMode()}
    >
      <div className="fixed top-[2%] right-[12%] md:landscape:right-[2%] w-6 h-6 z-20 md:[.focus_&]:opacity-0 transition-opacity duration-500">
        <Link href={{ query: {}, pathname: pathname.split("?")?.[0] }} shallow>
          <svg height="100%" width="100%" viewBox="0 0 32 32">
            <title />
            <g id="cross" stroke="#fff" fill="#fff" strokeWidth={2}>
              <line x1="7" x2="25" y1="7" y2="25" />
              <line x1="7" x2="25" y1="25" y2="7" />
            </g>
          </svg>
        </Link>
      </div>
      {props.children}
    </div>
  );
};

export default Overlay;
