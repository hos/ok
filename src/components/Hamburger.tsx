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
      ref={(_ref) => {
        ref.current = _ref;
      }}
      className={cn(
        `
        mx-6
        w-8
        top-5
        left-0
        fixed
        duration-300
        [.show-menu_&]:opacity-1
        md:hidden`,
        isLargeMode ? "hidden" : "",
      )}
    >
      <div onClick={onClick} className="h-[30px] w-[30px]">
        <span className="transition-all bg-black duration-300 w-full h-[1.5px] [.show-menu_&]:w-3/4 absolute [.show-menu_&]:top-1/2 rounded-md top-0 [.show-menu_&]:rotate-45" />
        <span className="transition-all bg-black duration-300 w-full h-[1.5px] [.show-menu_&]:w-3/4 absolute [.show-menu_&]:top-1/2 rounded-md [.show-menu_&]:opacity-0 top-1/3" />
        <span className="transition-all bg-black duration-300 w-full h-[1.5px] [.show-menu_&]:w-3/4 absolute [.show-menu_&]:top-1/2 rounded-md top-2/3 [.show-menu_&]:-rotate-45" />
      </div>
    </div>
  );
};
