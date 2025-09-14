"use client";

import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "../lib/utils";

interface HamburgerProps {
  onClick?: (_val: any) => void;
  isLargeMode?: boolean;
}

export const Hamburger: React.FC<HamburgerProps> = ({ onClick }) => {
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);
  const isLargeMode = searchParams?.get("mode") === "large";

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
        in-[.show-menu]:opacity-1
        md:hidden`,
        isLargeMode ? "hidden" : "",
      )}
    >
      <div onClick={onClick} className="h-[30px] w-[30px]">
        <span className="transition-all bg-black duration-300 w-full h-[1.5px] in-[.show-menu]:w-3/4 absolute in-[.show-menu]:top-1/2 rounded-md top-0 in-[.show-menu]:rotate-45" />
        <span className="transition-all bg-black duration-300 w-full h-[1.5px] in-[.show-menu]:w-3/4 absolute in-[.show-menu]:top-1/2 rounded-md in-[.show-menu]:opacity-0 top-1/3" />
        <span className="transition-all bg-black duration-300 w-full h-[1.5px] in-[.show-menu]:w-3/4 absolute in-[.show-menu]:top-1/2 rounded-md top-2/3 in-[.show-menu]:-rotate-45" />
      </div>
    </div>
  );
};
