"use client";

import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "../lib/utils";

interface HamburgerProps {
  onClick?: (_val: any) => void;
  isLargeMode?: boolean;
}

export const Hamburger: React.FC<HamburgerProps> = ({
  onClick,
  isLargeMode,
}) => {
  const ref = useRef<HTMLDivElement | null>();

  const toggleMenu = useCallback(() => {
    document.querySelector("body")?.classList.toggle("show-menu");
  }, []);

  useEffect(() => {
    const handle = () => {
      if (window.scrollY > 50) {
        ref.current?.classList.add("hide");
      } else {
        ref.current?.classList.remove("hide");
      }
    };
    document.addEventListener("scroll", handle);

    return () => document.removeEventListener("scroll", handle);
  }, []);

  return (
    <div
      onClick={toggleMenu}
      ref={(_ref) => (ref.current = _ref)}
      className={cn(
        `
        w-8
        top-5
        left-8
        fixed
        duration-500
        [.show-menu_&]:opacity-1
        md:hidden`,
        isLargeMode ? "hidden" : "",
      )}
    >
      <span onClick={onClick}>
        {new Array(3).fill(0).map((_, i) => {
          return (
            <hr key={i} className="my-[2px] w-full border-t-2 border-black" />
          );
        })}
      </span>
    </div>
  );
};
