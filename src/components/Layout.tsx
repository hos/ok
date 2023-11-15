import { ReactNode } from "react";

import { Shortcuts } from "@/src/components/Shortcuts";

import { Menu } from "./Nav";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className="flex flex-row">
      <div className="md:w-3/4 py-8 inline-flex mt-14">{props.children}</div>
      <Menu />
      <Shortcuts />
    </div>
  );
};
