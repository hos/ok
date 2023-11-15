import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

import { cn } from "../lib/utils";

interface HamburgerProps {
  onClick?: (_val: any) => void;
}

export const Hamburger: React.FC<HamburgerProps> = (props) => {
  const ref = useRef<HTMLDivElement | null>();
  const router = useRouter();
  const isLargeMode = router.query.mode === "large";

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
      <span onClick={props.onClick}>
        {new Array(3).fill(0).map((_, i) => {
          return (
            <hr key={i} className="my-[2px] w-full border-t-2 border-black" />
          );
        })}
      </span>
    </div>
  );
};
