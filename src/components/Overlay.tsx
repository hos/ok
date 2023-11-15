"use client";

import { FC, ReactNode, useCallback, useRef, useState } from "react";

import { CloseButton } from "@/src/components/CloseButton";

import { cn } from "../lib/utils";

interface OverlayProps {
  children?: ReactNode;
}

export const Overlay: FC<OverlayProps> = (props) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const ref = useRef<any>();

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
        `bg-black fixed inset-0 z-10`,
      )}
      onMouseMove={() => enableFocusMode()}
    >
      <CloseButton />
      {props.children}
    </div>
  );
};

export default Overlay;
